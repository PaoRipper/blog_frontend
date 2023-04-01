import { getPostById } from "@/api/blogApi";
import { useRouter } from "next/router";
import React, {
  ContextType,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TPosts } from "..";
import { GetServerSidePropsContext, NextPage } from "next";
import PostCard from "@/components/PostCard";
import { LoginContext } from "@/context/LoginContext";

type TPost = {
  comments: [{ userId: number; comment: string }];
  postID: number;
  title: string;
  body: string;
};

const PostID = (props: { data: TPosts[] }) => {
  const { isLogin } = useContext(LoginContext);
  const router = useRouter();
  const transformedPost = useMemo(() => {
    return props.data.reduce((result: any, current) => {
      const { postID, postText, postTitle, commentUser, comment } = current;
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
          title: postTitle,
          body: postText,
          comments: [{ userId: commentUser, comment }],
        });
      }
      return result;
    }, []);
  }, [props.data]);

  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(isLogin);
  

  return (
    <div className="container">
      {transformedPost.map((post: TPost) => (
        <div key={post.postID}>
          <PostCard
            id={post.postID}
            title={post.title}
            description={post.body}
            comments={[post.comments[0].comment]}
            clickable={false}
          />
        </div>
      ))}
      <div className="comment">
        <h1>Comment</h1>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = Number(context.query.id);
  const data = await getPostById(id).then((res) => res);

  return {
    props: {
      data,
    },
  };
}

export default PostID;
