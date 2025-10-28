"use server";

import { prisma } from "@/prisma";

export const getAllPosts = async (userId: string) => {
	return await prisma.posts.findMany({
		where: {
			PostLikes: {
				none: {
					userId: userId,
				},
			},
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					image: true,
				},
			},
			_count: {
				select: {
					PostLikes: true,
				},
			},
		},
	});
};

export const likePost = async (userId: string, postid: string) => {
	console.log("action is performed");
	try {
		return await prisma.postLikes.create({
			data: {
				userId: userId,
				postId: postid,
			},
		});
	} catch (err) {
		console.log("couldn't insert like: ", err);
	}
};

export const unlikePost = async (userId: string, postid: string) => {
	return await prisma.postLikes.delete({
		where: {
			userId_postId: {
				userId: userId,
				postId: postid,
			},
		},
	});
};
