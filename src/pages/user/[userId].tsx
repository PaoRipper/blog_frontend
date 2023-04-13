import { getPostByUserId } from "@/api/blogApi";
import Dropdown from "@/components/Dropdown";
import PostList from "@/components/Layout/PostList";
import { LoginContext } from "@/context/LoginContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect, useMemo } from "react";

export type TPostList = {
  postID: number;
  postText: string;
  comments_count: number;
  badge?: string;
};

const Profile = (props: { data: TPostList[] }) => {
  const { isLogin } = useContext(LoginContext);
  const router = useRouter();
  const userId = Number(router.query.userId);
  const dropdownItems = ["Most comments", "Less comments"];
  const [selectedValue, setSelectedValue] = useState(dropdownItems[0]);
  const [posts, setPosts] = useState<TPostList[]>(props.data);

  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const handleDropdownClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setSelectedValue(e.currentTarget.textContent || dropdownItems[0]);
  };

  const queryFilter = useMemo(() => {
    return {
      sortBy: selectedValue,
    };
  }, [selectedValue]);

  useEffect(() => {
    getPostByUserId(userId, queryFilter).then((res) => {
      setPosts(res);
    });
  }, [userId, queryFilter]);

  return (
    <section id="profile-section">
      {posts.length > 0 ? (
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
      ) : (
        <div className="container no-post">
          <h5 className="text-center">
            You have no, try <Link href="/create">post</Link> some!
          </h5>
        </div>
      )}
    </section>
  );
};

export default Profile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userId = Number(context.query.userId);
  const data = await getPostByUserId(userId);
  return {
    props: {
      data,
    },
  };
};
