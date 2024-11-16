"use client"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";


const Header = () => {
  const [search, setSearch] = useState("");

  return (
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          <FaSearch />
        </button>
      </div>
  );
};

export default Header;
