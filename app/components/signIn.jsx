"use client";
import { IoPersonCircleOutline } from "react-icons/io5";
import GoogleIcon from "../../public/assets/google.png";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ImSpinner } from "react-icons/im";

import { useSelector, useDispatch } from "react-redux";

import style from "../page.module.css";
import Image from "next/image";
import { useState } from "react";

import { initFirebase } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { signedIn } from "../redux/logInSlice";
import { modalClose } from "../redux/signInModalSlice";

export default function signIn() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const provider = new GoogleAuthProvider();
  const app = initFirebase();
  const auth = getAuth(app);

  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      if (user) {
        dispatch(signedIn());
        dispatch(modalClose());
        clearInput();
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const signInGuest = async () => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, "guest@email.com", "guestpassword");
    dispatch(signedIn());
    dispatch(modalClose());
    clearInput();
    setIsLoading(false);
  };

  const signUpWithEmail = async () => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(signedIn());
      dispatch(modalClose());
      clearInput();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const signInWithEmail = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(signedIn());
      dispatch(modalClose());
      clearInput();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const isModalOpen = useSelector((state) => state.modal.value);

  const clearInput = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <>
      {isModalOpen ? (
        <>
          {isRegistered ? (
            <>
              <div className={style.sign_in__modal}>
                <div className={style.modal__wrapper}>
                  <div
                    className={style.sign_in__overlay}
                    onClick={() => {
                      dispatch(modalClose());
                    }}
                  ></div>
                  <div className={style.modal}>
                    <div
                      onClick={() => {
                        dispatch(modalClose());
                      }}
                      className={style.close__modal}
                    >
                      <figure className={style.modal__icon__wrapper}>
                        <IoCloseCircleOutline className={style.modal__icon} />
                      </figure>
                    </div>
                    <div className={style.auth__content}>
                      <div className={style.modal__title}>
                        Log in to Summarist
                      </div>
                      <button
                        onClick={() => {
                          signInGuest();
                        }}
                        className={style.modal__button}
                      >
                        <figure className={style.modal__icon__wrapper}>
                          <IoPersonCircleOutline
                            className={style.modal__icon}
                          />
                        </figure>
                        <div className={style.button__text}>
                          {isLoading ? (
                            <ImSpinner className={style.spinner} />
                          ) : (
                            "Login as Guest"
                          )}
                        </div>
                      </button>
                      <div className={style.modal__divider}>
                        <span className={style.modal__divider__text}>or</span>
                      </div>
                      <button
                        onClick={() => {
                          signInWithGoogle();
                        }}
                        className={style.modal__button}
                      >
                        <figure className={style.modal__icon__wrapper}>
                          <Image
                            className={style.modal__icon}
                            src={GoogleIcon}
                            alt=""
                          />
                        </figure>
                        <div className={style.button__text}>
                          {isLoading ? (
                            <ImSpinner className={style.spinner} />
                          ) : (
                            "Login with Google"
                          )}
                        </div>
                      </button>
                      <div className={style.modal__divider}>
                        <span className={style.modal__divider__text}>or</span>
                      </div>
                      <div className={style.modal__input}>
                        <div className={style.modal__input__title}>
                          Login with Email
                        </div>
                        {error ? (
                          <span className={style.error__message}>{error}</span>
                        ) : null}
                        <input
                          className={style.modal__input__field}
                          id="email"
                          type="email"
                          placeholder="Email"
                          onChange={(event) => {
                            const signUpEmail = event.target.value;
                            setEmail(signUpEmail);
                          }}
                        />
                        <input
                          className={style.modal__input__field}
                          id="password"
                          type="password"
                          placeholder="Password"
                          onChange={(event) => {
                            const signUpPassword = event.target.value;
                            setPassword(signUpPassword);
                          }}
                        />
                        <button
                          className={style.input__button}
                          onClick={signInWithEmail}
                        >
                          {isLoading ? (
                            <ImSpinner className={style.spinner} />
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        className={style.register__btn}
                        onClick={() => {
                          setIsRegistered(false);
                          clearInput();
                        }}
                      >
                        Don't have an Account?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={style.sign_in__modal}>
                <div className={style.modal__wrapper}>
                  <div
                    className={style.sign_in__overlay}
                    onClick={() => {
                      dispatch(modalClose());
                    }}
                  ></div>
                  <div className={style.modal}>
                    <div
                      onClick={() => {
                        dispatch(modalClose());
                      }}
                      className={style.close__modal}
                    >
                      <figure className={style.modal__icon__wrapper}>
                        <IoCloseCircleOutline className={style.modal__icon} />
                      </figure>
                    </div>
                    <div className={style.auth__content}>
                      <div className={style.modal__title}>
                        Sign Up for Summarist
                      </div>

                      <button className={style.modal__button}>
                        <figure className={style.modal__icon__wrapper}>
                          <Image
                            className={style.modal__icon}
                            src={GoogleIcon}
                            alt=""
                          />
                        </figure>
                        <div className={style.button__text}>
                          Sign up with Google
                        </div>
                      </button>
                      <div className={style.modal__divider}>
                        <span className={style.modal__divider__text}>or</span>
                      </div>
                      <div className={style.modal__input}>
                        <span className={style.error__message}>{error}</span>
                        <input
                          className={style.modal__input__field}
                          id="email"
                          type="email"
                          placeholder="Email"
                          onChange={(event) => {
                            const signUpEmail = event.target.value;
                            setEmail(signUpEmail);
                          }}
                        />
                        <input
                          className={style.modal__input__field}
                          id="password"
                          type="password"
                          placeholder="Password"
                          onChange={(event) => {
                            const signUpPassword = event.target.value;
                            setPassword(signUpPassword);
                          }}
                        />
                        <button
                          className={style.modal__button}
                          onClick={signUpWithEmail}
                        >
                          {isLoading ? (
                            <ImSpinner className={style.spinner} />
                          ) : (
                            "Sign Up"
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        className={style.register__btn}
                        onClick={() => {
                          setIsRegistered(true);
                          clearInput();
                        }}
                      >
                        Already have an Account?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  );
}
