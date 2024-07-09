
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThread } from "@/lib/actions/thread.actions";
import { updateManualUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";


export default async function Home() {
  const result = await fetchThread(1, 30);
  const user = await currentUser();


  await updateManualUser({
    username: user?.username || "",
    name: user?.firstName || "",
    image: user?.imageUrl || "",
    userId: user?.id || ""
  });

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No Threads Found</p>
        ) : (
          <>
            {result.posts.map((post) => (

              < ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ''}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />

            ))}
          </>
        )}
      </section>
    </>
  )
}


