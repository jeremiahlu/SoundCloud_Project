import React from "react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Search.module.css";

function Search() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const songs = useSelector((state) => Object.values(state.songs));
  // console.log(songs, "SONGS");
  // console.log(filteredData, "filtered");
  // console.log(search, "search");

  const handleFilter = (e) => {
    const searchRes = e.target.value;
    setSearch(searchRes);
    const newFilter = songs?.filter((song) => {
      return song?.title?.toLowerCase().includes(searchRes.toLowerCase());
    });

    if (searchRes === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setSearch("");
  };

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setFilteredData([]);
        setSearch("");
      }
      // console.log(searchRef, "searchrRef");
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className={styles.search}>
      <div className={styles.searchDiv}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleFilter}
        />
        <div className={styles.searchIcon}>
          {filteredData.length === 0 ? (
            <i className="fa-solid fa-magnifying-glass"></i>
          ) : (
            <i className="fa-solid fa-x" onClick={clearInput}></i>
          )}
        </div>
      </div>

      {filteredData.length != 0 && (
        <div className={styles.dataResult}>
          {filteredData.slice(0, 15).map((song, key) => {
            return (
              <NavLink
                to={`/songs/${song.id}`}
                onClick={() => clearInput()}
                className={styles.link}
              >
                <p className={styles.item}>{song.title}</p>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
