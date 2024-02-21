import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  //fetch users
  const { communities, isNext } = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mt-10">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {communities.length === 0 ? (
          <p className="no-result">No results</p>
        ) : (
          communities.map((community) => (
            <CommunityCard
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              imgUrl={community.image}
              bio={community.bio}
              members={community.members}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Page;
