import NextAuth from "next-auth"
import SlackProvider from "next-auth/providers/slack"

import type { NextAuthConfig } from "next-auth"

//export const { handlers, auth, signIn, signOut } =  NextAuth({
//  providers: [
//    SlackProvider({
//      clientId: process.env.SLACK_CLIENT_ID || "",
//      clientSecret: process.env.SLACK_CLIENT_SECRET || "",
//      idToken: true,
//      profile(profile, tokens) {
//        return {
//          id: profile.sub,
//          name: profile.name,
//          email: profile.email,
//          image: profile.picture,
//
//          // Auth tokens for calling API requests to Scrumbarista API
//          accessToken: tokens.access_token,
//          idToken: tokens.id_token,
//          tokenType: tokens.token_type,
//          state: tokens.state,
//        };
//      },
//    }),
//  ],
//
//  //pages: {
//  //  signIn: "/",
//  //  signOut: "/home",
//  //},
//  callbacks: {
//    async session({ session, token }) {
//      return { ...session, ...token };
//    },
//    async jwt({ token, user }) {
//      return { ...token, ...user };
//    },
//  },
//});

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },

  debug: true,

  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
      token: true,
      profile(profile, tokens) {
        console.log("profile", profile);
        console.log("tokens", tokens);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,

          accessToken: tokens.access_token,
          idToken: tokens.id_token,
          tokenType: tokens.token_type,
          state: tokens.state,
        };
      },
    }),
  ],
  callbacks: {
    //authorized({ request, auth }) {
    //  const { pathname } = request.nextUrl
    //  return pathname === "/middleware-example" && !!auth
    //},
    async session({ session, token }) {
      return { ...session, ...token };
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)