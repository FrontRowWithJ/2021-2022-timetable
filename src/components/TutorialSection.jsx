import "../css/tutorial-section.css";

const TutorialSection = ({ alt, src, children, noImage, step, style }) => {
  return (
    <div className="tutorial-section-container">
      {!noImage && (
        <div className="tutorial-img-container">
          <img alt={alt} src={src} />
        </div>
      )}
      <div className="tutorial-text-container" style={style ? style : {}}>
        <div className="step">{step}</div>
        {children}
      </div>
    </div>
  );
};

export default TutorialSection;
