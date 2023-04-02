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
  username: string,
  title: string;
  body: string;
};

const PostID = (props: { data: TPosts[] }) => {
  const transformedPost = useMemo(() => {
    return props.data.reduce((result: any, current: TPosts) => {
      const { postID, postText, commentUser, comment, username } = current;
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
          body: postText,
          comments: [{ userId: commentUser, comment }],
        });
      }
      return result;
    }, []);
  }, [props.data]);

  

  return (
    <div className="container">
      {transformedPost.map((post: TPost) => (
        <div key={post.postID}>
          <PostCard
            id={post.postID}
            username={post.username}
            body={post.body}
            comments={[post.comments[0].comment]}
            clickable={false}
          />
        </div>
      ))}
      
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
