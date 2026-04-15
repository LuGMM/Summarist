"use client";

import style from "../../choose-plan/page.module.css";
import { useEffect, useState } from "react";
import { getCheckoutUrl } from "../../choose-plan/stripePayment";
import { initFirebase } from "../../firebase";

const Plans = () => {
  const app = initFirebase();

  const [premiumPlus, setPremiumPlus] = useState();
  const [premium, setPremium] = useState();
  const [premiumPlusDot, setPremiumPlusDot] = useState();
  const [premiumDot, setPremiumDot] = useState();

  const [isYearly, setIsYearly] = useState(true);

  const premiumPlusCheckout = async () => {
    const priceId = "price_1TFapA3WlD3vdWN2pIHK546c";
    const url = await getCheckoutUrl(app, priceId);
    window.location.assign(url);
  };

  const premiumCheckout = async () => {
    const priceId = "price_1TFaqo3WlD3vdWN2lQdK7Sxk";
    const url = await getCheckoutUrl(app, priceId);
    window.location.assign(url);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const premiumPlus = document?.getElementById("premium_plus");
      setPremiumPlus(premiumPlus);
      const premium = document?.getElementById("premium");
      setPremium(premium);
      const premiumPlusDot = document?.getElementById("premium__plus__dot");
      setPremiumPlusDot(premiumPlusDot);
      const premiumDot = document?.getElementById("premium__dot");
      setPremiumDot(premiumDot);
    }
  }, []);

  return (
    <>
      <div
        className={`${style.plan__card} plan__card--active`}
        id="premium_plus"
        onClick={() => {
          premiumPlus.classList.add("plan__card--active");
          premium.classList.remove("plan__card--active");
          premiumPlusDot.classList.add("show__dot");
          premiumDot.classList.remove("show__dot");
          setIsYearly(true);
        }}
      >
        <div className={style.plan__card__circle}>
          <div
            id="premium__plus__dot"
            className={`${style.plan__circle__dot} show__dot`}
          ></div>
        </div>
        <div className={style.plan__card__content}>
          <div className={style.plan__name}>Premium Plus Yearly</div>
          <div className={style.plan__price}>$99.99/year</div>
          <div className={style.plan__text}>7-day free trial included</div>
        </div>
      </div>
      <div className={style.plan__card__divider}>or</div>
      <div
        className={style.plan__card}
        id="premium"
        onClick={() => {
          premium.classList.add("plan__card--active");
          premiumPlus.classList.remove("plan__card--active");
          premiumDot.classList.add("show__dot");
          premiumPlusDot.classList.remove("show__dot");
          setIsYearly(false);
        }}
      >
        <div className={style.plan__card__circle}>
          <div id="premium__dot" className={style.plan__circle__dot}></div>
        </div>
        <div className={style.plan__card__content}>
          <div className={style.plan__name}>Premium Monthly</div>
          <div className={style.plan__price}>$9.99/month</div>
          <div className={style.plan__text}>No trial included</div>
        </div>
      </div>
      {isYearly ? (
        <div className={style.plan__checkout}>
          <div className={style.btn__wrapper}>
            <button
              onClick={premiumPlusCheckout}
              className={style.checkout__btn}
            >
              Start your 7-day free trial
            </button>
          </div>
          <div className={style.plan__disclaimer}>
            Cancel your trial at any time before it ends, and you won’t be
            charged.
          </div>
        </div>
      ) : (
        <div className={style.plan__checkout}>
          <div className={style.btn__wrapper}>
            <button onClick={premiumCheckout} className={style.checkout__btn}>
              Start your first month
            </button>
          </div>
          <div className={style.plan__disclaimer}>
            30-day money back guarantee, no questions asked.
          </div>
        </div>
      )}
    </>
  );
};

export default Plans;
