
'use client'
import { createLike, deleteLike, fetchLikeLength, userLikedOrNot } from '@/lib/actions/like.actions';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useState } from "react";

const LikeButton = ({ threadId, userId, currentUserId }: { threadId: string, userId: string, currentUserId: string }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeLength, setLikeLength] = useState(0);

    const handleClick = async () => {
        if (userId === currentUserId) {
            alert('As the owner of this Thread, You can not like this Thread.');
        }
        else {
            if (isLiked) {
                setIsLiked(false);
                await deleteLike({ threadId });
            }
            else {
                setIsLiked(true);
                await createLike({
                    threadId,
                    currentUserId
                });
            }
        }
    }

    useEffect(() => {
        async function fetchLikes() {
            const liked = await userLikedOrNot({ threadId, currentUserId });
            setIsLiked(liked);
            const userLiked = await fetchLikeLength({ threadId });
            setLikeLength(userLiked);
        }
        fetchLikes();
    }, [isLiked]);

    return (
        <div className='flex gap-2'>
            <Image
                src={`${isLiked ? '/assets/heart-filled.svg' : '/assets/heart-gray.svg'}`}
                alt="heart"
                width={24}
                height={24}
                className='cursor-pointer object-cover'
                onClick={handleClick}
            />
            <p className='text-slate-400 font-light flex gap-1'>{likeLength} <span>{likeLength === 1 ? 'Like' : 'Likes'}</span></p>
        </div>

    )
}

export default LikeButton