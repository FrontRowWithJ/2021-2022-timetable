import "../css/menu-item.css";

const MenuItem = ({ text, onclick }) => {
  return (
    <div className="menu-item">
      <button type="button" onClick={onclick}>
        {text}
      </button>
      <div className="bg-div" style={{ backgroundColor: "#585ce4" }}></div>
      <div className="bg-div" style={{ backgroundColor: "#585ce4" }}></div>
    </div>
  );
};

export default MenuItem;

