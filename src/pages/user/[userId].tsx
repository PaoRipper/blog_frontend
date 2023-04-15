import {
  deletePostById,
  getPostByUserId,
  getPostUserFollow,
} from "@/api/blogApi";
import CustomDropdown from "@/components/CustomDropdown";
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

export type TTabs = {
  key: string;
  text: string;
  onClick: {
    fnc: (...params: any) => any;
    text: string;
  };
  data: TPostList[];
};

const Profile = (props: { data: TPostList[] }) => {
  const { isLogin } = useContext(LoginContext);
  const router = useRouter();
  const userId = Number(router.query.userId);
  const alert = useAlert();
  const dropdownItems = ["Most comments", "Less comments"];
  const [selectedValue, setSelectedValue] = useState(dropdownItems[0]);
  const [posts, setPosts] = useState<TPostList[]>(props.data);
  const [followedPost, setFollowedPost] = useState<TPostList[]>(props.data);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleDeletePost = async (postId: number) => {
    const data = await deletePostById(postId);
    if (data.message == "success") {
      fetchPosts();
      alert.success("Delete success!");
    } else {
      alert.success("Delete error!");
    }
  };

  const handleRemoveFollow = async (postId: number) => {
    
  };

  const tabs: TTabs[] = [
    {
      key: "my_posts",
      text: "My Posts",
      onClick: {
        fnc: handleDeletePost,
        text: "Delete",
      },
      data: posts,
    },
    {
      key: "following",
      text: "Following",
      onClick: {
        fnc: handleRemoveFollow,
        text: "Unfollow",
      },
      data: followedPost,
    },
  ];

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
    const posts = await getPostByUserId(userId, queryFilter);
    setPosts(posts.data);
    const followedPost = await getPostUserFollow(userId, queryFilter);
    setFollowedPost(followedPost.data);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, queryFilter]);

  return (
    <section id="profile-section">
      <div className="container">
        <div className="tabs ">
          <CustomDropdown
            dropdownItems={dropdownItems}
            currentValue={selectedValue}
            onClick={(e) => handleDropdownClick(e)}
            arrow={true}
            className="profile-dropdown"
          />
          <div>
            <ul>
              {tabs.map((tab, index) => (
                <li
                  key={tab.key}
                  className={`tab ${
                    index === activeTab ? "active" : ""
                  } profile-list`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.text} ({tab.data.length})
                </li>
              ))}
            </ul>
            {tabs[activeTab].data.length > 0 ? (
              <div className="tab-content">
                <PostList
                  posts={tabs[activeTab].data}
                  handleFnc={tabs[activeTab].onClick}
                />
              </div>
            ) : (
              <div className="container no-post">
                <h5 className="text-center">
                  You have no, try <Link href="/create">post</Link> some!
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userId = Number(context.query.userId);
  const { data } = await getPostByUserId(userId);
  return {
    props: {
      data,
    },
  };
};
