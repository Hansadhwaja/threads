
import UserCard from "@/components/cards/UserCard";
import SearchComponent from "@/components/shared/SearchComponent";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface User {
    id: string;
    name: string;
    username: string;
    image: string;
}

const Page = async () => {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    });

    const serializedUsers = result.users.map((user: User) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image,
    }));

    if (!userInfo?.onboarded) redirect('/onboarding');
    return (
        <section>
            <h1 className='head-text mb-10'>Search</h1>
            <SearchComponent initialUsers={serializedUsers} userId={user.id} />
        </section>
    )
}

export default Page;