"use client";

import Link from "next/link";
import style from "./page.module.css";

import { CiStar, CiClock2 } from "react-icons/ci";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import {
  HiOutlineLightBulb,
  HiOutlineMicrophone,
  HiOutlineBookOpen,
} from "react-icons/hi";

import Skeleton from "../../components/UI/skeleton";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Duration from "../../components/for-you/duration";
import { getPremiumStatus } from "../../choose-plan/getPremiumStatus";

import { initFirebase, db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { modalOpen } from "../../redux/signInModalSlice";

import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { signedIn, signedOut } from "../../redux/logInSlice";

export default function Book() {
  const dispatch = useDispatch();
  const params = useParams();
  const app = initFirebase();
  const auth = getAuth(app);

  const userId = auth.currentUser?.uid;

  const isSignedIn = useSelector((state) => state.isSignedIn.value);

  const [isPremium, setIsPremium] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { id } = params;

  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getBookInfo() {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    );
    setBook(data);
    setIsLoading(false);
  }
  useEffect(() => {
    getBookInfo();
  }, []);

  const addBookmark = async () => {
    await setDoc(doc(db, "customers", userId, "bookmarks", book.id), {
      title: book.title,
      author: book.author,
      subTitle: book.subTitle,
      averageRating: book.averageRating,
      totalRating: book.totalRating,
      audioLink: book.audioLink,
      imageLink: book.imageLink,
      id: book.id,
    });
  };

  const removeBookmark = async () => {
    await deleteDoc(doc(db, "customers", userId, "bookmarks", book.id));
  };

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkSubscriptionStatus();
  }, [app, auth.currentUser?.uid, isSignedIn]);

  const checkBookmark = async () => {
    try {
      const bookmarkRef = doc(db, "customers", userId, "bookmarks", book.id);
      const bookmarkSnap = await getDoc(bookmarkRef);
      if (bookmarkSnap.exists()) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    } catch (error) {}
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(signedIn());
      checkBookmark();
      return;
    } else {
      dispatch(signedOut());
    }
  });

  return (
    <div className={style.row}>
      <div className={style.container}>
        {book.imageLink && !isLoading ? (
          <div className={style.wrapper}>
            <div className={style.book__details}>
              <div className={style.book__title}>
                {book.title}{" "}
                {!isPremium && book.subscriptionRequired ? "(Premium)" : null}
              </div>
              <div className={style.book__author}>{book.author}</div>
              <div className={style.book__subtitle}>{book.subTitle}</div>
              <div className={style.book__details__wrapper}>
                <div className={style.book__inner__wrapper}>
                  <div className={style.book__detail}>
                    <div className={style.book__detail__icon}>
                      <CiStar className={style.icon} />
                    </div>
                    <div className={style.book__detail__value}>
                      {book.averageRating} ({book.totalRating})
                    </div>
                  </div>
                  <div className={style.book__detail}>
                    <div className={style.book__detail__icon}>
                      <CiClock2 className={style.icon} />
                    </div>
                    <div className={style.book__detail__value}>
                      <Duration audioLink={book.audioLink} />
                    </div>
                  </div>
                  <div className={style.book__detail}>
                    <div className={style.book__detail__icon}>
                      <HiOutlineMicrophone className={style.icon} />
                    </div>
                    <div className={style.book__detail__value}>{book.type}</div>
                  </div>
                  <div className={style.book__detail}>
                    <div className={style.book__detail__icon}>
                      <HiOutlineLightBulb className={style.icon} />
                    </div>
                    <div className={style.book__detail__value}>
                      {book.keyIdeas} Key Ideas
                    </div>
                  </div>
                </div>
              </div>
              {isSignedIn ? (
                <>
                  {!isPremium && book.subscriptionRequired ? (
                    <div className={style.book__read}>
                      <Link
                        href={`/choose-plan`}
                        className={style.book__read__button}
                      >
                        <div className={style.book__read__icon}>
                          <HiOutlineBookOpen className={style.btn__icon} />
                        </div>
                        <div className={style.book__read__text}>Read</div>
                      </Link>
                      <Link
                        href={`/choose-plan`}
                        className={style.book__read__button}
                      >
                        <div className={style.book__read__icon}>
                          <HiOutlineMicrophone className={style.btn__icon} />
                        </div>
                        <div className={style.book__read__text}>Listen</div>
                      </Link>
                    </div>
                  ) : (
                    <div className={style.book__read}>
                      <Link
                        href={`/player/${book.id}`}
                        className={style.book__read__button}
                      >
                        <div className={style.book__read__icon}>
                          <HiOutlineBookOpen className={style.btn__icon} />
                        </div>
                        <div className={style.book__read__text}>Read</div>
                      </Link>
                      <Link
                        href={`/player/${book.id}`}
                        className={style.book__read__button}
                      >
                        <div className={style.book__read__icon}>
                          <HiOutlineMicrophone className={style.btn__icon} />
                        </div>
                        <div className={style.book__read__text}>Listen</div>
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className={style.book__read}>
                  <button
                    onClick={() => {
                      dispatch(modalOpen());
                    }}
                    className={style.book__read__button}
                  >
                    <div className={style.book__read__icon}>
                      <HiOutlineBookOpen className={style.btn__icon} />
                    </div>
                    <div className={style.book__read__text}>Read</div>
                  </button>
                  <button
                    onClick={() => {
                      dispatch(modalOpen());
                    }}
                    className={style.book__read__button}
                  >
                    <div className={style.book__read__icon}>
                      <HiOutlineMicrophone className={style.btn__icon} />
                    </div>
                    <div className={style.book__read__text}>Listen</div>
                  </button>
                </div>
              )}
              {isSignedIn ? (
                <>
                  {isBookmarked ? (
                    <div
                      onClick={() => {
                        removeBookmark();
                        checkBookmark();
                      }}
                      className={style.bookmark}
                    >
                      <div className={style.bookmark__icon}>
                        <FaBookmark className={style.icon} />
                      </div>
                      <div className={style.bookmark__text}>
                        Saved in My Library
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        addBookmark();
                        checkBookmark();
                      }}
                      className={style.bookmark}
                    >
                      <div className={style.bookmark__icon}>
                        <FaRegBookmark className={style.icon} />
                      </div>
                      <div className={style.bookmark__text}>
                        Bookmark This Title
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  onClick={() => {
                    dispatch(modalOpen());
                  }}
                  className={style.bookmark}
                >
                  <div className={style.bookmark__icon}>
                    <FaRegBookmark className={style.icon} />
                  </div>
                  <div className={style.bookmark__text}>
                    Bookmark This Title
                  </div>
                </div>
              )}

              <div className={style.second__title}>What's it about?</div>
              <div className={style.book__tags}>
                <div className={style.book__tag}>{book.tags[0]}</div>
                {book.tags[1] ? (
                  <div className={style.book__tag}>{book.tags[1]}</div>
                ) : null}
              </div>
              <div className={style.description}>{book.bookDescription}</div>
              <div className={style.second__title}>About the Author</div>
              <div className={style.description}>{book.authorDescription}</div>
            </div>
            <div className={style.book__figure__wrapper}>
              <figure className={style.book__figure}>
                <img
                  className={style.book__cover}
                  src={book.imageLink}
                  alt="Book Cover"
                />
              </figure>
            </div>
          </div>
        ) : (
          <div className={style.wrapper}>
            <div className={style.book__details}>
              <div className={style.book__title}>
                <Skeleton width="80%" height="40px" />
              </div>
              <div className={style.book__author}>
                <Skeleton width="80%" height="24px" />
              </div>
              <div className={style.book__subtitle}>
                <Skeleton width="80%" height="24px" />
              </div>
              <div className={style.book__details__wrapper}>
                <div className={style.book__inner__wrapper}>
                  <div className={style.book__detail}>
                    <Skeleton width="80%" height="24px" />
                  </div>
                  <div className={style.book__detail}>
                    <Skeleton width="80%" height="24px" />
                  </div>
                  <div className={style.book__detail}>
                    <Skeleton width="80%" height="24px" />
                  </div>
                  <div className={style.book__detail}>
                    <Skeleton width="80%" height="24px" />
                  </div>
                </div>
              </div>
              <div className={style.book__read}>
                <Link
                  href={`/player/${book.id}`}
                  className={style.book__read__button}
                >
                  <div className={style.book__read__icon}>
                    <HiOutlineBookOpen className={style.btn__icon} />
                  </div>
                  <div className={style.book__read__text}>Read</div>
                </Link>
                <Link
                  href={`/player/${book.id}`}
                  className={style.book__read__button}
                >
                  <div className={style.book__read__icon}>
                    <HiOutlineMicrophone className={style.btn__icon} />
                  </div>
                  <div className={style.book__read__text}>Listen</div>
                </Link>
              </div>
              <div className={style.bookmark}>
                <div className={style.bookmark__icon}>
                  <FaRegBookmark className={style.icon} />
                </div>
                <div className={style.bookmark__text}>Bookmark This Title</div>
              </div>
              <div className={style.second__title}>What's it about?</div>
              <div className={style.book__tags}>
                <div className={style.book__tag}>
                  <Skeleton width="150px" height="0px" />
                </div>
                <div className={style.book__tag}>
                  <Skeleton width="150px" height="0px" />
                </div>
              </div>
              <div className={style.description}>
                <Skeleton width="100%" height="300px" />
              </div>
              <div className={style.second__title}>About the Author</div>
              <div className={style.description}>
                <Skeleton width="100%" height="300px" />
              </div>
            </div>
            <div className={style.book__figure__wrapper}>
              <figure className={style.book__figure}>
                <Skeleton width="300px" height="300px" />
              </figure>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
