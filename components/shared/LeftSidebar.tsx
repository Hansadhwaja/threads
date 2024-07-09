"use client"

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

export default function LeftSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { userId } = useAuth();


    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-3 px-6">
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) &&
                        link.route.length > 1) || pathname == link.route;

                    if (link.route === '/profile') link.route = `${link.route}/${userId}`
                    return (

                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftidebar_link rounded-lg p-4 lg:px-4 lg:py-2 ${isActive && `bg-primary-500`}`}
                        >
                            <div className="flex  items-stretch">
                                <Image
                                    src={link.imgURL}
                                    alt={link.label}
                                    width={24}
                                    height={24}
                                />
                                <p className="text-light-1 text-sm max-lg:hidden py-4 px-4">{link.label}</p>
                            </div>
                        </Link>
                    )
                }
                )}

            </div>

            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton signOutCallback={() =>
                        router.push("/sign-in")}>
                        <div className="flex cursor-pointer gap-2 p-2 ">
                            <Image
                                src="/assets/logout.svg"
                                alt="logout"
                                width={24}
                                height={24}
                            />
                            <p className="text-light-2 text-sm max-lg:hidden  py-4 px-4 ">Logout</p>

                        </div>
                    </SignOutButton>
                </SignedIn>

            </div>

        </section>
    )
}