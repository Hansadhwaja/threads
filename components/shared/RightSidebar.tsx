import SuggestedCommunities from "./SuggestedCommunities";
import SuggestedUsers from "./SuggestedUsers";

export default function RightSidebar() {
    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col">
                <h3 className="text-heading4-medium text-light-1">
                    <SuggestedCommunities />
                </h3>

            </div>
            <div className="flex flex-1 flex-col">
                <h3 className="text-heading4-medium text-light-1">
                    <SuggestedUsers />
                </h3>

            </div>

        </section>
    )
}