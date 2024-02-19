import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "@/node_modules/next/navigation";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create thread</h1>
      <PostThread userId={user.id} />
    </>
  );
}

export default Page;
