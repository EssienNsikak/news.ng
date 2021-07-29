import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import "./sidebar.css";
import Picture from '../../assets/codehuz.jpg';

export default function SideBar() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await Axios.get('http://localhost:5000/api/categories')
      setCategories(res.data)
    }
    fetchCats()
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
        src={ Picture }
        alt='myPicture' 
        />
        <p>
          I am a Junior Software Developer who is passionate about building very stable, efficient, and reliable APIs. I Enjoy writing quality codes, learning new technologies, and sharing knowledge with others. A resourceful, dynamic, and result-oriented individual with the potential to learn fast. An exquisite gentleman with problem-solving abilities.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {
            categories.map((c) => (
              <li className="sidebarListItem">            
                <Link to={`/?cat=${c.name}`} className="link">
                  {c.name}
                </Link>
              </li>                
            ))
          }
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}