import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [tompoFrame, setTompoFrame] = useState(0);
  const [veloFrame, setVeloFrame] = useState(0);
  const [tompoPosition, setTompoPosition] = useState(0);
  const [veloPosition, setVeloPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [userOS, setUserOS] = useState("Mac");
  const containerRef = useRef(null);

  // Detect user's OS
  useEffect(() => {
    const detectOS = () => {
      const userAgent = window.navigator.userAgent;
      let os = "Mac"; // Default

      if (userAgent.indexOf("Win") !== -1) os = "Windows";
      else if (userAgent.indexOf("Mac") !== -1) os = "Mac";
      else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
      else if (userAgent.indexOf("Android") !== -1) os = "Windows";
      else if (/(iPhone|iPad|iPod)/.test(userAgent)) os = "Mac";

      setUserOS(os);
    };

    detectOS();
  }, []);

  // Initialize positions and handle container resizing
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        setTompoPosition(width); // Start Tompo at right edge
        setVeloPosition(-64); // Start Velo at left edge
      }
    };

    // Initial setup
    updateWidth();

    // Create ResizeObserver to watch container size changes
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!containerWidth) return;

    // Animation logic remains the same, but uses containerWidth instead of screenWidth
    const frameInterval = setInterval(() => {
      setTompoFrame((prev) => (prev + 1) % 4);
      setVeloFrame((prev) => (prev + 1) % 4);
    }, 500);

    const walkInterval = setInterval(() => {
      setTompoPosition(prev => {
        if (prev <= -64) return containerWidth;
        return prev - 1;
      });
      
      setVeloPosition(prev => {
        if (prev >= containerWidth) return -64;
        return prev + 1;
      });
    }, 15.6);

    return () => {
      clearInterval(frameInterval);
      clearInterval(walkInterval);
    };
  }, [containerWidth]);

  return (
    <>
      <Head>
        <title>Mountainville Game</title>
        <meta name="description" content="game made by Thomas about going on adventures to get curry" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{maxWidth: 700}}>
          <div 
            ref={containerRef}
            style={{
              width: '100%',
              height: '128px',
              position: 'relative',
              overflow: 'visible',
              
            }}
          >
            <div style={{width: "100%", height: "1px", backgroundColor:"#000", position: "absolute", top: 64}}></div>
            {/* Tompo sprite */}
            <div style={{
              width: 64,
              height: 64,
              backgroundImage: `url('./TompoSprite.png')`,
              backgroundPosition: `-${tompoFrame * 64}px 0px`,
              backgroundSize: '256px 64px',
              backgroundRepeat: 'no-repeat',
              imageRendering: "pixelated",
              position: 'absolute',
              left: `${tompoPosition}px`,
            }} />
            <div style={{display: "flex", gap: 8, width: "100vw", alignItems: "center", maxWidth: "700px", justifyContent: "center", flexDirection: "column"}}>
              <h1 style={{marginTop: 72, marginBottom: 0}}>Mountainville</h1>
              <p style={{margin: 0}}>a game about starting a curry house</p>
              <a 
                href={
                  userOS === "Windows" ? "./mountainVille0.3.exe" : 
                  userOS === "Linux" ? "./mountainVille0.3.x86_64" : 
                  "./mountainVille0.3.dmg"
                } 
                download
              >
                Download {userOS} Version 0.3
              </a>

            </div>
            {/* Velo sprite */}
            <div style={{
              width: 64,
              marginTop: 100,
              overflow: "visible",
              height: 64,
              backgroundImage: `url('./VeloSprite.png')`,
              backgroundPosition: `-${veloFrame * 64}px 0px`,
              backgroundSize: '256px 64px',
              backgroundRepeat: 'no-repeat',
              imageRendering: "pixelated",
              position: 'absolute',
              left: `${veloPosition}px`,
              top: '64px',
            }} />

            <div style={{width: "100%", marginTop: 66, height: "1px", backgroundColor: "#000"}}></div>
            <p>collect ingredients with your friends, local co-op multiplayer, use your ingredients you find along your journeys to serve patrons at your curry house!</p>
          </div>
        </div>
      </div>
    </>
  );
}
