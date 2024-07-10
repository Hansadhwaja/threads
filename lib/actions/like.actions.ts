'use server'

import { connectToDB } from "../mongoose";
import Like from "../models/like.model";

interface Params {
    threadId: string,
    currentUserId: string
}

export async function createLike({ threadId, currentUserId }: Params) {
    try {
        connectToDB();
        const like = new Like({
            threadId,
            currentUserId
        });
        like.save();
    } catch (error: any) {
        throw new Error(`Error creating Likes: ${error.message}`)
    }

}

export async function userLikedOrNot({ threadId, currentUserId }: Params) {
    try {
        connectToDB();
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
        connectToDB();
        const userLikes = await Like.find({ threadId });
        return userLikes.length;
    } catch (error: any) {
        throw new Error(`Error fetching User Likes: ${error.message}`)
    }

}

export async function deleteLike({ threadId }: { threadId: string }) {
    try {
        connectToDB();
        await Like.findOneAndDelete({ threadId });
    } catch (error: any) {
        throw new Error(`Error creating Likes: ${error.message}`)
    }

}