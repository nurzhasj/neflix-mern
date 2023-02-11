import "./listItem.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useState } from "react";

export default function ListItem({index}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="listItem"
      style = {{ left: isHovered && index * 225 - 50 + index * 2.5 }} 
      onMouseEnter = { () => setIsHovered(true) }
      onMouseLeave = { () => setIsHovered(false) }>
        <img 
          src="https://images.indianexpress.com/2021/10/Suid-Game-Netflix-1200by667.jpg" 
          alt="" 
        />
        {isHovered && (
        <>
        <video width="320" height="240" controls autoPlay={true} loop muted>
            <source src="squid-game-trailer.mp4" type="video/mp4"/>
        </video>    
        <div className="itemInfo">
            <div className="icons">
                <BsFillPlayFill className="icon"/>
                <IoAddOutline className="icon"/>
                <AiOutlineLike className="icon"/>
                <AiOutlineDislike className="icon"/>
            </div>
            <div className="itemInfoTop">
                <span>1 hour 14 mins</span>
                <span className="limit">+16</span>
                <span>1999</span>
            </div>
            <div className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <div className="genre">Action</div>
        </div>
        </>
        )};
    </div>
  );
}
