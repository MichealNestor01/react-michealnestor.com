// hooks
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import useImage from "../hooks/useImage";

// landing page data:
import data from "../siteData/landingPage.json";

// components
import Socials from "../components/Socials";

// component page for the ladning page
const LandingPage = () => {
  const { loading, error, image } = useImage(data.image);
  const bio = data.bio;

  // SETUP HOOKS //
  const navigate = useNavigate();
  const screenWidth = useSelector((state) => state.ui.screenWidth);

  // button animations //
  const buttonVariants = {
    tap: { scale: 0.9 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  let suffix = "__desktop";
  if (screenWidth < 1550) {
    suffix = "__mobile";
  }

  // Return the page component //
  return (
    <Fragment>
      <Helmet>
        <title>Micheal Nestor | Software Engineer</title>
        <meta name="description" content="Contact Micheal Nestor, let him know how he can help you!" />
      </Helmet>
      <section className={`landingPage landingPage${suffix}`}>
        {/* 
          The page is split into two sides, on the left is the content, with a title, short
          bio and then a link to my portfolio
          Then on the right there is an image of myself surrounded by the splash, aswell as
          links to my social medias
        */}
        <section className={`content content${suffix}`}>
          {suffix === "__mobile" && (
            <div className="imageContainer">
              <img src={image} alt="Micheal Nestor" />
            </div>
          )}
          <h1 className={`title title${suffix}`}>Welcome!</h1>
          <p className={`paragraph paragraph${suffix}`}>{bio}</p>
          <div className="socials">
            <Socials />
          </div>
          <motion.div
            variants={buttonVariants}
            whileTap="tap"
            whileHover="hover"
            onClick={() => navigate("portfolio")}
            className="button"
          >
            <p>My Portfolio</p>
          </motion.div>
        </section>
        {suffix === "__desktop" && (
          <section className={`imageSection imageSection${suffix}`}>
            <div className="container">
              <img src={image} alt="Micheal Nestor" />
            </div>
          </section>
        )}
      </section>
    </Fragment>
  );
};

export default LandingPage;
