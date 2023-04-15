import { addNewComment, getCommentsByPostId, getPostById } from "@/api/blogApi";
import React, { useContext, useMemo, useState } from "react";
import { TPosts } from "..";
import { GetServerSidePropsContext, NextPage } from "next";
import PostCard from "@/components/PostCard";
import Comment from "@/components/Layout/Comment";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoginContext } from "@/context/LoginContext";
import { useAlert } from "react-alert";

type TPost = {
  comments: [{ userId: number; comment: string }];
  postID: number;
  username: string;
  title: string;
  body: string;
};

export type TComments = {
  postID: number;
  commentID: number;
  commentText: number;
  userID: number;
  username: string;
  created_at: Date;
};

const PostID = (props: { posts: TPosts[]; comments: TComments[] }) => {
  const [comments, setComments] = useState<TComments[]>(props.comments);
  const [replyText, setReplyText] = useState<string>("");
  const [reply, setReply] = useState<boolean>(false);
  const { user } = useContext(LoginContext);
  const router = useRouter();
  const postId = Number(router.query.id);
  const alert = useAlert();

  const transformedPost = useMemo(() => {
    return props.posts.reduce((result: any, current: TPosts) => {
      const { postID, body, commentUser, comment, username } = current;
      // Check if there's an existing entry for this postID in the result array
      const existingEntry: TPost | undefined = result.find(
        (entry: TPosts) => entry.postID === postID
      );
      // If there's an existing entry, add the current comment to its comments array
      if (existingEntry) {
        existingEntry.comments.push({ userId: Number(commentUser), comment });
      }
      // Otherwise, create a new entry for this postID with the current comment
      else {
        result.push({
          postID,
          username,
          body,
          comments: [{ userId: commentUser, comment }],
        });
      }
      return result;
    }, []);
  }, [props.posts]);

  const fetchData = async () => {
    const comments = await getCommentsByPostId(postId);
    setComments(comments.data);
  };

  const handleAddComment = async () => {
    if (user.userID) {
      await addNewComment(user.userID, postId, replyText)
        .then((res) => {
          if (res.status == 200) {
            fetchData();
          }
        })
        .catch((e) => {
          console.log(e);
          alert.error("Something went wrong");
        })
        .finally(() => {
          setReply(false);
        });
    }
  };

  return (
    <div className="container">
      {transformedPost.map((post: TPost) => (
        <div key={post.postID} className="individual-post">
          <PostCard
            id={post.postID}
            username={post.username}
            body={post.body}
            comments={[post.comments[0].comment]}
          />
          <button
            className="btn btn-lg reply-btn"
            onClick={() => setReply(true)}
          >
            <Link href="#comment-here" className="link-reply-btn">
              Reply
            </Link>
          </button>
        </div>
      ))}
      <ul>
        <Comment comments={comments} />
        <section id="comment-here">
          {reply ? (
            <div className="input-group">
              <textarea
                className="form-control"
                aria-label="With textarea"
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
              <button
                className="btn btn-md btn-info text-light"
                onClick={handleAddComment}
              >
                Reply
              </button>
            </div>
          ) : null}
        </section>
      </ul>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = Number(context.query.id);
  const { data: posts } = await getPostById(id);
  const { data: comments } = await getCommentsByPostId(id);

  return {
    props: {
      posts,
      comments,
    },
  };
}

export default PostID;
