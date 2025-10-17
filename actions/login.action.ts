"use server";
import { signIn } from "@/auth";
import { prisma } from "@/prisma/index";

export const loginWithGoogleAction = async () => {
	await signIn("google", { redirectTo: "/" });
};

export const loginWithCredentianlsAction = async (email: string, password: string) => {
	try {
		await signIn("credentials", {
			email: email,
			password: password,
			redirect: false,
		});
		return { message: "User Authentication Went Well", status: true };
	} catch (err) {
		return { message: "Incorrect Password Detected", status: false };
	}
};

export const getUserCredentials = async (email: string, password: string) => {
	const user = await prisma.user.findFirst({
		where: { email },
	});

	if (user && user.password === password) {
		return user;
	} else if (user && user?.password !== password) {
		return null;
	}

	const newlyCreatedUser = await prisma.user.create({
		data: {
			email: email,
			password: password,
		},
		select: {
			id: true,
		},
	});

	return newlyCreatedUser;
};
