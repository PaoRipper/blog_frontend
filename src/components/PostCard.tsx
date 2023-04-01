import { shortText } from "@/utils/formatUtils";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

import Person from "../../public/assets/images/Rubio_Circle.png";

const PostCard = (props: {
  id: number;
  title: string;
  description: string;
  comments: string[];
  clickable?: boolean;
}) => {
  const [moreComment, setMoreComment] = useState<number>(0);
  const [comment, setComment] = useState<ReactNode>();
  const [clickable, setClickable] = useState(true);

  useEffect(() => {
    setMoreComment(props.comments.length - 1);
    // If have comment and comment is not null
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
          <em className="comment-text">{props.comments[0]}</em>
          <Link href={"#"} className="comment-see-more">
            {/* If has more comment left then show */}
            {moreComment >= 1 ? `+${moreComment} more` : ""}
          </Link>
        </div>
      );
      comment && setComment(comment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreComment]);

  useEffect(() => {
    if (props.clickable === false) {
      setClickable(false);
    } else setClickable(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return clickable ? (
    <Link className="card hoverable" href={`post/${props.id}`}>
      <div className="card-header">
        <h1 className="card-title">{shortText(props.title)}</h1>
      </div>
      <div className="card-body">
        <p className="card-text">{props.description}</p>
      </div>
      <div className="card-footer">{comment}</div>
    </Link>
  ) : (
    <div className={`card`}>
      <div className="card-header">
        <h1 className="card-title">{shortText(props.title)}</h1>
      </div>
      <div className="card-body">
        <p className="card-text">{props.description}</p>
      </div>
      <div className="card-footer">{comment}</div>
    </div>
  );
};

export default PostCard;
