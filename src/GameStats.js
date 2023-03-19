function GameStats(props) {

function getMinTime(arr) {
  if(arr.length > 0) {
    return Math.min(...arr);
  }
}

  return (
    <div className="game-stats">
      <h3>Game stats</h3>
      <p>Dice rolls: {props.count}</p>
      <p>
        Game completed in:{" "}
        {props.gameTime > 60
          ? `${Math.trunc(props.gameTime / 60)} min ${
              props.gameTime - Math.trunc(props.gameTime / 60) * 60
            } sec`
          : `${props.gameTime} sec`}
      </p>
      {props.gameTime < getMinTime(props.time) ? <p>New best time!</p> : null}
    </div>
  );
}

export default GameStats;

