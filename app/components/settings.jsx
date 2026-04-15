import { useEffect, useState } from "react";
import { db, initFirebase } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import style from "../settings/page.module.css";

export const Settings = () => {
  const [subscriptionName, setSubscriptionName] = useState("");

  const app = initFirebase();
  const auth = getAuth(app);

  const userId = auth.currentUser?.uid;

  const checkSubscription = async () => {
    try {
      const subscriptionsRef = await getDocs(
        collection(db, "customers", userId, "subscriptions"),
      );
      const data = subscriptionsRef.docs.map((doc) => doc.data());
      setSubscriptionName(data[0].items[0].price.product.name);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      checkSubscription();
    }
  }, [app, auth.currentUser?.uid]);

  return <div className={style.text}>{subscriptionName}</div>;
};
