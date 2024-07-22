import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { User } from "./model/user-model";
import bcrypt from "bcryptjs";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
    try {
      const url =
        'https://oauth2.googleapis.com/token?' +
        new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken
        })
  
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      })
  
      const refreshedTokens = await response.json()

  
      if (!response.ok) {
        throw refreshedTokens
      }

      /*const refreshedTokens = {
        "access_token": "acess-token",
        "expires_in": 2,
        "refresh_token": "refresh-token"
      }*/
  
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
      }
    } catch (error) {
      console.log(error)
  
      return {
        ...token,
        error: 'RefreshAccessTokenError'
      }
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
                    const res = await fetch("http://localhost:5001/users/signIn", {
                      method: "POST",
                      body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                      }),
                      headers: { "Content-Type": "application/json" },
                    });
          
                    if (!res.ok) {
                      // credentials are invalid
                      return null;
                    }
          
                    const parsedResponse = await res.json();
          
                    // accessing the jwt returned by server
                    const jwt = parsedResponse.accessToken;

                    console.log(jwt);
          
          // You can make more request to get other information about the user eg. Profile details
          
                   // return user credentials together with jwt
                    return {
                      ...credentials,
                      jwt,
                    };
                  } catch (e) {
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
        async jwt({ token, user, account }) {
            console.log(`Auth JWT Tok = ${JSON.stringify(token)}`)
            console.log(`Router Auth JWT account = ${JSON.stringify(account)}`)
            console.log(`User = ${JSON.stringify(user)}`)

          // Initial sign in
          if (account && user) {
            return {
              accessToken: account.access_token,
              accessTokenExpires: Date.now() + account.expires_in * 1000,
              refreshToken: account.refresh_token,
              user
            }
          }
    
          // Return previous token if the access token has not expired yet
          console.log("**** Access token expires on *****", token.accessTokenExpires, new Date(token.accessTokenExpires))
          if (Date.now() < token.accessTokenExpires) {
            console.log("**** returning previous token ******");
            return token
          }
    
          // Access token has expired, try to update it
          console.log("**** Update Refresh token ******");
          //return refreshAccessToken(token)
        },
        async session({ session, token }) {
            console.log(`Auth Sess = ${JSON.stringify(session)}`)
            console.log(`At ${new Date()} Auth Tok = ${JSON.stringify(token)}`)

            session.user = token.user
            session.accessToken = token.accessToken
            session.error = token.error
    
          return session
        },
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        }
    }

});
