import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Machado Multiservices Contract Managment</title>
        <meta name="description" content="Contract management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the management tool!</h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://machadomultiservices.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright @ Machado Multiservices
        </a>
      </footer>
    </div>
  );
};

export default Home;
