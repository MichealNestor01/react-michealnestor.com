import React from "react";
// hooks
import { motion } from "framer-motion";

// static content
import linkedInLogo from "../assets/logo-linkedin.svg";
import githubLogo from "../assets/logo-github.svg";

// socials is just a simple social media buttons container
const Socials = () => {
  const buttonVariants = {
    tap: { scale: 0.9 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const socialUrls = [
    { url: "https://www.linkedin.com/in/michealnestor", logo: linkedInLogo, name: "LinkedIn" },
    { url: "https://github.com/MichealNestor01", logo: githubLogo, name: "Github" },
  ];

  const socials = socialUrls.map((url, index) => {
    return (
      <motion.a
        key={index}
        variants={buttonVariants}
        whileTap="tap"
        whileHover="hover"
        href={url.url}
        target="_blank"
      >
        <img src={url.logo} alt={`${url.name} logo`} />
      </motion.a>
    );
  });

  return socials;
};

export default Socials;
