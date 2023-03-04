// hooks
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { React } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";

// components
import PhotoGallery from "../components/PhotoGallery";
import { Fragment } from "react";

// functions
import { dateConverter } from "../functions/dateConverter";

// site data
import { domainName } from "../store/index";
import projects from "../siteData/projects.json";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    project_type,
    title,
    source_code,
    description,
    date_completed,
    photo_main,
    photo_1,
    photo_2,
    photo_3,
  } = projects[`${slug}`];

  let buttonVariants = {
    tap: { scale: 0.9 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const dateString = dateConverter(date_completed);

  const photosList = [[title, photo_main]];

  if (photo_1) {
    photosList.push([title, photo_1]);
  }
  if (photo_2) {
    photosList.push([title, photo_2]);
  }
  if (photo_3) {
    photosList.push([title, photo_3]);
  }

  return (
    <Fragment>
      <Helmet>
        <title>Micheal Nestor | {`${title}`}</title>
        <meta name="description" content={`Click to read about Micheal Nestor's ${title} project.`} />
      </Helmet>
      <section className="projectDetailPage">
        <section className="header">
          <h1 className="title">{title}</h1>
          <section className="details">
            <h2 className="detail">Completed: {dateString}</h2>
            <h2 className="detail">Project Type: {project_type}</h2>
          </section>
        </section>
        <section className="main">
          <section className="galleryContainer">
            <PhotoGallery photos={photosList} />
          </section>
          <section className="descriptionContainer">
            <p className="description">{description}</p>
            <section className="buttons">
              {project_type === "Javascript" && (
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  whileHover="hover"
                  href={`${domainName}projects/${slug}`}
                  target="_blank"
                  className="button globalButton runProjectButton"
                >
                  Run Project
                </motion.a>
              )}
              {source_code && (
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  whileHover="hover"
                  href={source_code}
                  target="_blank"
                  className="button globalButton"
                >
                  Source Code
                </motion.a>
              )}
            </section>
          </section>
        </section>
        <motion.div
          variants={buttonVariants}
          whileTap="tap"
          whileHover="hover"
          onClick={() => navigate(`/portfolio`)}
          className="backButton globalButton"
        >
          Other Projects
        </motion.div>
      </section>
    </Fragment>
  );
};

export default ProjectDetailPage;
