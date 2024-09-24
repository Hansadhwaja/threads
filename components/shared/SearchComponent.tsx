'use client'
import { useEffect, useState } from 'react';
import UserCard from '../cards/UserCard'
import { fetchUsers } from '@/lib/actions/user.actions';
import { Button } from '../ui/button';

interface User {
    id: string;
    name: string;
    username: string;
    image: string;
}

interface SearchComponentProps {
    initialUsers: User[];
    userId: string;
}


const SearchComponent = ({ initialUsers, userId }: SearchComponentProps) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchString, setSearchString] = useState('');

    const searchUsers = async (searchString: string) => {
        const result = await fetchUsers({
            userId,
            searchString,
            pageNumber: 1,
            pageSize: 25,
        });
        setUsers(result.users);
    };

    useEffect(() => {
        if (searchString) {
            searchUsers(searchString);
        } else {
            setUsers(initialUsers);
        }
    }, [searchString]);



    return (
        <div>
            <form className='w-full flex gap-3'>
                <input
                    type="text"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder="Search users..."
                    className=" p-2 rounded-xl w-full"
                />
                <Button className='bg-primary-500' type="submit">Search</Button>
            </form>

            <div className="mt-14 flex flex-col gap-9">
                {initialUsers.length === 0 ? (
                    <p className="no-result">No Users</p>
                ) : (
                    <>
                        {users.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default SearchComponent