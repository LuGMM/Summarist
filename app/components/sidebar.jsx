"use client";

import Logo from "../../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

import { initFirebase } from "../firebase";
import { getAuth, signOut } from "firebase/auth";

import { PiHouseLineLight, PiBookmarks } from "react-icons/pi";
import { RiBallPenLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { FiLogOut, FiSettings, FiHelpCircle } from "react-icons/fi";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../redux/signInModalSlice";
import { usePathname } from "next/navigation";
import { signedOut } from "../redux/logInSlice";

export default function Sidebar() {
  const pathName = usePathname();
  const isSignedIn = useSelector((state) => state.isSignedIn.value);

  const dispatch = useDispatch();

  const [highlightForYou, setHighlightForYou] = useState();
  const [highlightLibrary, setHighlightLibrary] = useState();
  const [highlightSetting, setHighlightSetting] = useState();
  const [sidebar, setSidebar] = useState();
  const [overlay, setOverlay] = useState();

  useEffect(() => {
    document.getElementById(pathName)?.classList.add("selected");
    if (typeof document !== "undefined") {
      const ishighlightForYou = document.getElementById("/for-you");
      const ishighlightLibrary = document.getElementById("/library");
      const ishighlightSetting = document.getElementById("/settings");
      const sidebar = document.getElementById("Sidebar");
      const overlay = document.querySelector(".sidebar__overlay");

      setOverlay(overlay);
      setSidebar(sidebar);
      setHighlightForYou(ishighlightForYou);
      setHighlightLibrary(ishighlightLibrary);
      setHighlightSetting(ishighlightSetting);
    }
  }, []);

  const app = initFirebase();
  const auth = getAuth(app);

  const hideSidebar = () => {
    sidebar.classList.add("sidebar__hidden");
    sidebar.classList.remove("sidebar__shown");
    overlay.style.display = "none";
  };

  return (
    <>
      <div onClick={hideSidebar} className="sidebar__overlay"></div>
      <div id="Sidebar" className="sidebar__wrapper sidebar__hidden">
        <div className="sidebar__logo__wrapper">
          <Image src={Logo} alt="Summarist Logo" className="sidebar__logo" />
        </div>
        <div className="sidebar__links">
          <div className="sidebar__links__top">
            <Link
              onClick={() => {
                highlightForYou.classList.add("selected");
                highlightLibrary.classList.remove("selected");
                highlightSetting.classList.remove("selected");
                hideSidebar();
              }}
              id="/for-you"
              href="/for-you"
              className="sidebar__link"
            >
              <div className="selected"></div>
              <div className="icon__wrapper">
                <PiHouseLineLight className="icon" />
              </div>
              <div>For you</div>
            </Link>

            <div
              style={{ cursor: "not-allowed" }}
              id="/library"
              className="sidebar__link"
            >
              <div className="selected"></div>
              <div className="icon__wrapper">
                <PiBookmarks className="icon" />
              </div>
              <div>Library</div>
            </div>
            <div style={{ cursor: "not-allowed" }} className="sidebar__link">
              <div className="selected"></div>
              <div className="icon__wrapper">
                <RiBallPenLine className="icon" />
              </div>
              <div>Highlights</div>
            </div>
            <div style={{ cursor: "not-allowed" }} className="sidebar__link">
              <div className="selected"></div>
              <div className="icon__wrapper">
                <AiOutlineSearch className="icon" />
              </div>
              <div>Search</div>
            </div>
          </div>
          <div className="sidebar__links__bottom">
            <Link
              onClick={() => {
                highlightSetting.classList.add("selected");
                highlightLibrary.classList.remove("selected");
                highlightForYou.classList.remove("selected");
                hideSidebar();
              }}
              id="/settings"
              href="/settings"
              className="sidebar__link"
            >
              <div className="selected"></div>
              <div className="icon__wrapper">
                <FiSettings className="icon" />
              </div>
              <div>Settings</div>
            </Link>
            <div style={{ cursor: "not-allowed" }} className="sidebar__link">
              <div className="selected"></div>
              <div className="icon__wrapper">
                <FiHelpCircle className="icon" />
              </div>
              <div>Help & Support</div>
            </div>
            {auth.currentUser && isSignedIn ? (
              <Link
                onClick={() => {
                  signOut(auth);
                  dispatch(signedOut());
                  hideSidebar();
                }}
                href=""
                className="sidebar__link"
              >
                <div className="selected"></div>
                <div className="icon__wrapper">
                  <FiLogOut className="icon" />
                </div>
                <div>Logout</div>
              </Link>
            ) : (
              <Link
                onClick={() => {
                  dispatch(modalOpen());
                  hideSidebar();
                }}
                href=""
                className="sidebar__link"
              >
                <div className="selected"></div>
                <div className="icon__wrapper">
                  <FiLogOut className="icon" />
                </div>
                <div>Login</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
