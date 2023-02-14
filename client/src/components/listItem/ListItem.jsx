import "./listItem.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function ListItem({index, item}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  
  useEffect( () => {
      const getMovie = async() => {
          try {
              const response = axios.get(
                "/movies/find/" + item,
                {
                  headers: {
                    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGYzYmFjMTFmNzUwNDExYmRjOTUzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjMzODQ4MiwiZXhwIjoxNjc2NTk3NjgyfQ.6u1nFz4LqmgQmC1RW1Pxjh_PywK2_AUfh5SiRDYtirY",
                  },
                }
              );

              setMovie(response.data); 
          } catch(err) {
              console.log(err);
          }
      };
      getMovie();
  }, [item]);

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
        <video src={movie.trailer} controls autoPlay={true} loop muted/>    
        <div className="itemInfo">
            <div className="icons">
                <BsFillPlayFill className="icon"/>
                <IoAddOutline className="icon"/>
                <AiOutlineLike className="icon"/>
                <AiOutlineDislike className="icon"/>
            </div>
            <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
        </div>
        </>
        )};
    </div>
  );
}
