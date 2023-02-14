import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";

import "./home.scss";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect( () => {
      const getRandomLists = async () => {
        try {
            const response = await axios.get(
                `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                    headers: {
                      token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGYzYmFjMTFmNzUwNDExYmRjOTUzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjMzODQ4MiwiZXhwIjoxNjc2NTk3NjgyfQ.6u1nFz4LqmgQmC1RW1Pxjh_PywK2_AUfh5SiRDYtirY",
                    },
                }
            );
            //console.log(response.data);
            setLists(response.data);
        } catch (err) {
            console.log(err);
        }
      };
      getRandomLists();
  }, [type, genre]);
  return (
    <div className='home'>
        <Navbar/>
        
        <Featured type = { type }/>
        {lists.map( (list) => (
            <List list={list} />
        ))}
    </div>
  )
}

export default Home;