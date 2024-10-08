'use server'

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Community from "../models/community.model";


interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
        await connectToDB();

        const communityIdObject = await Community.findOne(
            { id: communityId },
            { _id: 1 }
        );

        const createdThread = await Thread.create({
            text,
            author,
            community: communityIdObject,
        });

        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        });

        if (communityIdObject) {
            await Community.findByIdAndUpdate(communityIdObject, {
                $push: { threads: createdThread._id },
            });
        }

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error creating Thread:${error.message}`)
    }

}

export async function fetchThreadById(id: string) {
    
    try {
        await connectToDB();
        const thread = await Thread.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: '_id id name image'
            })
            .populate({
                path: "community",
                model: Community,
                select: "_id id name image",
              })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image'
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate:
                        {
                            path: 'author',
                            model: User,
                            select: '_id id name parentId image'
                        }
                    }
                ]
            }).exec();
        return thread;

    } catch (error: any) {
        throw new Error(`Error fetching thread:${error.message}`)
    }
}

export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
) {
    await connectToDB();
    try {
        const originalThread = await Thread.findById(threadId);
        if (!originalThread) {
            throw new Error("Thread not found");
        }

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId
        });

        const savedCommentThread = await commentThread.save();

        await Thread.findByIdAndUpdate(originalThread._id, {
            $push: { children: savedCommentThread._id }
        });


        await originalThread.save();

        revalidatePath(path);

    } catch (error: any) {
        throw new Error(`Error adding comment to thread:${error.message}`)
    }
}

export async function fetchThread(pageNumber = 1, pageSize = 20) {
    await connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({
            path: "author",
            model: User,
        })
        .populate({
            path: "community",
            model: Community,
        })
        .populate({
            path: "children",
            populate: {
                path: "author",
                model: User,
                select: "_id name parentId image",
            },
        });

    const totalPostsCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
}

async function fetchAllChildThreads(threadId: string): Promise<any[]> {
    const childThreads = await Thread.find({ parentId: threadId });

    const descendantThreads = [];
    for (const childThread of childThreads) {
        const descendants = await fetchAllChildThreads(childThread._id);
        descendantThreads.push(childThread, ...descendants);
    }

    return descendantThreads;
}

export async function deleteThread(id: string, path: string): Promise<void> {
    try {
        await connectToDB();
        const mainThread = await Thread.findById(id).populate("author community");

        if (!mainThread) {
            throw new Error("Thread not found");
        }

        const descendantThreads = await fetchAllChildThreads(id);

        const descendantThreadIds = [
            id,
            ...descendantThreads.map((thread) => thread._id),
        ];

        const uniqueAuthorIds = new Set(
            [
                ...descendantThreads.map((thread) => thread.author?._id?.toString()),
                mainThread.author?._id?.toString(),
            ].filter((id) => id !== undefined)
        );

        const uniqueCommunityIds = new Set(
            [
                ...descendantThreads.map((thread) => thread.community?._id?.toString()),
                mainThread.community?._id?.toString(),
            ].filter((id) => id !== undefined)
        );

        await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

        await User.updateMany(
            { _id: { $in: Array.from(uniqueAuthorIds) } },
            { $pull: { threads: { $in: descendantThreadIds } } }
        );

        await Community.updateMany(
            { _id: { $in: Array.from(uniqueCommunityIds) } },
            { $pull: { threads: { $in: descendantThreadIds } } }
        );

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to delete thread: ${error.message}`);
    }
}