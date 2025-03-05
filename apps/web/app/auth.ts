import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import {client} from "@repo/db/client";
import { PrismaAdapter } from "@auth/prisma-adapter"


const prisma =client;

export const { handlers , auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
  providers: [GitHub({
    clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
  }),
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  })

],
pages:{
    signIn :"/signin",
    error:"/auth/error"
},
callbacks:{
    async session({ session, user }) {
        session.user.id = user.id;
        return session;
    },
    async jwt({token , user, account, profile}){
        if(user){
            token.id = user.id;
        }
        return token;
    }
    }
}
)