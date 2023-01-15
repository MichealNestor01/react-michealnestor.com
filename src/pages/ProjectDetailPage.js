import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { React, useEffect, Fragment } from "react";
import { motion } from "framer-motion";
import PhotoGallery from "../components/PhotoGallery";
import { dateConverter } from "../functions/dateConverter";
import { Helmet } from "react-helmet";
import { domainName } from "../store/index";
import projects from "../siteData/projects.json";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const screenWidth = useSelector((state) => state.ui.screenWidth);
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
  } = projects[`${slug}`]; // useSelector((state) => state.projects.projectFocused);

  let suffix = "__desktop";
  if (screenWidth < 1600) {
    suffix = "__mobile";
  }

  let buttonVariants = {
    tap: { scale: 0.9 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  let loadedContent;

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

  loadedContent = (
    <Fragment>
      <section className={`header header${suffix}`}>
        <h1 className={`title title${suffix}`}>{title}</h1>
        <section className={`details detailsr${suffix}`}>
          <h2 className={`detail detail${suffix}`}>Completed: {dateString}</h2>
          <h2 className={`detail detail${suffix}`}>Project Type: {project_type}</h2>
        </section>
      </section>
      <section className={`main main${suffix}`}>
        <section className={`galleryContainer galleryContainer${suffix}`}>
          <PhotoGallery photos={photosList} />
        </section>
        <section className={`descriptionContainer descriptionContainer${suffix}`}>
          <p className={`description description${suffix}`}>{description}</p>
          <section className="buttons">
            {project_type === "Javascript" && screenWidth > 1600 && (
              <motion.a
                variants={buttonVariants}
                whileTap="tap"
                whileHover="hover"
                href={`${domainName}/api/portfolio/${slug}`}
                target="_blank"
                className="button"
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
                className="button"
              >
                Source Code
              </motion.a>
            )}
          </section>
        </section>
      </section>
    </Fragment>
  );

  return (
    <Fragment>
      <Helmet>
        <title>
          Micheal Nestor {`${slug}`} | {`${title}`}
        </title>
        <meta name="description" content={`Click to read about Micheal Nestor's ${title} project.`} />
      </Helmet>
      <section className={`projectDetailPage projectDetailPage${suffix}`}>{loadedContent}</section>
    </Fragment>
  );
};

export default ProjectDetailPage;
