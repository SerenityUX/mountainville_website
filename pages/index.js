import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";


export default function Home() {
  return (
    <>
      <Head>
        <title>Mountainville Game</title>
        <meta name="description" content="game made by Thomas about going on adventures to get curry" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Mountainville</h1>
        <h2>a game by Thomas</h2>
        <p>Mountainville is a game about collecting ingredients and making curry</p>
        <img style={{width: 64, height: 64}} src="./Tompo16px.png"/>
        <a href="./mountainVille0.2.dmg" download="mountainVille0.2.dmg">Download Mac Version</a>
      </div>
    </>
  );
}
