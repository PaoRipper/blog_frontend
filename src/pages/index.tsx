import { useContext, useEffect, useState } from "react";
import { getAllPosts, googleLogin } from "@/api/blogApi";
import { values } from "lodash";
import { LoginContext } from "@/context/LoginContext";
import { useCookies } from "react-cookie";
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
  topPosts: TPosts[];
  otherPosts: TPosts[];
};

export type TSnow = {
  color: string;
  snowflakeCount: number;
  wind: [number, number];
};

export default function Home(props: { data: TPosts[] }) {
  const { setUser } = useContext(LoginContext);
  const [posts, setPosts] = useState<TPosts[]>([]);
  const [cookies] = useCookies();
  const [postsSorted, setPostsSorted] = useState<TPostsSorted>({
    topPosts: [],
    otherPosts: [],
  });
  const [snow, setSnow] = useState<TSnow>({
    color: "#FF4378",
    snowflakeCount: 80,
    wind: [3, 5],
  });

  useEffect(() => {
    setPosts(
      values(
        props.data.reduce((acc: any, obj: TPosts) => {
          const { postID, postText, commentText, username } = obj;
          if (acc[postID]) {
            acc[postID].comments.push(commentText);
          } else {
            acc[postID] = {
              postID,
              username,
              body: postText,
              comments: [commentText],
            };
          }
          return acc;
        }, {})
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const result: TPostsSorted = posts.reduce(
      (acc: any, post: TPosts) => {
        if (post.comments.length >= 1 && acc.topPosts.length < 3) {
          acc.topPosts.push(post);
        } else {
          acc.otherPosts.push(post);
        }
        return acc;
      },
      { topPosts: [], otherPosts: [] }
    );
    setPostsSorted(result);
  }, [posts]);

  useEffect(() => {
    const sessionId = cookies["connect.sid"];
    if (sessionId) {
      googleLogin().then((res) => {
        const { userID, username } = res.data.user;
        const { auth, connect_sid } = res.data;
        setUser({ auth, token: connect_sid, userID, username });
        window && window.localStorage.setItem("isLogin", "true");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {postsSorted.topPosts.map((post, index) => (
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
            {postsSorted.otherPosts.map((post, index) => (
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const data = await getAllPosts().then((res) => res);
  return {
    props: {
      data,
    },
  };
};
