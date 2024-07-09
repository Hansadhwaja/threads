import { fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import React from 'react'
import UserPreviewCard from '../cards/UserPreviewCard';

const SuggestedUsers = async () => {
  const user = await currentUser();

  if (!user) return null;

  const result= await fetchUsers({
    userId:user.id,
    searchString:'',
    pageNumber:1,
    pageSize:25
  });

  return (
    <div>
      <h1>SuggestedUsers</h1>
      <div className="mt-5 flex flex-col gap-3 h-[220px] overflow-y-auto">
                {result.users.length === 0 ?(
                    <p className="no-result">No Users</p>
                ):(
                    <>
                    {result.users.map((person)=>(
                        <UserPreviewCard
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        imgUrl={person.image}
                        />
                    ))}
                    </>
                )}
            </div>
      </div>
  )
}

export default SuggestedUsers