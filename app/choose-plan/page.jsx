import Image from "next/image";
import style from "./page.module.css";
import "./page.module.css";

import planImg from "../../public/assets/pricing-top.png";

import Footer from "../components/UI/footer";
import PlanFeatures from "../components/choose_plan/planFeatures";
import Plans from "../components/choose_plan/plans";
import Questions from "../components/choose_plan/questions";

export default function ChoosePlan() {
  return (
    <div className={style.plan}>
      <div className={style.plan__header__wrapper}>
        <div className={style.plan__header}>
          <div className={style.plan__title}>
            Get unlimited access to many amazing books to read
          </div>
          <div className={style.plan__subtitle}>
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className={style.plan__img__wrapper}>
            <Image className={style.plan__img} src={planImg} alt="plan image" />
          </figure>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.container}>
          <PlanFeatures />

          <div className={style.section__title}>
            Choose the plan that fits you
          </div>
          <Plans />
          <Questions />
        </div>
      </div>
      <Footer />
    </div>
  );
}
