import { fetchCommunities } from '@/lib/actions/community.actions'
import CommunityPreviewCard from '../cards/CommunityPreviewCard';

const SuggestedCommunities = async () => {
  const result = await fetchCommunities({
    searchString: '',
    pageNumber: 1,
    pageSize: 20
  });

  return (
    <div>
      <h1>SuggestedCommunities</h1>
      <div className="mt-5 flex flex-col gap-3 h-[220px] overflow-y-auto">
        {result.communities.length === 0 ? (
          <p className="no-result">No Communities</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityPreviewCard
                key={community.id}
                id={community.id}
                name={community.name}
                imgUrl={community.image}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default SuggestedCommunities