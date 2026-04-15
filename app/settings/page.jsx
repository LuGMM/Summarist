"use client";

import style from "./page.module.css";

import loginImg from "../../public/assets/login.png";

import { initFirebase } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../redux/signInModalSlice";
import { useEffect, useState } from "react";
import { signedIn, signedOut } from "../redux/logInSlice";
import { getPremiumStatus } from "../choose-plan/getPremiumStatus";
import { Settings } from "../components/settings";

export default function settings() {
  const isSignedIn = useSelector((state) => state.isSignedIn.value);

  const [isPremium, setIsPremium] = useState(false);

  const dispatch = useDispatch();

  const app = initFirebase();
  const auth = getAuth(app);

  const userEmail = auth.currentUser?.email;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(signedIn());
      return;
    } else {
      dispatch(signedOut());
    }
  });

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkSubscriptionStatus();
  }, [app, auth.currentUser?.uid]);

  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.title}>Settings</div>
        {isSignedIn ? (
          <>
            <div className={style.content}>
              <div className={style.subtitle}>Your Subscription Plan</div>

              {isPremium ? (
                <Settings />
              ) : (
                <>
                  <div className={style.text}>Basic</div>
                  <Link className={style.btn} href="/choose-plan">
                    Upgrade to Premium
                  </Link>
                </>
              )}
            </div>
            <div className={style.content}>
              <div className={style.subtitle}>Email</div>
              <div className={style.text}>{userEmail}</div>
            </div>
          </>
        ) : (
          <div className={style.login__wrapper}>
            <Image src={loginImg} alt="Login" className={style.login__image} />
            <div className={style.login__text}>
              Log in to your account to see your details.
            </div>
            <button className={style.btn} onClick={() => dispatch(modalOpen())}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
