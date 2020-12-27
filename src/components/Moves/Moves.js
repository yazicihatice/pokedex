import "./moves.css";

const Moves = (props) => {
  const { movesArr = [] } = props;

  return (
    <div className="top-five-moves-wrapper">
      <div className="top-five-moves-title">Top 5 Moves</div>
      <ul className="top-five-moves-list">
        {movesArr.slice(0, 5).map((move, i) => (
          <li key={i}>{move?.move?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Moves;
