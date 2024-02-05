import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function Page() {
    const user=await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    const userData={
        id:user?.id,
        objectid:userInfo?._id,
        username: userInfo?.username||user?.username,
        name:userInfo?.name||user?.firstName||"",
        bio:userInfo?.bio||"",
        image:userInfo?.image||user?.imageUrl
    };


    return(
        <main className="mx-auto px-10 pt-10 flex flex-col justify-start max-w-3xl w-[700px]">
            <h1 className="head-text px-5">Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2 px-5">
                Complete Your profile now to use Threads
            </p>
            <section className="mt-3 bg-dark-2 p-5">
                <AccountProfile 
                user={userData}
                btnTitle="Continue"
                />
            </section>
        </main>
    )
}

export default Page;