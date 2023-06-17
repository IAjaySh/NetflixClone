import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./Features.scss";
import { useEffect,useState } from "react";
import axios from "axios";

const Features = ({ type, setGenre }) => {
  const [movie, setMovie] = useState({
    _id: "642d87978e3a1a79fb27e226",
    ageLimit: 16,
    createdAt: "2023-04-05T14:37:11.355Z",
    desc: "Annabelle is a 2014 American supernatural horror film directed by John R. Leonetti, written by Gary Dauberman and produced by Peter Safran and James Wan.",
    genre: "horror",
    img: "https://4.bp.blogspot.com/-lWEh25bE8GQ/XQsnN6Ot1aI/AAAAAAAAD_k/9TpYohKKnZcIVTqd4F9fWxYVnAik7NF6wCKgBGAs/w3840-h1600-c/annabelle-comes-home-uhdpaper.com-8K-1.jpg",
    imgThumb:
      "https://i0.wp.com/manapop.com/wp-content/uploads/2015/02/Annabelle-poster.jpg?ssl=1",
    imgTitle: "https://www.pngmart.com/files/17/Annabelle-Logo-PNG-Picture.png",
    isSeries: false,
    title: "Annabella 2014",

    trailer:
      "https://www.shutterstock.com/video/clip-1054511090-traffic-increase-search-engine-optimization-boost-website",

    video:
      "https://www.shutterstock.com/video/clip-1052306503-flat-design-animation-digital-marketing-startup-improving",
    year: "2014",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`/movie/random?type=${type}`, {
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
