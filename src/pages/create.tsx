import { addPost } from "@/api/blogApi";
import { LoginContext } from "@/context/LoginContext";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useAlert } from "react-alert";

const Create = () => {
  const [bon, setBon] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const alert = useAlert();
  const { user } = useContext(LoginContext);

  const handleSubmit = () => {
    if (!bon) {
      setError("Please bon");
    } else {
      user.userID && addPost(bon, user.userID);
      alert.show("Bon successfully");
      const id = setTimeout(() => {
        router.push("/");
      }, 2000);
      return () => {
        clearTimeout(id);
      };
    }
  };

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
          className="btn btn-md btn-primary submit-bon"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default Create;
