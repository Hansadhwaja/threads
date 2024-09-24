
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignOutButton, OrganizationSwitcher, SignedOut, SignInButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { currentUser } from "@clerk/nextjs/server";


export default async  function Topbar() {
    const user = await currentUser();

    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image
                    src="/assets/logo.svg"
                    alt="logo"
                    width={28}
                    height={28} />
                <p className="text-heading3-bold text-light-1">Threads</p>
            </Link>

            <div className="flex items-center gap-1">
                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4"
                        }
                    }}
                />
                <div className="block md:hidden">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image
                                    src="/assets/logout.svg"
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />

                            </div>

                        </SignOutButton>
                    </SignedIn>

                </div>
                {!user && (
                    <div className="block text-white bg-primary-500 px-4 py-2 rounded-lg">
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                    </div>
                )}

            </div>
        </nav>
    )
}