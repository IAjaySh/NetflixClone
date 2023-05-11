import { ArrowBackOutlined } from "@material-ui/icons";
import "./Watch.scss";
import { Link, useLocation } from "react-router-dom";

export default function Watch() {
  const location = useLocation();
  console.log(location.state.from.video);

  return (
    <div className="watch">
      <Link to='/'>
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        Progress
        controls
        src={location.state.from.video}
        // src="http://techslides.com/demos/sample-videos/small.mp4"
      />
    </div>
  );
}
