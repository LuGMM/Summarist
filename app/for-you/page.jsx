"use client";

import style from "./page.module.css";
import Selected from "../components/for-you/selected";
import Recomended from "../components/for-you/recomended";
import Suggested from "../components/for-you/suggested";
import { initFirebase } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getPremiumStatus } from "../choose-plan/getPremiumStatus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signedIn, signedOut } from "../redux/logInSlice";

export default function ForYou() {
  const isSignedIn = useSelector((state) => state.isSignedIn.value);

  const [isPremium, setIsPremium] = useState(false);
  const app = initFirebase();
  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkSubscriptionStatus();
  }, [app, auth.currentUser?.uid, isSignedIn]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(signedIn());
      return;
    } else {
      dispatch(signedOut());
    }
  });

  return (
    <div className={style.for__you__section}>
      <div className={style.row}>
        <div className={style.container}>
          <div className="wrapper">
            <Selected />
            <Recomended isPremium={isPremium} isSignedIn={isSignedIn} />
            <Suggested isPremium={isPremium} isSignedIn={isSignedIn} />
          </div>
        </div>
      </div>
    </div>
  );
}
