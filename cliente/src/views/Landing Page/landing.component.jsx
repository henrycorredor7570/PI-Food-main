import { Link } from "react-router-dom";
import './landing.styles.css';

function Landing() {
  return (
    <div className="pag-inicio">
      <h1>LANDING</h1>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}

export default Landing;
