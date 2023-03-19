import { useState, useEffect } from "react";
import Die from "./Die";
import GameStats from "./GameStats";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);
  const [diceRolls, setDiceRolls] = useState(JSON.parse(localStorage.getItem("diceRolls")) || []);
  const [gameTime, setGameTime] = useState(Date.now());
  const [time, setTime] = useState(JSON.parse(localStorage.getItem("time")) || []);

  useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every((die) => die.isHeld === true);
    const equalValues = dice.every(
      (die) => die.value.length === firstValue.length
    );

    if (allHeld && equalValues) {
      setTenzies(true);
      setGameTime((prevGameTime) => Math.trunc((Date.now() - prevGameTime) / 1000));
    }
  }, [dice]);

  useEffect(() => {
    localStorage.setItem("diceRolls", JSON.stringify(diceRolls));
    localStorage.setItem("time", JSON.stringify(time));
  }, [diceRolls, time]);

  function randomDieValue() {
    let dots = [];
    for (let i = 0; i < Math.ceil(Math.random() * 6); i++) {
      dots.push("•");
    }
    return dots;
  }

  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        id: nanoid(),
        value: randomDieValue(),
        isHeld: false,
      });
    }
    return diceArray;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : { id: nanoid(), value: randomDieValue(), isHeld: false };
      })
    );

    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      setCount(0);
      setDiceRolls((prevRolls) => [...prevRolls, count]);
      setGameTime(Date.now());
      setTime(prevTime => [gameTime, ...prevTime]);
    } else {
      setCount((prevCount) => prevCount + 1);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  console.log(time);
  return (
    <div className="container">
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {tenzies ? (
        <div>
          <Confetti 
            width={window.innerWidth}
            height={window.innerHeight}
          />
          <GameStats
            count={count}
            diceRolls={diceRolls}
            gameTime={gameTime}
            time={time}
          />
        </div>
      ) : (
        <div className="die-container">
          {dice.map((die) => (
            <Die
              key={die.id}
              value={die.value}
              isHeld={die.isHeld}
              holdDice={() => holdDice(die.id)}
            />
          ))}
        </div>
      )}
      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? "New game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
