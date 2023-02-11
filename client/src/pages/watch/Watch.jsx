import "./watch.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Watch() {
  return (
    <div className="watch">
        <div className="back">
            <AiOutlineArrowLeft/>
            Home
        </div>
        <video 
            className="video" 
            autoPlay progress controls
            src="squid-game-trailer.mp4"/>
    </div>
  )
}
