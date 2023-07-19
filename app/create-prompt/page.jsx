"use client";
import React, { useState } from "react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseConfig } from "@utils/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const createPrompt = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true); //*Using as a loader

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: user?.uid,
          tag: post.tag,
          image: user.photoURL,
          userName: user.displayName,
          email: user.email,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  );
};

export default createPrompt;
