import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { User } from "./model/user-model";
import bcrypt from "bcryptjs";


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
});
