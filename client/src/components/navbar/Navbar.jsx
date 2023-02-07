import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai"
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineArrowDown } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="container">
            <div className="left">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158" 
                    alt="" 
                />

                <span>Homepage</span>
                <span>Series</span>
                <span>Movies</span>
                <span>New and Popular</span>
                <span>My List</span>
            </div>
            
            <div className="right">
                <AiOutlineSearch className="icon"/>
                <span>KID</span>
                <IoNotificationsOutline/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
                <AiOutlineArrowDown className="icon"/>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar;