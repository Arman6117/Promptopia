"use client";
import { useState } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseConfig } from "@utils/firebase";
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const app = initializeApp(firebaseConfig)
const auth  = getAuth(app)

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const [user] = useAuthState(auth)
  const pathName = usePathname()
  const router  = useRouter()
  const handelCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  // console.log(prompt);
  return (
    <>
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5 ">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={prompt.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {prompt.userName}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {prompt.email}
              </p>
            </div>
          </div>
          <div className="copy_btn" onClick={handelCopy}>
            <Image
              src={
                copied === prompt.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={12}
              height={12}
              alt="copy"
            />
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {prompt.prompt}
        </p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(prompt.tag)}
        >
          #{prompt.tag}
        </p>
        {user?.uid === prompt.creator && pathName === "/profile" && (
          <div className="mt-5 flex justify-center gap-3 border-t border-gray-100 cursor-pointer">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PromptCard;
