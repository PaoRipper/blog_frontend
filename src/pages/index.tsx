import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { useContext, useEffect, useMemo, useState } from "react";
import { addPost, getAllPosts, googleLogin } from "@/api/blogApi";
import { values } from "lodash";
import { LoginContext } from "@/context/LoginContext";
import { useCookies } from "react-cookie";

export type TPosts = {
  commentID: number;
  commentText: string;
  created_at: string | null;
  postID: number;
  postText: string;
  postTitle: string;
  userID: string;
  comments: string[];
};

export default function Home() {
  const { login, logout, setUser, user, setIsLogin } = useContext(LoginContext);
  const [posts, setPosts] = useState<TPosts[]>([]);
  const [cookies, setCookies, removeCookie] = useCookies();
  const isLogin = useMemo(() => user.auth, [user]);

  const topPosts = [
    {
      title: "ของโคตรดีย์",
      description: "ดับเบิ้ลห",
      comments: ["เบิ้มๆ คือลือน่ะ"],
    },
    {
      title: "Milf is the best",
      description: "milf really is the best guys",
      comments: ["โคตรแจ่ม"],
    },
    {
      title: "วาร์ปประจำวันสหาย",
      description: "235126",
      comments: ["359456", "537891"],
    },
  ];

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(
        values(
          res.reduce((acc: any, obj: any) => {
            const { postID, postTitle, postText, commentText } = obj;
            if (acc[postID]) {
              acc[postID].comments.push(commentText);
            } else {
              acc[postID] = {
                postID,
                postTitle,
                postText,
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
        const auth = res.data.auth;
        const username = res.data.user.username;
        const connect_sid = res.data.connect_sid;
        setUser({ auth, token: connect_sid, username });
        setIsLogin(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section id="top-section">
        <section id="card-section">
          {/* {isLogin ? (
            <h1 className="text-success text-center">{user.username}</h1>
          ) : (
            <h1 className="text-danger text-center">You are not logged in</h1>
          )} */}
          <h1>Top Bon</h1>
          <div className="row">
            {topPosts.map((post, index) => (
              <div key={index} className="col-lg-4">
                <PostCard
                  title={post.title}
                  description={post.description}
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
                  title={post.postTitle}
                  description={post.postText}
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
