import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/index";

import { getUserCredentials } from "./actions/login.action";

export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			credentials: {
				email: {
					type: "email",
					label: "Email...",
					placeholder: "Email...",
				},
				password: {
					type: "password",
					label: "password",
					placeholder: "Password...",
				},
			},
			authorize: async (credentials) => {
				//yleoba#1
				const { email, password } = credentials as { email: string; password: string };

				const user = await getUserCredentials(email, password);

				if (user) return user;
				throw new Error("Incorrect Password");
			},
		}),
		Google,
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id as string;
			return session;
		},
	},
});
