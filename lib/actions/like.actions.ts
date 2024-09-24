'use server'

import { connectToDB } from "../mongoose";
import Like from "../models/like.model";

interface Params {
    threadId: string,
    currentUserId: string
}

export async function createLike({ threadId, currentUserId }: Params) {
    try {
        await connectToDB();
        const like = new Like({
            threadId,
            currentUserId
        });
        await like.save();
    } catch (error: any) {
        throw new Error(`Error creating Likes: ${error.message}`)
    }

}

export async function userLikedOrNot({ threadId, currentUserId }: Params) {
    try {
        await connectToDB();
        const userLikes = await Like.findOne({ threadId, currentUserId });
        if (userLikes) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        throw new Error(`Error fetching User Likes: ${error.message}`)
    }

}

export async function fetchLikeLength({ threadId }: { threadId: string }) {
    try {
        await connectToDB();
        const userLikes = await Like.find({ threadId });
        return userLikes.length;
    } catch (error: any) {
        throw new Error(`Error fetching Likes length: ${error.message}`)
    }

}

export async function deleteLike({ threadId }: { threadId: string }) {
    try {
        await connectToDB();
        await Like.findOneAndDelete({ threadId });
    } catch (error: any) {
        throw new Error(`Error deleting Likes: ${error.message}`)
    }

}