// hooks
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import useImage from "../hooks/useImage";

// landing page data:
import data from "../siteData/landingPage.json";

// components
import Socials from "../components/Socials";

const LandingPage = () => {
  // get page data
  const { image } = useImage(data.image);
  const bio = data.bio;

  // setup hooks
  const navigate = useNavigate();
  const screenWidth = useSelector((state) => state.ui.screenWidth);

  // button animations //
  const buttonVariants = {
    tap: { scale: 0.9 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  let mode = "desktop";
  if (screenWidth < 1550) {
    mode = "mobile";
  }

  // Return the page component //
  return (
    <Fragment>
      <Helmet>
        <title>Micheal Nestor | Software Engineer</title>
        <meta name="description" content="Contact Micheal Nestor, let him know how he can help you!" />
      </Helmet>
      <section className="landingPage">
        <wrapper>
          {/* 
          The page is split into two sides, on the left is the content, with a title, short
          bio and then a link to my portfolio
          Then on the right there is an image of myself surrounded by the splash, aswell as
          links to my social medias
        */}
          <section className="content">
            <div className="imageContainer">
              <img src={image} alt="Micheal Nestor" />
            </div>
            <h1 className="title">Welcome!</h1>
            <p className="paragraph">{bio}</p>
            <div className="socials">
              <Socials />
            </div>
            <motion.div
              variants={buttonVariants}
              whileTap="tap"
              whileHover="hover"
              onClick={() => navigate("portfolio")}
              className="button globalButton"
            >
              <p>My Portfolio</p>
            </motion.div>
          </section>
          <section className="imageSection">
            <img src={image} alt="Micheal Nestor" />
          </section>
        </wrapper>
      </section>
    </Fragment>
  );
};

export default LandingPage;
