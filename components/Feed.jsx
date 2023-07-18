"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data,handleTagClick}) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt)=>(
        <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}
const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) =>{

  }

  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
        // Handle error state or display an error message to the user
      }
    };
    fetchPosts()

  },[])
  return (
    <section className="feed">
      <form className="relative w-full flex justify-center">
        <input
          placeholder="Search for a Tag or a Username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={()=>{}} />
    </section>
  );
};

export default Feed;
