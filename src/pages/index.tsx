import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "@/api/blogApi";
import { values } from "lodash";
import { LoginContext } from "@/context/LoginContext";
import { GetServerSidePropsContext } from "next";
import Snowfall from "react-snowfall";
import SnowTools from "@/components/SnowTools";
import HoverPostCard from "@/components/HoverPostCard";

export type TPosts = {
  commentID: number;
  commentText: string;
  created_at: string | null;
  postID: number;
  username: string;
  postText: string;
  body: string;
  userID: string;
  comments: string[];
  comment: string;
  commentUser: string;
};

type TPostsSorted = {
  top: TPosts[];
  others: TPosts[];
};

export type TSnow = {
  color: string;
  snowflakeCount: number;
  wind: [number, number];
};

export default function Home(props: { data: TPosts[] }) {
  const { user } = useContext(LoginContext);
  const [posts, setPosts] = useState<TPosts[]>(() => {
    return values(
      props.data.reduce((res: any, obj: TPosts) => {
        const { postID, postText, commentText, username } = obj;
        if (res[postID]) {
          res[postID].comments.push(commentText);
        } else {
          res[postID] = {
            postID,
            username,
            body: postText,
            comments: [commentText],
          };
        }
        return res;
      }, {})
    );
  });
  const [postsSorted, setPostsSorted] = useState<TPostsSorted>({
    top: [],
    others: [],
  });
  const [snow, setSnow] = useState<TSnow>({
    color: "#FF4378",
    snowflakeCount: 80,
    wind: [3, 5],
  });

  useEffect(() => {
    const result: TPostsSorted = posts.reduce(
      (res: any, post: TPosts) => {
        const checkCommentLength = res.top.some(
          (p: TPosts) => post.comments.length > p.comments.length
        );
        if (res.top.length < 3 || checkCommentLength) {
          res.top.push(post);
          res.top.sort(
            (a: TPosts, b: TPosts) => b.comments.length - a.comments.length
          );
          const remaining = res.top.slice(3);
          res.top = res.top.slice(0, 3);
          res.others.push(...remaining);
        } else {
          res.others.push(post);
        }
        return res;
      },
      { top: [], others: [] }
    );
    setPostsSorted(result);
  }, [posts]);

  return (
    <>
      <section id="top-section">
        <Snowfall
          style={{ position: "fixed", width: "100vw", height: "100vh" }}
          color={snow.color}
          snowflakeCount={snow.snowflakeCount}
          wind={snow.wind}
        />
        <section id="card-section">
          <div className="d-flex justify-content-between">
            <h1 className="fw-bold">TOP BON</h1>
            <SnowTools snow={snow} setSnow={setSnow} />
          </div>
          <div className="row">
            {postsSorted.top.map((post, index) => (
              <div key={index} className="col-lg-4">
                <HoverPostCard
                  id={post.postID}
                  username={post.username}
                  body={post.body}
                  comments={post.comments}
                />
              </div>
            ))}
          </div>
        </section>
      </section>
      <section id="middle-section">
        <section id="card-section">
          <h1 className="fw-bold">OTHERS BON</h1>
          <div className="row">
            {postsSorted.others.map((post, index) => (
              <div key={index} className="col-lg-3">
                <HoverPostCard
                  id={post.postID}
                  username={post.username}
                  body={post.body}
                  comments={post.comments}
                />
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

export const getServerSideProps = async () => {
  const { data } = await getAllPosts();
  return {
    props: {
      data,
    },
  };
};
