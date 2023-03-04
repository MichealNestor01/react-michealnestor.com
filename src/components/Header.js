// hooks
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const Header = () => {
  // setup hooks
  const [openLinks, setOpenLinks] = useState(false);

  // setup the navigation links
  const linkInfo = [
    { title: "About", page: "/about" },
    { title: "Portfolio", page: "/portfolio" },
    //{ title: "Contact", page: "/contact" },
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

  const barClasses = openLinks ? "bar__open bar" : "bar__closed bar";
  const burger = (
    <div className="burger" onClick={burgerClickHander}>
      <span className={barClasses}></span>
      <span className={barClasses}></span>
      <span className={barClasses}></span>
    </div>
  );

  const bugerInitial = { opacity: 0, x: "100%" };
  const bugerMounted = { opacity: 1, x: "-0%", width: "100vw" };

  const burgerNav = (
    <motion.section
      className="burgerNav"
      transition={{ duration: 0.5 }}
      initial={bugerInitial}
      animate={bugerMounted}
      exit={bugerInitial}
    >
      <ul>{navLinks}</ul>
    </motion.section>
  );

  // return the component //
  return (
    <section key="header" className="header">
      <div className="titleContainer">
        <Link className="title" to="/" onClick={() => setOpenLinks(false)}>
          Micheal Nestor
        </Link>
      </div>
      <nav className="nav">
        <ul>{navLinks}</ul>
        {burger}
      </nav>
      <AnimatePresence>{openLinks ? burgerNav : ""}</AnimatePresence>
    </section>
  );
};

export default Header;
