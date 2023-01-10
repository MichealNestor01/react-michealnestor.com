// hooks
import React from "react";
import { motion } from "framer-motion";

const Popup = (props) => {
  const unmountedState = { opacity: 0, top: "-10%" };
  const mountedState = { opacity: 1, top: "5%" };
  return (
    <motion.div
      key="popup"
      initial={unmountedState}
      animate={mountedState}
      exit={unmountedState}
      transition={{ duration: 1, type: "spring" }}
      className="popup"
    >
      <h1 className="popup__title">{props.title}</h1>
      <p className="popup__message">{props.message}</p>
    </motion.div>
  );
};

export default Popup;
