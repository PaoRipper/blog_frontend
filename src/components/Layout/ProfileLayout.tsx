import Image from "next/image";
import React from "react";

import Person from "/public/assets/images/Rubio_Circle.png"

const ProfileLayout = (props: {
    username: string
    imgClassName?: string,
    profileClassName?: string,

}) => {
  return (
    <div>
      <Image
        src={Person}
        width={30}
        height={30}
        alt="post-owner"
        className={`${props.imgClassName}`}
      />
      <span className={`${props.profileClassName}`}>{props.username}</span>
    </div>
  );
};

export default ProfileLayout;
