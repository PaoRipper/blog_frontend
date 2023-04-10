import { TPostList } from "@/pages/profile";
import React from "react";

const PostList = (props: { posts: TPostList[] }) => {
  return (
    <div>
      {props.posts.map((post) => (
        <div className="post-list" key={post.id}>
          <div className="row">
            <div className="col-lg-3 comments-tab">
              <h6 className="post-list-comment text-center">
                {post.comments} {post.comments > 1 ? "comments" : "comment"}
              </h6>
            </div>
            <div className="col-lg-3">
              <h6 className="post-list-body">{post.body}</h6>
            </div>
            <div className="col-lg-3">
              <h4 className="post-list-badge">{post.badge}</h4>
            </div>
            <div className="col-lg-3">
              <h4 className="btn btn-lg post-list-btn">
                <div className="circle"></div>Delete
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
