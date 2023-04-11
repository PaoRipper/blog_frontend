/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

import Person from "/public/assets/images/Rubio_Circle.png";
import ProfileLayout from "./Layout/ProfileLayout";
import { shortText } from "@/utils/formatUtils";

const PostCard = (props: {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  id: number;
  username: string;
  body: string;
  comments: string[];
  clickable?: boolean;
  hideComment?: boolean;
}) => {
  const [moreComment, setMoreComment] = useState<number>(0);
  const [comment, setComment] = useState<ReactNode>();
  const [clickable, setClickable] = useState(true);
  const [hideComment, setHideComment] = useState(false);

  useEffect(() => {
    setMoreComment(props.comments.length - 1);
    if (
      props.comments &&
      props.comments.length >= 1 &&
      props.comments[0] != null
    ) {
      const comment = props.comments.length > 0 && (
        <div className="comment">
          <Image
            src={Person}
            width={30}
            height={30}
            alt="commenter"
            className="comment-profile-image"
          />
          <em className="comment-text">{shortText(props.comments[0])}</em>
          <span className="comment-see-more">
            {moreComment >= 1 ? `+${moreComment} more` : ""}
          </span>
        </div>
      );
      comment && setComment(comment);
    }
  }, [moreComment]);

  useEffect(() => {
    if (props.clickable === false) {
      setClickable(false);
    } else setClickable(true);
    if (props.hideComment === true) {
      setHideComment(true);
    }
  }, []);

  return clickable ? (
    <Link
      className={`card hoverable ${props.className}`}
      href={`post/${props.id}`}
    >
      <div className={`card-header ${props.headerClassName}`}>
        <ProfileLayout username={props.username} />
      </div>
      <div className={`card-body ${props.bodyClassName}`}>
        <p className={`card-text`}>{props.body}</p>
      </div>
      <div
        hidden={hideComment}
        className={`card-footer ${props.footerClassName}`}
      >
        {comment}
      </div>
    </Link>
  ) : (
    <div className={`card ${props.className}`}>
      <div className={`card-header ${props.headerClassName}`}>
        <ProfileLayout username={props.username} imgClassName="profile-img" profileClassName="profile-name"/>
      </div>
      <div className={`card-body ${props.bodyClassName}`}>
        <p className={`card-text fs-2`}>{props.body}</p>
      </div>
      <div
        hidden={hideComment}
        className={`card-footer ${props.footerClassName}`}
      >
        {comment}
      </div>
    </div>
  );
};

export default PostCard;
