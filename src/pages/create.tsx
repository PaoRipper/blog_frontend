import { addPost } from "@/api/blogApi";
import { LoginContext } from "@/context/LoginContext";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { useAlert } from "react-alert";

const Create = () => {
  const [bon, setBon] = useState("");
  const router = useRouter();
  const alert = useAlert();
  const { user, isLogin } = useContext(LoginContext);

  const handleSubmit = () => {
    user.userID && addPost(bon, user.userID);
    alert.success("Post successfully");
    const id = setTimeout(() => {
      router.push("/");
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  };

  useEffect(() => {
    if (!isLogin) {
      router.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <section id="create-section">
      <h3 className="create-title">Create your bon</h3>
      <textarea
        name="post-area"
        className="post-textarea"
        rows={5}
        cols={50}
        placeholder="Bon here"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setBon(e.target.value)
        }
      />
      <div>
        <button
          className="btn btn-lg btn-primary submit-bon"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default Create;
