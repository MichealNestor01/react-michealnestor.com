// hooks
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

//reduxActions
import { uiActions } from "./store";

//pages
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
//import ProjectDetailPage from "./pages/ProjectDetailPage";
//import ContactPage from "./pages/ContactPage";

//components
import Header from "./components/Header";
import Popup from "./components/ui/Popup";

function App() {
  //===setup hooks===//
  const location = useLocation();
  const dispatch = useDispatch();
  const { showPopup, popupMessage, popupTitle } = useSelector((state) => state.ui);

  //===page responsiveness===//

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      dispatch(uiActions.setScreenWidth(width));
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [dispatch]);

  //===Setup page animations==//
  // inital state of a page is transparent and 20% below where it should be
  const initalPageState = { x: "100%", opacity: 0 };
  // the enter state (or active state) is opaque and where it should be
  const enterPageState = { x: "0%", opacity: 1 };
  // the leave page state moves the page up and makes it once again transparent
  const leavePageState = { x: "-100%", opacity: 0 };

  //===react router setup===//
  //page list for react router
  const pagesArray = [
    { path: "", key: "landing", component: <LandingPage />, exact: true },
    { path: "about", key: "about", component: <AboutPage />, exact: true },
    { path: "portfolio", key: "portfolio", component: <PortfolioPage />, exact: true },
    //{ path: "contact", key: "contact", component: <ContactPage />, exact: true },
    //{ path: "portfolio/:slug", key: "projectDetail", component: <ProjectDetailPage />, exact: true },
  ];

  // setup the route components for react router
  const routes = pagesArray.map((page) => {
    return (
      <Route
        path={`/${page.path}`}
        key={page.key}
        element={
          <motion.div
            key={page.key}
            initial={initalPageState}
            animate={enterPageState}
            exit={leavePageState}
            transition={{ transition: 0 }}
          >
            {page.component}
          </motion.div>
        }
      />
    );
  });

  //===JSX to render===//
  return (
    // the page is 'locked' while things are transitioning, to help the animation
    <div className="defaultPageWrapper">
      {/* If there is a popup show it */}
      <AnimatePresence>
        {showPopup && <Popup title={popupTitle} message={popupMessage} />}
      </AnimatePresence>
      {/* Show the header */}
      <Header />
      {/* Animate the current page entering */}
      <AnimatePresence initial={false} mode="wait">
        <Routes location={location} key={location.pathname}>
          {routes}
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
