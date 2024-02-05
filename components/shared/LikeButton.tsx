
'use client'
import Image from 'next/image'
import React from 'react'
import { useState } from "react";

const LikeButton = () => {
    const [isLiked, setIsLiked] = useState(false);
    return (
        <Image
            src={`/assets/heart-${isLiked ? 'filled' : 'gray'}.svg`}
            alt="heart"
            width={24}
            height={24}
            className='cursor-pointer object-cover'
            onClick={() => { setIsLiked(!isLiked) }}

        />
    )
}

export default LikeButton