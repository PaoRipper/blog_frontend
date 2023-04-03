import Image from "next/image";
import React from "react";

import Person from "../../../public/assets/images/Rubio_Circle.png"

const ProfileLayout = (props: {
    username: string
}) => {
  return (
    <div>
      <Image
        src={Person}
        width={30}
        height={30}
        alt="post-owner"
        className="post-owner"
      />
      <span className="post-owner-name">{props.username}</span>
    </div>
  );
};

export default ProfileLayout;
