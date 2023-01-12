// hooks
import { useSelector } from "react-redux";
import { React, Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

// components
import SelectBox from "../components/SelectBox";
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
  const screenWidth = useSelector((state) => state.ui.screenWidth);
  const [suffix, setSuffix] = useState("__desktop");

  //===RESPONSIVENESS===//
  // code for dealing with screen size changes
  let aboutPageClasses = `aboutPage aboutPage__desktop`;
  useEffect(() => {
    if (screenWidth < 1250) {
      setSuffix("__mobile");
      aboutPageClasses = `aboutPage aboutPage__mobile allowScroll`;
    } else {
      setSuffix("__desktop");
      aboutPageClasses = `aboutPage aboutPage__desktop`;
    }
  }, [screenWidth]);

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
      <section className={aboutPageClasses}>
        <div className={`content content${suffix}`}>
          <div className="box1 box">
            <section className={`title  title${suffix}`}>
              <h1>About Me</h1>
              <div className={`socials socials${suffix}`}>
                <Socials />
              </div>
            </section>
            <p className={`description description${suffix}`}>{aboutData}</p>
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
