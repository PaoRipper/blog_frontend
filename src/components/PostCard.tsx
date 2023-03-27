import { shortText } from "@/utils/formatUtils";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

import Person from "../../public/assets/images/Rubio_Circle.png";

const PostCard = (props: {
  title: string;
  description: string;
  comments: string[];
}) => {
  const [moreComment, setMoreComment] = useState<number>(0);
  const [comment, setComment] = useState<ReactNode>();

  useEffect(() => {
    setMoreComment(props.comments.length - 1);
    // If have comment and comment is not null
    if (props.comments && props.comments.length >= 1 && props.comments[0] != null) {
      const comment = (props.comments.length > 0) && (
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

  return (
    <div className="card">
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
