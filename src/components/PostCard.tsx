/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ProfileLayout from "./Layout/ProfileLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const PostCard = (props: {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  id: number;
  username: string;
  body: string;
  comments: string[];
  onClick?: {
    like: () => void;
    comment: () => void;
  };
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
      <div className="card-footer">
        <div className="row">
          <div className="col-lg-6 card-footer-item">
            <FontAwesomeIcon icon={faThumbsUp} size="lg" />
            <span
              className="fs-5 card-footer-text"
              onClick={props.onClick?.like && props.onClick.like}
            >
              Like
            </span>
          </div>
          <div className="col-lg-6 card-footer-item">
            <FontAwesomeIcon icon={faComment} size="lg" />
            <span
              className="fs-5 card-footer-text"
              onClick={props.onClick?.comment && props.onClick.comment}
            >
              Comment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
