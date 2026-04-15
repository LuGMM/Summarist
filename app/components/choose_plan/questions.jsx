"use client";

import { useEffect, useState } from "react";
import style from "../../choose-plan/page.module.css";
import { IoIosArrowDown } from "react-icons/io";

const Questions = () => {
  const [qOne, setQOne] = useState();
  const [questionTwo, setQuestionTwo] = useState();
  const [questionThree, setQuestionThree] = useState();
  const [questionFour, setQuestionFour] = useState();
  const [arrowOne, setArrowOne] = useState();
  const [arrowTwo, setArrowTwo] = useState();
  const [arrowThree, setArrowThree] = useState();
  const [arrowFour, setArrowFour] = useState();

  const toggleQuestion = () => {
    qOne.classList.remove("show");
    questionTwo.classList.remove("show");
    questionThree.classList.remove("show");
    questionFour.classList.remove("show");
    arrowOne.classList.remove("question__icon--rotate");
    arrowTwo.classList.remove("question__icon--rotate");
    arrowThree.classList.remove("question__icon--rotate");
    arrowFour.classList.remove("question__icon--rotate");
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const questiOne = document.getElementById("qOne");
      const questionTwo = document.getElementById("qTwo");
      const questionThree = document.getElementById("qThree");
      const questionFour = document.getElementById("qFour");

      setQOne(questiOne);
      setQuestionTwo(questionTwo);
      setQuestionThree(questionThree);
      setQuestionFour(questionFour);

      const arrowOne = document.getElementById("arrowOne");
      const arrowTwo = document.getElementById("arrowTwo");
      const arrowThree = document.getElementById("arrowThree");
      const arrowFour = document.getElementById("arrowFour");

      setArrowOne(arrowOne);
      setArrowTwo(arrowTwo);
      setArrowThree(arrowThree);
      setArrowFour(arrowFour);
    }
  }, []);
  return (
    <div className={style.faq__wrapper}>
      <div className={style.question__card}>
        <div
          onClick={() => {
            if (qOne.classList.contains("show")) {
              toggleQuestion();
            } else {
              toggleQuestion();
              qOne.classList.add("show");
              arrowOne.classList.add("question__icon--rotate");
            }
          }}
          className={style.question__header}
        >
          <div className={style.question__title}>
            How does the free 7-day trial work?
          </div>
          <IoIosArrowDown
            id="arrowOne"
            className={`${style.question__icon} question__icon--rotate`}
          />
        </div>
        <div id="qOne" className={`${style.collapse} show`}>
          <div className={style.question__answer}>
            Begin your complimentary 7-day trial with a Summarist annual
            membership. You are under no obligation to continue your
            subscription, and you will only be billed when the trial period
            expires. With Premium access, you can learn at your own pace and as
            frequently as you desire, and you may terminate your subscription
            prior to the conclusion of the 7-day free trial.
          </div>
        </div>
      </div>
      <div className={style.question__card}>
        <div
          onClick={() => {
            if (qTwo.classList.contains("show")) {
              toggleQuestion();
            } else {
              toggleQuestion();
              qTwo.classList.add("show");
              arrowTwo.classList.add("question__icon--rotate");
            }
          }}
          className={style.question__header}
        >
          <div className={style.question__title}>
            Can I switch subscriptions from monthly to yearly, or yearly to
            monthly?
          </div>
          <IoIosArrowDown id="arrowTwo" className={style.question__icon} />
        </div>
        <div id="qTwo" className={style.collapse}>
          <div className={style.question__answer}>
            While an annual plan is active, it is not feasible to switch to a
            monthly plan. However, once the current month ends, transitioning
            from a monthly plan to an annual plan is an option.
          </div>
        </div>
      </div>
      <div className={style.question__card}>
        <div
          onClick={() => {
            if (qThree.classList.contains("show")) {
              toggleQuestion();
            } else {
              toggleQuestion();
              qThree.classList.add("show");
              arrowThree.classList.add("question__icon--rotate");
            }
          }}
          className={style.question__header}
        >
          <div className={style.question__title}>
            What's included in the Premium plan?
          </div>
          <IoIosArrowDown id="arrowThree" className={style.question__icon} />
        </div>
        <div id="qThree" className={style.collapse}>
          <div className={style.question__answer}>
            Premium membership provides you with the ultimate Summarist
            experience, including unrestricted entry to many best-selling books
            high-quality audio, the ability to download titles for offline
            reading, and the option to send your reads to your Kindle.
          </div>
        </div>
      </div>
      <div className={style.question__card}>
        <div
          onClick={() => {
            if (qFour.classList.contains("show")) {
              toggleQuestion();
            } else {
              toggleQuestion();
              qFour.classList.add("show");
              arrowFour.classList.add("question__icon--rotate");
            }
          }}
          className={style.question__header}
        >
          <div className={style.question__title}>
            Can I cancel during my trial or subscription?
          </div>
          <IoIosArrowDown id="arrowFour" className={style.question__icon} />
        </div>
        <div id="qFour" className={style.collapse}>
          <div className={style.question__answer}>
            You will not be charged if you cancel your trial before its
            conclusion. While you will not have complete access to the entire
            Summarist library, you can still expand your knowledge with one
            curated book per day.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
