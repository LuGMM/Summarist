"use client";

import style from "../page.module.css";

import { AiOutlineSearch } from "react-icons/ai";
import { IoTimeOutline, IoClose, IoMenu } from "react-icons/io5";
import { ImSpinner } from "react-icons/im";

import axios from "axios";
import Duration from "./for-you/duration";
import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "./UI/skeleton";

export default function Searchbar() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isfetching, setIsFetching] = useState(false);
  const [sidebar, setSidebar] = useState();
  const [overlay, setOverlay] = useState();

  function clearInput() {
    const inputText = document?.getElementById("search_text");
    inputText.value = "";
  }

  const getSearchBooks = async (search) => {
    setIsFetching(true);
    setTimeout(async () => {
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`,
      );
      setSearchResults(data);
      setIsFetching(false);
    }, 500);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const sidebar = document.getElementById("Sidebar");
      const overlay = document?.querySelector(".sidebar__overlay");

      setSidebar(sidebar);
      setOverlay(overlay);
    }
  });

  const showSidebar = () => {
    sidebar.classList.add("sidebar__shown");
    sidebar.classList.remove("sidebar__hidden");
    overlay.style.display = "block";
  };

  return (
    <div className={style.searchbar__wrapper}>
      <div className={style.searchbar}>
        <div className={style.searchbar__content}>
          <div className={style.search}>
            <div className={style.input__wrapper}>
              <div className={style.search__input}>
                <input
                  className={style.input}
                  id="search_text"
                  type="text"
                  placeholder="Search Books"
                  onChange={(event) => {
                    const search = event.target.value;
                    getSearchBooks(search);
                    setIsSearching(true);
                    if (event.target.value === "") {
                      setIsSearching(false);
                      setIsFetching(false);
                    }
                  }}
                />
              </div>
              {isfetching ? (
                <div
                  className={style.input__icon}
                  onClick={() => {
                    setIsSearching(false);
                    clearInput();
                  }}
                >
                  <ImSpinner className={style.spinner} />
                </div>
              ) : (
                <>
                  {isSearching ? (
                    <div
                      className={style.input__icon}
                      onClick={() => {
                        setIsSearching(false);
                        clearInput();
                      }}
                    >
                      <IoClose id="close__btn" className={style.icon} />
                    </div>
                  ) : (
                    <div className={style.input__icon}>
                      <AiOutlineSearch className={style.icon} />
                    </div>
                  )}
                </>
              )}
            </div>
            {isSearching ? (
              <>
                {isfetching ? (
                  <div className={style.search__results}>
                    {new Array(5).fill(0).map((_, index) => (
                      <div key={index} className={style.search__results__book}>
                        <div className={style.results__img__wrapper}>
                          <figure className={style.results__img__cover}>
                            <Skeleton height="100%" width="100%" />
                          </figure>
                        </div>
                        <div>
                          <div className={style.search__title}>
                            <Skeleton height="24px" width="150px" />
                          </div>
                          <div className={style.search__author}>
                            <Skeleton height="16px" width="50%" />
                          </div>
                          <div className={style.book__duration}>
                            <Skeleton height="8px" width="25%" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {searchResults.length ? (
                      <div className={style.search__results}>
                        {searchResults.map((book) => (
                          <Link
                            href={`/book/${book.id}`}
                            key={book.id}
                            className={style.search__results__book}
                            onClick={() => {
                              setIsSearching(false);
                              clearInput();
                            }}
                          >
                            <div className={style.results__img__wrapper}>
                              <figure className={style.results__img__cover}>
                                <img
                                  className={style.search__img}
                                  src={book.imageLink}
                                  alt="book cover"
                                />
                              </figure>
                            </div>
                            <div>
                              <div className={style.search__title}>
                                {book.title}
                              </div>
                              <div className={style.search__author}>
                                {book.author}
                              </div>
                              <div className={style.book__duration}>
                                <figure className={style.search__icon}>
                                  <IoTimeOutline
                                    className={style.search__img}
                                  />
                                </figure>
                                <div>
                                  <Duration audioLink={book.audioLink} />
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className={style.search__results}>
                          <div>No Books Found</div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            ) : null}
          </div>
        </div>
        <div className={style.sidebarToggle}>
          <figure
            onClick={showSidebar}
            className={style.sidebarToggleIcon__wrapper}
          >
            <IoMenu className={style.sidebarToggleIcon} />
          </figure>
        </div>
      </div>
    </div>
  );
}
