import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai"
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);

        return () => (
            window.onscroll = null
        );  
    };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
            <div className="left">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158" 
                    alt="" 
                />

                <Link to="/" className="link">
                    <span>Homepage</span>
                </Link>
                <Link to="/series" className="link">
                    <span>Series</span>
                </Link>
                <Link to="/movies" className="link">
                    <span>Movies</span>
                </Link>
                <span>New and Popular</span>
                <span>My List</span>
            </div>
            
            <div className="right">
                <AiOutlineSearch className="icon"/>
                
                <span>KID</span>
                
                <IoNotificationsOutline/>
                
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
                
                <div className="profile">
                    <AiOutlineArrowDown className="icon"/>

                    <div className="options">
                        <span>Setttings</span>
                        <span>Logout</span>
                    </div>
                </div>

            </div>
            
        </div>
    </div>
  )
}

export default Navbar;