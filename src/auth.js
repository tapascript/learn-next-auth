import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { User } from "./model/user-model";
import bcrypt from "bcryptjs";

import { jwtDecode } from "jwt-decode";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
    console.log("Refreshing access token", token);
    try {    

        console.log("Beaarer token", `Bearer ${token.refreshToken}`);

        const response = await fetch(`${process.env.API_SERVER_BASE_URL}/api/auth/refresh`, {
            headers: {
                "Authorization": `Bearer ${token.refreshToken}`
            }
        });

        console.log(response);

        const tokens = await response.json();

        console.log(tokens);

        if (!response.ok) {
            throw tokens;
        }

        /*const refreshedTokens = {
        "access_token": "acess-token",
        "expires_in": 2,
        "refresh_token": "refresh-token"
      }*/

        //return token;

        return {
            ...token,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (credentials === null) return null;

                try {
                    const res = await fetch(
                        `${process.env.API_SERVER_BASE_URL}/api/auth/login`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                            headers: { "Content-Type": "application/json" },
                        }
                    );

                    if (!res.ok) {
                        // credentials are invalid
                        return null;
                    }

                    const parsedResponse = await res.json();

                    console.log(parsedResponse);

                    // accessing the accessToken returned by server
                    const accessToken = parsedResponse.accessToken;
                    const refreshToken = parsedResponse.refreshToken;
                    const userInfo = parsedResponse?.userInfo;

                    console.log(refreshToken);

                    // You can make more request to get other information about the user eg. Profile details

                    // return user credentials together with accessToken
                    return {
                        accessToken,
                        refreshToken,
                        role: userInfo?.role,
                        email: userInfo?.email
                    };
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, account, user }) => {
            // user is only available the first time a user signs in authorized
            console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);

            if (token.accessToken) {
                const decodedToken = jwtDecode(token.accessToken);
                console.log(decodedToken);
                token.accessTokenExpires = decodedToken?.exp * 1000;
            }

            if (account && user) {
                console.log(
                    `In jwt callback - User is ${JSON.stringify(user)}`
                );
                console.log(
                    `In jwt callback - account is ${JSON.stringify(account)}`
                );

                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    user,
                };
            }

            // Return previous token if the access token has not expired yet
            console.log(
                "**** Access token expires on *****",
                token.accessTokenExpires,
                new Date(token.accessTokenExpires)
            );
            if (Date.now() < token.accessTokenExpires) {
                console.log("**** returning previous token ******");
                return token;
            }

            // Access token has expired, try to update it
            console.log("**** Update Refresh token ******");
            //return token;
            return refreshAccessToken(token);
        },
        session: async ({ session, token }) => {
            console.log(
                `In session callback - Token is ${JSON.stringify(token)}`
            );
            if (token) {
                session.accessToken = token.accessToken;
                session.user = token.user;
            }
            return session;
        },
    },
});
