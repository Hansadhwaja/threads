'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}


const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
    const router = useRouter();
    return (
        <article className="user-card">
            <div className='user-card_avatar '>
                <div className="relative object-cover h-20 w-20">
                <Image
                    src={imgUrl}
                    alt="logo"
                    fill
                    className="rounded-full  object-cover shadow-2xl"
                />
                </div>
               
                <div className="flex-1 text-ellipsis">
                    <h4 className="text-light-1 text-base-semibold">{name}</h4>
                    <p className="text-small-medium text-gray-1">@{username}</p>
                </div>
            </div>
            <Button className="user-card_btn" onClick={() => router.push(`/profile/${id}`)}>
                View
            </Button>
        </article>
    )
}

export default UserCard