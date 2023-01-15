// hooks
import { useSelector } from "react-redux";
import { React, Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

// components
import ProjectMini from "../components/ProjectMini";
import SelectBox from "../components/SelectBox";

import data from "../siteData/portfolioPage.json";

const ProjectsPage = () => {
  // setup hooks //
  const projects = data.projectMinis;
  const screenWidth = useSelector((state) => state.ui.screenWidth);
  const [filter, setFilter] = useState("All Projects");
  const [filteredProjects, setFilteredProjects] = useState([...projects]);

  let suffix = "__desktop";
  if (screenWidth < 1250) {
    suffix = "__mobile";
  }

  // select box code //
  const options = ["All Projects"];
  projects.forEach((project) => {
    if (!options.includes(project.project_type)) {
      options.push(project.project_type);
    }
  });

  const changeFilterHandler = (option) => {
    setFilter(option);
  };

  useEffect(() => {
    if (filter !== "All Projects") {
      setFilteredProjects(projects.filter((project) => project.project_type === filter));
    } else {
      setFilteredProjects([...projects]);
    }
  }, [projects, filter]);

  console.log(projects, options);

  //sort the projects into rows of 3, and put those rows into a list
  const projectMinis = filteredProjects.map((project) => {
    return (
      <ProjectMini
        key={project.slug}
        photo={project.photo_main}
        type={project.project_type}
        slug={project.slug}
        title={project.title}
        screenWidth={screenWidth}
      />
    );
  });

  let pageClasses = `portfolioPage portfolioPage${suffix}`;
  if (projectMinis.length > 2 || screenWidth < 1550) {
    pageClasses = `portfolioPage portfolioPage${suffix} allowScroll`;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Micheal Nestor | Portfolio</title>
        <meta name="description" content="View a selection of Micheal Nestor's best projects" />
      </Helmet>
      <section className={pageClasses}>
        <h1 className={`title title${suffix}`}>Projects Portfolio</h1>
        <p className={`intro intro${suffix}`}>
          This is a short list of some of the projects I have worked on, click on a project to find out
          more!
        </p>
        <div className={`selectBox selectBox${suffix}`}>
          <p className={`selectBoxTitle selectBoxTitle${suffix}`}>Filter Projects: </p>
          <SelectBox options={options} changeHandler={changeFilterHandler} screenWidth={screenWidth} />
        </div>
        <div className="minisContainer">{projectMinis}</div>
      </section>
    </Fragment>
  );
};

export default ProjectsPage;
