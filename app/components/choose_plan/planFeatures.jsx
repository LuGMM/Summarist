import style from "../../choose-plan/page.module.css";

import { IoDocumentText } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";

const PlanFeatures = () => {
  return (
    <div className={style.plan__features__wrapper}>
      <div className={style.plan__feature}>
        <div className={style.plan__feature__icon}>
          <IoDocumentText className={style.icon} />
        </div>
        <div className={style.plan__feature__text}>
          <b>Key ideas in few min</b> with many books to read
        </div>
      </div>
      <div className={style.plan__feature}>
        <div className={style.plan__feature__icon}>
          <RiPlantFill className={style.icon} />
        </div>
        <div className={style.plan__feature__text}>
          <b>3 million</b> people growing with Summarist everyday
        </div>
      </div>
      <div className={style.plan__feature}>
        <div className={style.plan__feature__icon}>
          <FaHandshake className={style.icon} />
        </div>
        <div className={style.plan__feature__text}>
          <b>Precise recommendations</b> collections curated by experts
        </div>
      </div>
    </div>
  );
};

export default PlanFeatures;
