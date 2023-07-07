import { Link } from "react-router-dom";
import styles from './landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landingPage}>
      <h1>LANDING</h1>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}

export default Landing;
