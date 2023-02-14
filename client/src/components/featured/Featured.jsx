import "./featured.scss";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Featured({type}) {
  return (
    <div className="featured">
        {type && (
            <div className="category">
                <span>{type === "movies" ? "Movies" : "Series"}</span>
                <select name="genre" id="genre">
                    <option>Genre</option>
                    <option value="adventure">adventure</option>
                    <option value="comedy">comedy</option>
                    <option value="crime">crime</option>
                    <option value="fantasy">fantasy</option>
                    <option value="historical">historical</option>
                    <option value="horror">horror</option>
                    <option value="romance">romance</option>
                    <option value="sci-fi">sci-fi</option>
                    <option value="thriller">thriller</option>
                    <option value="western">western</option>
                    <option value="animation">animation</option>
                    <option value="drama">drama</option>
                    <option value="documentary">documentary</option>
                </select>
            </div>
        )};

        <img 
          width="100%"
          src="https://m.timesofindia.com/photo/76121929.cms" 
          alt="" 
        />

        <div className="info">
            <img 
                src="https://occ-0-769-41.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABUBRglb24gl96Dki4YDFA5dR8qCpLfO5kc5cm28Jj-ibi9ibVq5EzLIwPG3masOWVMRXWgyzymaiB_NqCqDieh63z7I2hX4SAURP7ZwnmbRgYw6RCM2juHVHPyTz9K0MmoM4xCGYRJB9hTkK7bvwQwOYIewDLDJxKAkRM6RDWTnKH7uALqRC-Q.png?r=bd4" 
                alt="" 
            />

            <span className="desc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas accusamus inventore modi, doloribus alias suscipit accusantium. Harum, nobis unde officia quos dignissimos sequi explicabo rem aliquam tempore praesentium cumque corrupti?</span>
        
            <div className="buttons">
                <button className="play">
                    <FaPlay/>

                    <span>Play</span>
                </button>
                <button className="more">
                    <AiOutlineInfoCircle/>

                    <span>Info</span>
                </button>
            </div>
        </div>
    </div>
  );
}
