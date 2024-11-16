"use client"
import styles from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "@/hooks/useTheme";
import SearchBar from "@/components/SearchBar/SearchBar";

const Header = () => {
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <a href='/events' className={styles.logoContainer}>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className={styles.logo}
        />
        <h1>
            Splitter
        </h1>
      </a>

      {/*<SearchBar />*/}

      <div className={styles.iconContainer}>
          <div onClick={toggleTheme} className={styles.switchTheme}>{theme === 'light' ? <FiMoon size={25} /> : <FiSun size={25} />}</div>
      </div>
    </header>
  );
};

export default Header;
