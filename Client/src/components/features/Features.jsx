import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./Features.scss";
import { useEffect,useState } from "react";
import axios from "axios";

const Features = ({ type, setGenre }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`https://netflixbackend.vercel.app/server/movie/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data[0]);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    getMovie();
  }, [type]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(movie);

  return (
    <div className="features">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="horror">Horror</option>
            <option value="comedy">Comedy</option>
            <option value="fantasy">Fantasy</option>
            <option value="Adventure">Adventure</option>
            <option value="romance">Romance</option>
            <option value="crime">Crime</option>
            <option value="drama">Drama</option>
          </select>
        </div>
      )}
      {movie && (
        <>
          <img src={movie.img} alt="Not found" />
          <div className="info">
            <img src={movie.imgTitle} alt="" />
            <span className="desc">{movie.desc}</span>
            <div className="buttons">
              <button className="play">
                <PlayArrow />
                <span>Play</span>
              </button>
              <button className="more">
                <InfoOutlined />
                <span>Info</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Features;
