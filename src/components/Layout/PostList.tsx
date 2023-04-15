import { deletePostById } from "@/api/blogApi";
import { TPostList } from "@/pages/user/[userId]";
import { shortText } from "@/utils/formatUtils";
import React from "react";

const PostList = (props: {
  posts: TPostList[];
  handleFnc?: {
    fnc: (...params: any) => any,
    text: string
  }
}) => {
  const processCommentsCount = (comment_count: number) => {
    if (comment_count > 0) {
      if (comment_count === 1) {
        return `${comment_count} comment`;
      } else {
        return `${comment_count} comments`;
      }
    } else {
      return "0 comment";
    }
  };

  return (
    <div>
      {props.posts.map((post) => (
        <div className="post-list" key={post.postID}>
          <div className="row">
            <div className="col-lg-3 comments-tab">
              <h6 className="post-list-comment text-center">
                {processCommentsCount(post.comments_count)}
              </h6>
            </div>
            <div className="col-lg-3">
              <h6 className="post-list-body">{shortText(post.postText)}</h6>
            </div>
            <div className="col-lg-3">
              <h4 className="post-list-badge">Immortal!</h4>
            </div>
            <div className="col-lg-3">
              <button
                className="btn btn-lg post-list-btn"
                onClick={() =>
                  props.handleFnc
                    ? props.handleFnc.fnc(post.postID)
                    : null
                }
              >
                <div className="circle"></div>{props.handleFnc?.text}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
