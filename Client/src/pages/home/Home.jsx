import React, { useEffect, useState } from "react";
import Features from "../../components/features/Features";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./Home.scss";
import axios from "axios";

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `https://netflixbackend.vercel.app/server/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
          {
            headers: {
              token:
                "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
        console.log(res.data);
      } catch (error) {}
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="homepge">
      <Navbar />
      <Features type={type} setGenre={setGenre} />
      {lists.map((list) => {
        return(
        <List list={list}/>
        )
      })}
    </div>
  );
};

export default Home;
