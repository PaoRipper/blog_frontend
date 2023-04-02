import PostCard from "@/components/PostCard";
import { useContext, useEffect, useMemo, useState } from "react";
import { getAllPosts, googleLogin } from "@/api/blogApi";
import { values } from "lodash";
import { LoginContext } from "@/context/LoginContext";
import { useCookies } from "react-cookie";

export type TPosts = {
  commentID: number;
  commentText: string;
  created_at: string | null;
  postID: number;
  username: string,
  postText: string,
  body: string;
  userID: string;
  comments: string[];
  comment: string;
  commentUser: string;
};

export default function Home() {
  const { setUser, setIsLogin } = useContext(LoginContext);
  const [posts, setPosts] = useState<TPosts[]>([]);
  const [cookies, setCookies, removeCookie] = useCookies();

  const topPosts = [
    {
      id: 1,
      body: "ดับเบิ้ลห",
      username: "Paori",
      comments: ["เบิ้มๆ คือลือน่ะ"],
    },
    {
      id: 2,
      body: "milf really is the best guys",
      username: "NT",
      comments: ["โคตรแจ่ม"],
    },
    {
      id: 3,
      body: "235126",
      username: "RRRR",
      comments: ["359456", "537891"],
    },
  ];

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(
        values(
          res.reduce((acc: any, obj: any) => {
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
    });
  }, []);


  useEffect(() => {
    const sessionId = cookies["connect.sid"];
    if (sessionId) {
      googleLogin().then((res) => {
        const {userID, username} = res.data.user
        const { auth, connect_sid } = res.data;
        setUser({ auth, token: connect_sid, userID, username });
        // setIsLogin(true)
        window && window.localStorage.setItem("isLogin", "true");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section id="top-section">
        <section id="card-section">
          <h1>Top Bon</h1>
          <div className="row">
            {topPosts.map((post, index) => (
              <div key={index} className="col-lg-4">
                <PostCard
                  id={post.id}
                  username={post.username}
                  // title={post.title}
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
          <h1>Other Bon</h1>
          <div className="row">
            {posts.map((post, index) => (
              <div key={index} className="col-lg-3">
                <PostCard
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
