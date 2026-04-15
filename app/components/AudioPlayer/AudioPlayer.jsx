"use client";
import style from "../../player/[id]/page.module.css";

import { useEffect, useRef, useState } from "react";

import { MdForward10 } from "react-icons/md";
import { MdReplay10 } from "react-icons/md";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

export const AudioPlayer = ({ title, author, cover, audioLink }) => {
  const [isPlay, setIsPlay] = useState(true);
  const audioRef = useRef();
  const progressRef = useRef();

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    if (typeof document !== "undefined") {
      const audio = document?.getElementById("Audio");

      const progressBar = document?.getElementById("ProgressBar");
      const currentTimeDisplay = document?.getElementById("currentTimeDisply");

      const durationDisplay = document?.getElementById("durationDisplay");

      audio.addEventListener("loadedmetadata", () => {
        progressBar.max = audio.duration;
        durationDisplay.textContent = formatTime(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        progressBar.max = audio.duration;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);

        progressBar.value = audio.currentTime;
      });

      playPauseButton.addEventListener("click", () => {
        if (audio.paused) {
          audio.play();
          setIsPlay(false);
        } else {
          audio.pause();
          setIsPlay(true);
        }
      });

      progressBar.addEventListener("input", () => {
        audio.currentTime = progressBar.value;
      });
    }
  }, [audioLink]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const audio = document?.getElementById("Audio");
      const forward = document?.getElementById("skipForward");
      const backward = document?.getElementById("backward");

      forward.addEventListener("click", () => {
        audio.currentTime = audio.currentTime + 5;
      });

      backward.addEventListener("click", () => {
        audio.currentTime = audio.currentTime - 5;
      });
    }
  }, []);

  return (
    <div className={style.player__container}>
      <div className={style.player__info__wrapper}>
        <div className={style.track__info__wrapper}>
          <div className={style.track__info}>
            <figure className={style.player__img__wrapper}>
              {title ? (
                <img
                  className={style.cover__img}
                  src={cover}
                  alt="audio avatar"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md">
                  <span className="text-xl text-gray-600"></span>
                </div>
              )}
            </figure>
          </div>
          <div className={style.player__text}>
            <p className="font-bold lg:truncate lg:max-w-64">{title}</p>
            <p className={style.author}>{author}</p>
          </div>
        </div>

        <div className={style.controls__buttons}>
          <audio
            id="Audio"
            className={style.audio__controls}
            ref={audioRef}
            src={audioLink}
          />
          <button className={style.skip__btn} id="backward">
            <figure>
              <MdReplay10 className={style.skip__btn__icon} />
            </figure>
          </button>
          <button className={style.play__btn} id="playPauseButton">
            {isPlay ? (
              <FaPlayCircle className={style.play__btn__icon} />
            ) : (
              <FaPauseCircle className={style.play__btn__icon} />
            )}
          </button>
          <button className={style.skip__btn} id="skipForward">
            <figure>
              <MdForward10 className={style.skip__btn__icon} />
            </figure>
          </button>
        </div>

        <div className={style.progress__bar__wrapper}>
          <span id="currentTimeDisply">0:00</span>
          <input
            className={style.input__progress__bar}
            id="ProgressBar"
            type="range"
            ref={progressRef}
            defaultValue="0"
            onChange={() => {}}
          />

          <span id="durationDisplay">0:00</span>
        </div>
      </div>
    </div>
  );
};
