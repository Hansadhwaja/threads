import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';

interface Props {
    id: string;
    name: string;
    imgUrl: string;
}

const CommunityPreviewCard = ({ id, name,imgUrl }: Props) => {
  return (
    <article className='flex justify-between items-center bg-dark-4 p-2 rounded-xl'>
            <div className='flex flex-wrap items-center gap-3'>
                <Link href={`/communities/${id}`} className='relative h-12 w-12'>
                    <Image
                        src={imgUrl}
                        alt='community_logo'
                        fill
                        className='rounded-full object-cover'
                    />
                </Link>

                <div>
                    <Link href={`/communities/${id}`}>
                        <h4 className=' text-[12px] text-light-1'>{name}</h4>
                    </Link>
                </div>
            </div>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <Link href={`/communities/${id}`}>
                    <Button size='sm' className='community-card_btn'>
                        View
                    </Button>
                </Link>
            </div>
        </article>
  )
}

export default CommunityPreviewCard