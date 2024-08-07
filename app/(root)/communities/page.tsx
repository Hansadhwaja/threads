
import CommunityCard from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    const result = await fetchCommunities({
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    });

    if (!userInfo?.onboarded) redirect('/onboarding');

    return (
        <section >
            <h1 className='head-text mb-10'>Communities</h1>

            <div className="mt-14 flex flex-wrap gap-9">
                {result.communities.length === 0 ? (
                    <p className="no-result">No Communities</p>
                ) : (
                    <>
                        {result.communities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default Page;