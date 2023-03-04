import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();
  const variants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };
  const links = [
    { text: "Home", path: "/" },
    { text: "About Me", path: "/about" },
    { text: "My Portfolio", path: "/portfolio" },
    //{ text: "Contact Me", path: "/contact" },
  ].map((link) => {
    return (
      <motion.button
        key={link.text}
        variants={variants}
        whileTap="tap"
        whileHover="hover"
        to={link.path}
        className="globalButton"
        onClick={() => navigate(link.path)}
      >
        {link.text}
      </motion.button>
    );
  });

  return (
    <section className="notFoundPage">
      <h1>Oops 🐸! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      {links}
    </section>
  );
};
export default NotFound;
