// hooks
import { React, Fragment, useState } from "react";
import { Helmet } from "react-helmet";

// components
import Socials from "../components/Socials";
import ExamResults from "../components/ExamResults";

// about page data:
import data from "../siteData/aboutPage.json";

const AboutPage = () => {
  // hook setup
  const gradeData = data.examData;
  const skillsData = data.skillsData;
  const aboutData = data.paragraph;
  const achievementsData = data.achievements;
  const [suffix, setSuffix] = useState("__desktop");

  // simple handler for when the user changes the filter

  const skillsContent = (
    <ul key="skills-content" className="skillsContainer">
      {skillsData.map((skill, index) => {
        return <li key={`skill-${index}`}>{skill.skill}</li>;
      })}
    </ul>
  );

  const achievementContent = achievementsData.map((achievement, index) => {
    return (
      <Fragment>
        <h2 className="achievementTitle" key={`${index}-title`}>
          {achievement.title}:
        </h2>
        <p className="achievementDesc" key={`${index}-desc`}>
          {achievement.description}
        </p>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <Helmet>
        <title>Micheal Nestor | About</title>
        <meta
          name="description"
          content="Micheal Nestor is an experienced software engineer and private tutor"
        />
      </Helmet>
      <section className="aboutPage">
        <div className="content">
          <div className="box1 box">
            <section className="title">
              <h1>About Me</h1>
              <div className="socials">
                <Socials />
              </div>
            </section>
            <p className="description">{aboutData}</p>
          </div>
          <div className="box2 box">
            <h1>My Key Skills</h1>
            {skillsContent}
          </div>
          <div className="box3 box">
            <h1>Exam Results</h1>
            <ExamResults results={gradeData} suffix={suffix} />
          </div>
          <div className="box4 box">
            <h1>Achievements</h1>
            {achievementContent}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutPage;
