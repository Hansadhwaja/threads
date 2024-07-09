'use client'

import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import { Button } from '../ui/button';



interface Params {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imageUrl: string;
    bio: string;
    type?: 'User' | 'Community';
}
const ProfileHeader = ({
    accountId,
    authUserId,
    name,
    username,
    imageUrl,
    bio,
    type }: Params) => {

    const { openUserProfile } = useClerk();

    const handleManagePersonalAccount = () => {
        openUserProfile();

    };

    return (
        <div className='flex w-full flex-col justify-start'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3 w-full'>
                    <div className='relative h-20 w-20 object-cover'>
                        <Image
                            src={imageUrl}
                            alt='Profile Image'
                            fill
                            className='rounded-full  object-cover shadow-2xl'
                        />
                    </div>
                    <div className='flex-1'>
                        <h2 className='text-left text-heading3-bold text-light-1'>{name}</h2>
                        <p className='text-base-regular text-gray-1'>@{username}</p>
                    </div>

                    {accountId === authUserId && (
                        <div className='flex justify-end rounded-xl'>
                            <Button onClick={handleManagePersonalAccount}>
                                Manage Personal Account
                            </Button>
                        </div>
                    )}

                </div>
            </div>
            {/* TODO:COMMUNITY */}
            <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>
            <div className='mt-12 h-0.5 w-full bg-dark-3' />

        </div>
    )
}

export default ProfileHeader;