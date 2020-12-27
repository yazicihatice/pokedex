import "./statchart.css";

const StatBar = (props) => {
  const calculateChunksColor = () => {
    const { barData, chunkCount } = props;

    let statValue = barData.value;
    let rate = Math.ceil((statValue * chunkCount) / barData.maxValue);
    let rowDataClassNames = [];

    for (let j = 0; j < chunkCount; j++) {
      if (j < rate) {
        rowDataClassNames[chunkCount - j] = "colored-row";
      } else {
        rowDataClassNames[chunkCount - j] = "";
      }
    }

    return rowDataClassNames;
  };

  const chunksColorInfo = calculateChunksColor();
  const { barData: { name } = {} } = props;

  return (
    <li>
      <ul className="pokemon-stats-rows-list">
        {chunksColorInfo.map((classNameForColor, i) => (
          <li key={i} className={classNameForColor}></li>
        ))}
        <span className="pokemon-stat-name">{name}</span>
      </ul>
    </li>
  );
};

export default StatBar;
