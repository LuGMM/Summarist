"use client";

import Link from "next/link";
import style from "../../for-you/page.module.css";
import Skeleton from "../UI/skeleton";

import { FaRegCirclePlay } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

const Selected = () => {
  const [duration, setDuration] = useState("");
  const audioRef = useRef(null);
  const [selectedBook, setSelectdBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getBook() {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
    );
    setSelectdBook(data[0]);
    setIsLoading(false);
  }

  const handleLoadedMetadata = () => {
    if (audioRef?.current) {
      const duration = audioRef.current.duration;
      setDuration(formatTime(duration));
    }
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes} mins ${seconds < 10 ? "0" : ""}${seconds} secs`;
  }

  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      <div className={style.main__title}>Selected just for you</div>
      {selectedBook.imageLink && !isLoading ? (
        <Link
          href={`/book/${selectedBook.id}`}
          className={style.selected__book}
        >
          <div className={style.selected__book__subtitle}>
            {selectedBook.subTitle}
          </div>
          <div className={style.divider}></div>
          <div className={style.selected__book__content}>
            <figure className={style.selected__book__figure}>
              <img className={style.img} src={selectedBook.imageLink} alt="" />
            </figure>
            <div className={style.selected__book__text}>
              <div className={style.selected__book__title}>
                {selectedBook.title}
              </div>
              <div className={style.selected__book__author}>
                {selectedBook.author}
              </div>
              <div className={style.selected__book__duration}>
                <div className={style.selected__book__play}>
                  <FaRegCirclePlay className={style.selected__play__icon} />
                </div>
                <audio
                  src={selectedBook.audioLink}
                  id="AudioId"
                  ref={audioRef}
                  onLoadedMetadata={handleLoadedMetadata}
                ></audio>
                <div className={style.selected__book__time}>{duration}</div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className={style.selected__book}>
          <div className={style.selected__book__subtitle}>
            <Skeleton width="100%" height="12px" />
            <Skeleton width="100%" height="12px" />
            <Skeleton width="100%" height="12px" />
            <Skeleton width="100%" height="12px" />
          </div>
          <div className={style.divider}></div>
          <div className={style.selected__book__content}>
            <figure className={style.selected__book__figure}>
              <Skeleton width="90px" height="150px" />
            </figure>
            <div className={style.selected__book__text}>
              <div className={style.selected__book__title}>
                <Skeleton width="90px" height="36px" />
              </div>
              <div className={style.selected__book__author}>
                <Skeleton width="50px" />
              </div>
              <div className={style.selected__book__duration}>
                <div className={style.selected__book__play}>
                  <Skeleton width="20px" height="20px" />
                </div>
                <div className={style.selected__book__time}>
                  <Skeleton width="50px" height="16px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Selected;
