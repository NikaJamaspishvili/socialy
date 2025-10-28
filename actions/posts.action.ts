"use server";

import { prisma } from "@/prisma";

export const getAllPosts = async (userId: string, cursor?: string) => {
	return await prisma.posts.findMany({
		where: {
			PostLikes: {
				none: {
					userId: userId,
				},
			},
			// userId: {
			// 	not: userId,
			// },
		},
		orderBy: {
			createdAt: "desc",
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
					PostComments: true,
				},
			},
		},
		take: 5,
		...(cursor && { cursor: { id: cursor }, skip: 1 }),
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

export const getPostComments = async (postId: string, cursor?: string) => {
	return await prisma.postComments.findMany({
		where: {
			postId: postId,
		},
		select: {
			id: true,
			content: true,
			createdAt: true,
			user: {
				select: {
					name: true,
					image: true,
				},
			},
		},
		take: 5,
		...(cursor && { cursor: { id: cursor }, skip: 1 }),
	});
};

export const insertPostComment = async (postId: string, userId: string, content: string) => {
	return await prisma.postComments.create({
		data: {
			content: content,
			userId: userId,
			postId: postId,
		},
	});
};
