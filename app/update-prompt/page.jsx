'use client'
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`,{method:'GET'});
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    // Fetch prompt details only if promptId is present
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const UpdatePrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true); // Using as a loader

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={UpdatePrompt} // Fix typo: handelSubmit -> handleSubmit
      />
    </>
  );
};

export default EditPrompt;
