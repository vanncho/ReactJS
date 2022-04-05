// import Image from 'next/image'; // support on server only

import App from "../components/app/App";

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.header}>
        {/* <Image src="/logo.svg" alt="React Logo" className={styles.logo} width="50px" height="50px" /> */}
        <img src="./logo.svg" className="logo" alt="logo" width="50px" height="50px" />
        <div className={styles['fake-header']}>{'{JSON} Placeholder'}</div>
      </div>
      <App />
    </>
  );
}
