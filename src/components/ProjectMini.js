import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const ProjectMini = ({ photo, type, slug, title, screenWidth }) => {
  const navigate = useNavigate();

  let suffix = "__desktop";
  if (screenWidth < 1250) {
    suffix = "__mobile";
  }

  const variants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={`projectMini box projectMini${suffix}`}
      variants={variants}
      whileTap="tap"
      whileHover="hover"
      onClick={() => navigate(`${slug}`)}
    >
      <h1>{title}</h1>
      <div className="imgCover" />
      <img className="img" src={photo} alt={title} />
    </motion.div>
  );
};

export default ProjectMini;
