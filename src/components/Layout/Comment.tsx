import { TComments } from "@/pages/post/[id]";
import React from "react";
import ProfileLayout from "./ProfileLayout";
import moment from "moment";

const CommentList = (props: { comments: TComments[] }) => {
  return (
    <div className="comments">
      {props.comments.map((item) => (
        <div key={item.commentID} className="comment-item">
          <ProfileLayout username={item.username} profileClassName="fw-bold" />
          <p className="comment-body">{item.commentText}</p>
          <p className="time-ago">{moment(item.created_at).fromNow()}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
