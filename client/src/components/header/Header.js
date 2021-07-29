import './header.css';
import Picture from '../../assets/uyo3.jpg';

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">News & More</span>
        <span className="headerTitleLg">News<span className='headerTitleLg2'>.ng</span></span>
      </div>
      <img
        className='headerImg'
        src={ Picture }
        alt=""
      />
    </div>
  );
}