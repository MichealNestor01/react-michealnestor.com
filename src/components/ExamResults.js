// hooks
import { useSelector } from "react-redux";
import { React, Fragment, useEffect, useState } from "react";

// components
import SelectBox from "../components/SelectBox";

const ExamResults = ({ results, suffix }) => {
  // hook setup
  const screenWidth = useSelector((state) => state.ui.screenWidth);
  const [gradeTypes, setGradeTypes] = useState([]);
  const [showExam, setShowExam] = useState("A-Level");

  // Get a list of the different exam types
  useEffect(() => {
    results.forEach((grade) => {
      console.log(grade);
      if (!gradeTypes.includes(grade.exam_type)) {
        setGradeTypes([...gradeTypes, grade.exam_type]);
      }
    });
    setShowExam(gradeTypes[0]);
  }, [results, gradeTypes]);

  // create divs for the results the user wants to see
  const tableRows = results
    .filter((exam) => {
      if (exam.exam_type === showExam) {
        return exam;
      }
    })
    .map((exam, index) => {
      return (
        <tr key={index}>
          <td>{exam.title}</td>
          <td>{exam.grade}</td>
        </tr>
      );
    });

  const changeFilterHandler = (option) => {
    setShowExam(option);
  };

  return (
    <Fragment>
      <div className={`selectBox selectBox${suffix}`}>
        <p className="selectBoxTitle">Filter Results: </p>
        <SelectBox options={gradeTypes} changeHandler={changeFilterHandler} screenWidth={screenWidth} />
      </div>
      <div className="examWrapper">
        <table className="examTable">
          <tbody>
            <tr>
              <td className="examTitle">Subject</td>
              <td className="examTitle">Grade Achieved</td>
            </tr>
            {tableRows}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ExamResults;
