import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { Vote } from "@/components/Vote";
import { db } from "@/db";
import Link from "next/link";
import Tiptap from "@/components/TipTapTextViewer";

export async function generateMetadata({ params }) {
  const postId = params.postId;

  const { rows: posts } = await db.query(
    `SELECT posts.title FROM posts
    WHERE posts.id = $1;`,
    [postId]
  );
  const post = posts[0];

  return {
    title: post.title,
  };
}

export default async function SinglePostPage({ params }) {
  const postId = params.postId;

  const { rows: posts } = await db.query(
    `SELECT posts.id, posts.title, posts.body, posts.created_at, users.name, 
    COALESCE(SUM(votes.vote), 0) AS vote_total
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN votes ON votes.post_id = posts.id
    WHERE posts.id = $1
    GROUP BY posts.id, users.name
    LIMIT 1;`,
    [postId]
  );
  const post = posts[0];

  const { rows: votes } = await db.query(
    `SELECT *, users.name from votes
     JOIN users on votes.user_id = users.id`
  );

  return (
    <div className="max-w-screen-lg mx-auto pt-4 pr-4">
      <Link href="/" className="hover:bg-zinc-300 p-2 rounded bg-pink-300 text-black">
        Back
      </Link>
      <div className="flex space-x-6">
        <Vote postId={post.id} votes={post.vote_total} />
        <div className="">
          <h1 className="text-2xl">{post.title}</h1>
          <p className="text-zinc-400 mb-4">
            Posted by {post.name} at {post.created_at.toLocaleString()}
          </p>
        </div>
      </div>
      <main className="whitespace-pre-wrap m-4">
        <Tiptap content={post.body} />
      </main>

      <CommentForm postId={post.id} />
      <CommentList postId={post.id} />
    </div>
  );
}
