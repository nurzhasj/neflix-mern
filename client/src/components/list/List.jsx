import "./list.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import ListItem from "../listItem/ListItem";
import { useRef } from "react";
import { useState } from "react";

export default function List() {
    const [slideNumber, setSlideNumber] = useState(0);
    const [isMoved, setIsMoved] = useState(false);


    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }

        if (direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    };

  return (
    <div className="list">
        <span className="listTitle">Continue to watch</span>
        <div className="wrapper">
            <AiOutlineArrowLeft 
                className="sliderArrow left" 
                onClick={() => handleClick("left")}
                style = {{ display: !isMoved && "none" }}
            />
            <div className="container" ref={listRef}>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
            </div>
            <AiOutlineArrowRight className="sliderArrow right" onClick={() => handleClick("right")}/>
        </div>
    </div>
  )
}
