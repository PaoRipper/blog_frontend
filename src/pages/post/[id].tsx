import { addNewComment, getCommentsByPostId, getPostById } from "@/api/blogApi";
import React, { useContext, useMemo, useState } from "react";
import { TPosts } from "..";
import { GetServerSidePropsContext, NextPage } from "next";
import PostCard from "@/components/PostCard";
import CommentList from "@/components/Layout/Comment";
import { useRouter } from "next/router";
import { LoginContext } from "@/context/LoginContext";
import { useAlert } from "react-alert";
import ProfileLayout from "@/components/Layout/ProfileLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
  const { user, isLogin } = useContext(LoginContext);
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
          setReplyText("")
        });
    }
  };

  const handleComment = () => {
    if (!isLogin) {
      alert.info("Please login to comment")
    } else {
      setReply(true)
      const commentSection = document.getElementById("comment-here");
      commentSection?.scrollIntoView({behavior: "smooth"})
    }
  }

  const handleLike = () => {
    console.log("liked");
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
            onClick={{ like: handleLike, comment: handleComment }}
          />
        </div>
      ))}
      <ul>
        <CommentList comments={comments} />
        <section id="comment-here">
          {reply && isLogin ? (
            <div className="input-group">
              <ProfileLayout/>
              <textarea
                id="comment-textarea"
                className="form-control "
                aria-label="With textarea"
                placeholder="Write your comment"
                value={replyText}
                rows={4}
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="lg"
                className={`submit-comment-icon ${replyText ? 'hasComment' : "noComment"}`}
                onClick={handleAddComment}
              />
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
