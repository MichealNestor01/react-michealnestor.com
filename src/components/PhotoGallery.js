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

// I recognise that this code is a bit ugly, however it allows me to dynamically
// load images stored locally, so it is staying.
/*
const images = (photos) => {
  const photoDivs = photos.map((photo, index) => {
    return useImage(photo[1]);
  });
  return photoDivs;
};
*/
const PhotoGallery = ({ photos }) => {
  const [imageState, dispatch] = useReducer(reducer, initalState);
  const [indicatorDivs, setIndicatorDivs] = useState();

  //gallery setup
  const photoDivs = photos.map((photo, index) => {
    return <img className="gallery__image" key={photo[0]} src={photo[1]} alt={photo[0]} />;
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
          className={
            imageState.imageIndex === i
              ? "gallery__indicator__active gallery__indicator"
              : "gallery__indicator"
          }
        />
      );
    }
    setIndicatorDivs(tempIndicators);
  }, [imageState.imageIndex, totalImages]);

  return (
    <section className="gallery">
      <div className="gallery__imageContainer">{currentImage}</div>
      <div className="gallery__controls">
        <button className="gallery__button" onClick={() => dispatch({ type: "decrement", totalImages })}>
          {"<"}
        </button>
        <div className="gallery__indicatorsWrapper">{indicatorDivs}</div>
        <button className="gallery__button" onClick={() => dispatch({ type: "increment", totalImages })}>
          {">"}
        </button>
      </div>
    </section>
  );
};
export default PhotoGallery;
