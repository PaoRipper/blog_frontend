import { deletePostById, getPostByUserId } from "@/api/blogApi";
import CustomDropdown from "@/components/CustomDropdown";
import Dropdown from "@/components/Dropdown";
import PostList from "@/components/Layout/PostList";
import { LoginContext } from "@/context/LoginContext";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect, useMemo } from "react";
import { useAlert } from "react-alert";

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
  const alert = useAlert();
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

  const fetchPosts = async () => {
    const data = await getPostByUserId(userId, queryFilter);
    setPosts(data);
  };

  const handleDeletePost = async (id: number) => {
    const data = await deletePostById(id);
    if (data.message == "success") {
      fetchPosts();
      alert.success("Delete success!");
    } else {
      alert.success("Delete error!");
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, queryFilter]);

  return (
    <section id="profile-section">
      {posts.length > 0 ? (
        <div className="container">
          <CustomDropdown
            dropdownItems={dropdownItems}
            currentValue={selectedValue}
            onClick={(e) => handleDropdownClick(e)}
            arrow={true}
            className="profile-dropdown"
          />
          <ul className="profile-type">
            <li className="profile-list">My Posts ({posts.length})</li>
          </ul>
          <PostList posts={posts} handleDeletePost={handleDeletePost} />
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
