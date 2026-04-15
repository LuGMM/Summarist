"use client";

import Link from "next/link";
import style from "../../for-you/page.module.css";
import Skeleton from "../UI/skeleton";
import { CiClock2, CiStar } from "react-icons/ci";

import axios from "axios";
import { useEffect, useState } from "react";
import Duration from "./duration";

const Recomended = ({ isPremium, isSignedIn }) => {
  const [recomendedBook, setRecomendedBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBooks = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
    );

    setRecomendedBook(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <div className={style.main__title}>Recommended For You</div>
      <div className={style.sub__title}>We think you'll like these</div>
      {!isLoading ? (
        <div className={style.recommended__books}>
          {recomendedBook.map((book) => (
            <Link
              href={`/book/${book.id}`}
              key={book.id}
              className={style.recommended__book}
            >
              {book.subscriptionRequired ? (
                <>
                  {isPremium && isSignedIn ? null : (
                    <div className={style.book__pill}>Premium</div>
                  )}
                </>
              ) : null}
              <figure className={style.img__wrapper}>
                <img className={style.img} src={book.imageLink} />
              </figure>
              <div className={style.book__title}>{book.title}</div>
              <div className={style.book__author}>{book.author}</div>
              <div className={style.book__subtitle}>{book.subTitle}</div>
              <div className={style.book__details}>
                <div className={style.book__detail}>
                  <div className={style.book__icon}>
                    <CiStar />
                  </div>
                  <div>{book.averageRating}</div>
                </div>
                <div className={style.book__detail}>
                  <div className={style.book__icon}>
                    <CiClock2 />
                  </div>

                  <div>
                    <Duration audioLink={book.audioLink} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={style.recommended__books}>
          {new Array(4).fill(0).map((_, index) => (
            <Link href="" key={index} className={style.recommended__book}>
              <Skeleton width="100%" height="180px" />
              <div className={style.book__author}>
                <Skeleton width="100%" height="16px" />
              </div>
              <div className={style.book__subtitle}>
                <Skeleton width="100%" height="12px" />
              </div>
              <div className={style.book__details}>
                <Skeleton width="100%" height="12px" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recomended;
