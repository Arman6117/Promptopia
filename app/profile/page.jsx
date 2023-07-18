"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${user?.uid}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  },[user?.uid]);
  console.log(posts);
  // Handle edit action for a prompt
  const handleEdit = async (prompt) => {
    router.push(`/update-prompt?id=${prompt.id}`);
  };

  // Handle delete action for a prompt
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt.id}`, {
          method: "DELETE",
        });
        // Remove the deleted prompt from the posts array
        const filteredPosts = posts.filter((p) => p.id !== prompt.id);
        // console.log(prompt.id);
        console.log(filteredPosts);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default MyProfile;
