/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

import Person from "/public/assets/images/Rubio_Circle.png";
import ProfileLayout from "./Layout/ProfileLayout";
import { shortText } from "@/utils/formatUtils";

const PostCard = (props: {
  id: number;
  username: string;
  body: string;
  comments: string[];
  clickable?: boolean;
}) => {
  const [moreComment, setMoreComment] = useState<number>(0);
  const [comment, setComment] = useState<ReactNode>();
  const [clickable, setClickable] = useState(true);

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
          <em className="comment-text">{shortText(props.comments[0]) }</em>
          <Link href={"#"} className="comment-see-more">
            {moreComment >= 1 ? `+${moreComment} more` : ""}
          </Link>
        </div>
      );
      comment && setComment(comment);
    }
  }, [moreComment]);

  useEffect(() => {
    if (props.clickable === false) {
      setClickable(false);
    } else setClickable(true);
  }, []);

  return clickable ? (
    <Link className="card hoverable" href={`post/${props.id}`}>
      <div className="card-header">
        <ProfileLayout username={props.username} />
      </div>
      <div className="card-body">
        <p className="card-text">{props.body}</p>
      </div>
      <div className="card-footer">{comment}</div>
    </Link>
  ) : (
    <div className={`card`}>
      <div className="card-header">
        <ProfileLayout username={props.username} />
      </div>
      <div className="card-body">
        <p className="card-text">{props.body}</p>
      </div>
      <div className="card-footer">{comment}</div>
    </div>
  );
};

export default PostCard;
