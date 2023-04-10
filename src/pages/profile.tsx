import Dropdown from "@/components/Dropdown";
import PostList from "@/components/Layout/PostList";
import { LoginContext } from "@/context/LoginContext";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";

export type TPostList = {
  id: number;
  body: string;
  comments: number;
  badge: string;
};

const Profile = () => {
  const { isLogin } = useContext(LoginContext);
  const router = useRouter();
  const dropdownItems = ["Most comments", "Less comments", "No comment"];
  const [selectedValue, setSelectedValue] = useState(dropdownItems[0]);
  const [posts, setPosts] = useState<TPostList[]>([
    {
      id: 1,
      body: "re4 remake so good",
      comments: 10,
      badge: "Immortal!",
    },
    {
      id: 2,
      body: "Forspoken suck man",
      comments: 5,
      badge: "On fire!",
    },
    {
      id: 3,
      body: "I'm waiting for Dead Island 2",
      comments: 3,
      badge: "Its okay!",
    },
    {
      id: 4,
      body: "Milf is the best",
      comments: 6,
      badge: "Amazooooo!",
    },
    {
      id: 5,
      body: "Ada is so good",
      comments: 4,
      badge: "Keep going!",
    },
  ]);

  useEffect(() => {
    if (!isLogin) {
      router.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);


  // if (!isLogin) {
  //   router.push("/");
  //   return null
  // }

  const handleDropdownClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setSelectedValue(e.currentTarget.textContent || dropdownItems[0]);
  };

  return (
    <section id="profile-section">
      <div className="container">
        <Dropdown
          dropdownItems={dropdownItems}
          currentValue={selectedValue}
          onClick={(e) => handleDropdownClick(e)}
        />
        <ul className="profile-type">
          <li className="profile-list">My Posts ({posts.length})</li>
        </ul>
        <PostList posts={posts} />
      </div>
    </section>
  );
};

export default Profile;
