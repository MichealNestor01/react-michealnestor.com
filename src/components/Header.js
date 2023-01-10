// hooks
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const Header = () => {
  // extendUnderline refers to the state of the underline div under the title
  // on hover the underline extends to underline the full title
  const [extendUnderline, setExtendUnderline] = useState(false);
  const screenWidth = useSelector((state) => state.ui.screenWidth);
  const [openLinks, setOpenLinks] = useState(false);
  // determine whether the underline should be extended or not
  const underlineClasses = extendUnderline
    ? "header__title__underline header__title__underline__extend"
    : "header__title__underline";

  // setup the navigation links
  const linkInfo = [
    { title: "About", page: "/about" },
    { title: "Portfolio", page: "/portfolio" },
    { title: "Contact", page: "/contact" },
  ];

  // create the nav link components
  const navLinks = linkInfo.map((item, index) => {
    return (
      <li key={index}>
        <NavLink to={item.page} activeclassname="active" onClick={() => setOpenLinks(false)}>
          {item.title}
        </NavLink>
      </li>
    );
  });

  // create the burger component for use in mobile navigation
  const burgerClickHander = () => setOpenLinks(!openLinks);

  const barClasses = openLinks
    ? "header__burger__bar__open header__burger__bar"
    : "header__burger__bar__closed header__burger__bar";
  const burger = (
    <div className="header__burger" onClick={burgerClickHander}>
      <span className={barClasses}></span>
      <span className={barClasses}></span>
      <span className={barClasses}></span>
    </div>
  );

  const bugerInitial = { opacity: 0, x: "100%" };
  const bugerMounted = { opacity: 1, x: "0%" };

  const burgerNav = (
    <motion.section
      className="header__burger__nav"
      transition={{ duration: 0.5 }}
      initial={bugerInitial}
      animate={bugerMounted}
      exit={bugerInitial}
    >
      <ul>{navLinks}</ul>
    </motion.section>
  );

  //===animation setup===//
  const unmountedState = { opacity: 0, height: "0vh" };
  const mountedState = { opacity: 1, height: "10vh" };

  let linkContent = burger;
  let headerContainerClasses = "header__titleContainer header__titleContainer__mobile";
  let navClasses = "header__nav header__nav__mobile";
  let headerClasses = "header header__mobile";
  if (screenWidth > 1200) {
    linkContent = <ul>{navLinks}</ul>;
    headerClasses = "header header__desktop";
    headerContainerClasses = "header__titleContainer header__titleContainer__desktop";
    navClasses = "header__nav header__nav__desktop";
  }
  const titleClasses = openLinks
    ? "header__title header__title__blue"
    : "header__title header__title__white";

  // return the component //
  return (
    <AnimatePresence>
      <motion.section
        key="header"
        initial={unmountedState}
        animate={mountedState}
        exit={unmountedState}
        transition={{ duration: 0.6 }}
        className={headerClasses}
      >
        <div className={headerContainerClasses}>
          <Link
            className={titleClasses}
            to="/"
            onClick={() => setOpenLinks(false)}
            onMouseEnter={() => setExtendUnderline(true)}
            onMouseLeave={() => setExtendUnderline(false)}
          >
            Micheal Nestor
          </Link>
          {screenWidth === 1920 ? <div className={underlineClasses} /> : ""}
        </div>
        <nav className={navClasses}>{linkContent}</nav>
        <AnimatePresence>{openLinks ? burgerNav : ""}</AnimatePresence>
      </motion.section>
    </AnimatePresence>
  );
};

export default Header;
