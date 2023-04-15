/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ProfileLayout from "./Layout/ProfileLayout";

const PostCard = (props: {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  id: number;
  username: string;
  body: string;
  comments: string[];
}) => {
  return (
    <div className="card card-by-id">
      <div className="card-header header-card-by-id">
        <ProfileLayout
          username={props.username}
          imgClassName="profile-img"
          profileClassName="profile-name"
        />
      </div>
      <div className="card-body">
        <p className="card-text card-text-id fs-2">{props.body}</p>
      </div>
    </div>
  );
};

export default PostCard;
