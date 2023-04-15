import Link from "next/link";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import ProfileLayout from "./Layout/ProfileLayout";
import CustomDropdown from "./CustomDropdown";
import { useAlert } from "react-alert";
import { LoginContext } from "@/context/LoginContext";
import { follow } from "@/api/blogApi";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Person from "/public/assets/images/Rubio_Circle.png";
import { shortText } from "@/utils/formatUtils";


const HoverPostCard = (props: {
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
  const [hideComment, setHideComment] = useState(false);
  const { user, isLogin } = useContext(LoginContext);
  const alert = useAlert();

  useEffect(() => {
    setMoreComment(props.comments.length - 1);
    if (
      props.comments &&
      props.comments.length >= 1 &&
      props.comments[0] != null
    ) {
      const comment =
        props.comments.length > 0 ? (
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
        ) : (
          <div></div>
        );
      comment && setComment(comment);
    }
  }, [moreComment, props.comments]);

  const handleFollow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const userId = user.userID;
    if (userId) {
      follow(userId, props.id)
        .then((res) => {
          if (res.status === 201) {
            alert.success("Follow!");
          }
        })
        .catch((e) => {
          alert.error("Something went wrong");
        });
    }
  };

  return (
    <Link className="card hoverable" href={`post/${props.id}`}>
      <div className="card-header">
        <ProfileLayout username={props.username} />
        {isLogin && (
          <CustomDropdown
            dropdownItems={["Follow post"]}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              handleFollow(e);
            }}
            type="DROPSTART"
            icon={{ icon: faEllipsis, className: "ellipsis-icon", size: "xl" }}
            arrow={false}
            btnClassName="btn-ellipsis"
          />
        )}
      </div>
      <div className="card-body">
        <p className="card-text">{props.body}</p>
      </div>
      <div className="card-footer">
        {comment}
      </div>
    </Link>
  );
};

export default HoverPostCard;
