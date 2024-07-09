'use server'

import { connectToDB } from "../mongoose";
import Like from "../models/like.model";

interface Params {
    threadId: string,
    userId: string
}

export async function createLike({ threadId, userId }: Params) {
    try {
        connectToDB();
        const like = new Like({
            threadId,
            userId
        });
        like.save();
    } catch (error: any) {
        throw new Error(`Error creating Likes: ${error.message}`)
    }

}

export async function userLikedOrNot({ threadId, userId }: Params) {
    try {
        connectToDB();
        const userLikes = await Like.findOne({ threadId, userId });
        if(userLikes){
            return true;
        }else{
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