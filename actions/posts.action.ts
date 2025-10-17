"use server";

import { prisma } from "@/prisma";

export const getAllPosts = async (userId: string) => {
	return await prisma.posts.findMany({
		where: {
			userId: userId,
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					image: true,
				},
			},
		},
	});
};
