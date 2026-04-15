"use client";

import { useParams } from "next/navigation";
import style from "./page.module.css";
import signInStyle from "../../settings/page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import logInImg from "../../../public/assets/login.png";
import { ImSpinner } from "react-icons/im";

import { AudioPlayer } from "../../components/AudioPlayer/AudioPlayer";
import { initFirebase } from "../../firebase";
import { getAuth } from "firebase/auth";
import { getPremiumStatus } from "../../choose-plan/getPremiumStatus";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { modalOpen } from "../../redux/signInModalSlice";
import Link from "next/link";

export default function Player() {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

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

  const isSignedIn = useSelector((state) => state.isSignedIn.value);

  const [isPremium, setIsPremium] = useState(false);
  const app = initFirebase();
  const auth = getAuth(app);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkSubscriptionStatus();
  }, [app, auth.currentUser?.uid, isSignedIn]);

  useEffect(() => {
    getBookInfo();
  }, []);

  return (
    <>
      <div className={style.summary__wrapper}>
        {isLoading ? (
          <div className={style.summary__text}>
            <div className={style.loading}>
              <ImSpinner className={style.spinner} />
            </div>
          </div>
        ) : (
          <div className={style.summary__text}>
            <div className={style.summary__title}>{book.title}</div>
            {isSignedIn ? (
              <>
                {!isPremium && book.subscriptionRequired ? (
                  <div className={style.subscribe__prompt}>
                    <div>
                      Looks like you're not subscribed to premium. Click here to
                      subscribe
                    </div>
                    <Link href="/choose-plan" className={style.subscribe__btn}>
                      Subscribe
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className={style.summary}>{book.summary}</div>
                    <AudioPlayer
                      title={book.title}
                      author={book.author}
                      cover={book.imageLink}
                      audioLink={book.audioLink}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {" "}
                <div className={signInStyle.login__wrapper}>
                  <Image
                    src={logInImg}
                    alt="Login"
                    className={signInStyle.login__image}
                  />
                  <div className={signInStyle.login__text}>
                    Log in to your account to listen or read.
                  </div>
                  <button
                    className={signInStyle.btn}
                    onClick={() => dispatch(modalOpen())}
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
