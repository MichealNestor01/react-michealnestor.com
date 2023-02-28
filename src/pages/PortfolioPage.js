// hooks
import { useSelector } from "react-redux";
import { React, Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

// components
import ProjectMini from "../components/ProjectMini";
import SelectBox from "../components/SelectBox";

// site data
import data from "../siteData/portfolioPage.json";

const ProjectsPage = () => {
  // setup hooks
  const projects = data.projectMinis;
  const screenWidth = useSelector((state) => state.ui.screenWidth);
  const [filter, setFilter] = useState("All Projects");
  const [filteredProjects, setFilteredProjects] = useState([...projects]);

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

  //sort the projects into a list of components
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

  return (
    <Fragment>
      <Helmet>
        <title>Micheal Nestor | Portfolio</title>
        <meta name="description" content="View a selection of Micheal Nestor's best projects" />
      </Helmet>
      <section className="portfolioPage allowScroll">
        <h1 className="title">Projects Portfolio</h1>
        <p className="intro">
          This is a short list of some of the projects I have worked on, click on a project to find out
          more!
        </p>
        <div className="selectBoxContainer">
          <p className="selectBoxTitle">Filter Projects: </p>
          <SelectBox options={options} changeHandler={changeFilterHandler} />
        </div>
        <div className="minisContainer">{projectMinis}</div>
      </section>
    </Fragment>
  );
};

export default ProjectsPage;
