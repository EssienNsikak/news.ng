import { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import "./homepage.css";
import Axios from 'axios';

export default function Homepage() {

  const [posts, setPosts] = useState([]);

  const { search } = useLocation();
  

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await Axios.get('http://localhost:5000/api/posts/all-posts' + search)
      setPosts(res.data)
    }
    fetchPosts()
  }, [search])

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}