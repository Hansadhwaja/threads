'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


interface Props {
    id: string;
    name: string;
    imgUrl: string;
}

const UserPreviewCard = ({ id, name, imgUrl }: Props) => {
    const router = useRouter();
    return (
        <article className="user-card bg-dark-4 p-2 rounded-xl">
            <div className='user-card_avatar '>
                <div className="relative object-cover w-12 h-12">
                    <Image
                        src={imgUrl}
                        alt="logo"
                        fill
                        className="rounded-full  object-cover shadow-md"
                    />
                </div>

                <div className="flex-1 text-ellipsis">
                    <h4 className="text-light-1 text-[12px]">{name}</h4>
                </div>
            </div>
            <Button size='sm' className="user-card_btn p-1" onClick={() => router.push(`/profile/${id}`)}>
                View
            </Button>
        </article>
    )
}

export default UserPreviewCard