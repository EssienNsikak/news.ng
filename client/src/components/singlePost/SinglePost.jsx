import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from "react-router-dom";
import "./singlePost.css";
import Axios from 'axios';
import { Context } from '../../context/Context';

export default function SinglePost() {

  const location = useLocation()
  const path = location.pathname.split('/')[2];

  const [post, setPost] = useState({});
  const PF = 'http://localhost:5000/images/';

  const { user } = useContext(Context);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await Axios.get('http://localhost:5000/api/posts/'+path)
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    fetchPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await Axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data:{username: user.username}
      });
      window.location.replace('/');
    } catch (err) {}
    
  };

  const handleUpdate = async () => {
    try {
      await Axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username: user.username, title, desc
      });
      setUpdateMode(false);
    } catch (err) {}
  }
  
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">

        {
          post.photo && (
            <img
              className="singlePostImg"
              src={PF + post.photo}
              alt="postPhoto"
            />
          )
        }

        {
          updateMode ? (
            <input 
              type='text' 
              value={title} 
              className='singlePostTitleInput'
              onChange={(e) => setTitle(e.target.value)}
            /> 
          ) : (
            <h1 className='singlePostTitle'>
              {title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                  <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                </div>
              )}
            </h1>
          )
        }

        <div className="singlePostInfo">
          <span>
            Author: {' '}
            <b className="singlePostAuthor">
              <Link to={`/?user=${post.username}`} className="link">
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        {
          updateMode ? (
            <textarea 
              className='singlePostDescInput' 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
            />
          ) : (
            <p className='singlePostDesc'>{desc}</p>
          )
        }

        {
          updateMode && 
          <button 
            className='singlePostButton' 
            onClick={handleUpdate}
          >Save</button>
        }
          
      </div>
    </div>
  );
}
