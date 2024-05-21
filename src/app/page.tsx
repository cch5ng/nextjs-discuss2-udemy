import { Divider } from "@nextui-org/react";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm />
        <Divider className="my-2" />
        <h3 className="text-lg">Topics</h3>
        <TopicList />
      </div>
    </div>

  )
}

/*

  const session = await auth();

//TODO want to use time based caching on content here (for updating posts regularly)

  return (
    <div>
      {/* <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <br />
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {
        session?.user ? <div>{JSON.stringify(session.user)}</div> : <div>Signed Out</div>
      } 

      <Profile />
    </div>
    )

*/
