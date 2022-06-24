import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getSecret } from "../src/utils";
import styles from "../styles/Home.module.css";

type Props = {
  secretKey: string;
  secretKeyFromProcess: string;
};

const Home: NextPage<Props> = ({ secretKey, secretKeyFromProcess }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs Env Encrypt Decrypt</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Nextjs Env Encrypt Decrypt</h1>
        <p className={styles.description}>
          <code className={styles.code}>
            NEXT_PUBLIC_KEY = {process.env.NEXT_PUBLIC_KEY || "undefined"}
          </code>
        </p>
        <p className={styles.description}>
          <code className={styles.code}>
            SECRET_KEY (process.env) = {secretKeyFromProcess}
          </code>
        </p>
        <p className={styles.description}>
          <code className={styles.code}>
            SECRET_KEY (getSecret) = {secretKey}
          </code>
        </p>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      secretKeyFromProcess: process.env.SECRET_KEY || "undefined",
      secretKey:
        (process.env.GITOPS_SECRETS_MASTER_KEY && getSecret("SECRET_KEY")) ||
        "undefined",
    },
  };
};

export default Home;
