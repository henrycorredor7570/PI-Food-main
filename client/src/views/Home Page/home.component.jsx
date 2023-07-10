//Importaciones:
import NavBar from '../../components/Navbar/navbar.component';
import Cards from '../../components/Cards/cards.component';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h2 className={styles.homeTitle}>HOME</h2>
      <NavBar/>
      <Cards/>
    </div>
  );
}

export default Home;
