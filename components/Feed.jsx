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
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
             
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
