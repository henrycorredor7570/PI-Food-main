import { Link } from "react-router-dom";
import styles from './landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landingPage}>
      <Link to="/home">
        <button className={styles.button}>Home</button>
      </Link>
    </div>
  );
}

export default Landing;
