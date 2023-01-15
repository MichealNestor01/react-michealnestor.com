import { React, useReducer, useEffect, useState } from "react";

const initalState = {
  imageIndex: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      if (state.imageIndex !== action.totalImages - 1) {
        return { imageIndex: state.imageIndex + 1 };
      } else {
        return { imageIndex: 0 };
      }
    case "decrement":
      if (state.imageIndex !== 0) {
        return { imageIndex: state.imageIndex - 1 };
      } else {
        return { imageIndex: action.totalImages - 1 };
      }
    case "set":
      return { imageIndex: action.index };
    default:
      return initalState;
  }
};

const PhotoGallery = ({ photos }) => {
  const [imageState, dispatch] = useReducer(reducer, initalState);
  const [indicatorDivs, setIndicatorDivs] = useState();

  //gallery setup
  const photoDivs = photos.map((photo) => {
    return <img className="image" key={photo[0]} src={photo[1]} alt={photo[0]} />;
  });

  const [currentImage, setCurrentImage] = useState(photoDivs[imageState.imageIndex]);

  const totalImages = photos.length;

  useEffect(() => {
    setCurrentImage(photoDivs[imageState.imageIndex]);
    setIndicatorDivs([]);
    let tempIndicators = [];
    for (let i = 0; i < totalImages; i++) {
      tempIndicators.push(
        <div
          key={i}
          onClick={() => dispatch({ type: "set", index: i })}
          className={imageState.imageIndex === i ? "indicator__active indicator" : "indicator"}
        />
      );
    }
    setIndicatorDivs(tempIndicators);
  }, [imageState.imageIndex, totalImages]);

  return (
    <section className="gallery">
      <div className="imageContainer">{currentImage}</div>
      <div className="controls">
        <button className="button" onClick={() => dispatch({ type: "decrement", totalImages })}>
          {"<"}
        </button>
        <div className="indicators">{indicatorDivs}</div>
        <button className="button" onClick={() => dispatch({ type: "increment", totalImages })}>
          {">"}
        </button>
      </div>
    </section>
  );
};
export default PhotoGallery;
