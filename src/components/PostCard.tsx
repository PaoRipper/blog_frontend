/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useContext, useState } from "react";

import Person from "/public/assets/images/Rubio_Circle.png";
import ProfileLayout from "./Layout/ProfileLayout";
import { shortText } from "@/utils/formatUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";
import CustomDropdown from "./CustomDropdown";
import { LoginContext } from "@/context/LoginContext";
import { follow } from "@/api/blogApi";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";

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
  const { user } = useContext(LoginContext);
  const alert = useAlert();
  const router = useRouter();

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

  const handleLinkClick = (e: any) => {
    console.log(e.target.classList);
    if (
      e.target.classList.contains("ellipsis-icon") ||
      e.target.classList.contains("dropdown-item") ||
      e.target.classList.contains("btn-ellipsis")
    ) {
    } else {
      router.push(`post/${props.id}`);
    }
  };

  const handleFollow = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const userId = user.userID;
    if (userId) {
      follow(userId, props.id).then((res) => {
        if (res.status === 201) {
          alert.success("Follow success!");
        } else {
          alert.error("Follow failed");
        }
      });
    }
  };

  return clickable ? (
    <div className={`card hoverable`} onClick={(e) => handleLinkClick(e)}>
      <div className={`card-header`}>
        <ProfileLayout username={props.username} />
        <CustomDropdown
          dropdownItems={["Follow post"]}
          onClick={(e) => handleFollow(e)}
          type="DROPUP"
          icon={{ icon: faEllipsis, className: "ellipsis-icon", size: "xl" }}
          arrow={false}
          btnClassName="btn-ellipsis"
        />
      </div>
      <div className={`card-body `}>
        <p className={`card-text`}>{props.body}</p>
      </div>
      <div hidden={hideComment} className={`card-footer`}>
        {comment}
      </div>
    </div>
  ) : (
    <div className={`card ${props.className}`}>
      <div className={`card-header ${props.headerClassName}`}>
        <ProfileLayout
          username={props.username}
          imgClassName="profile-img"
          profileClassName="profile-name"
        />
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
