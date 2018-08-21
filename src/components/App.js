import "./App.css";
import logo from "../logo.svg";
import React, { Component } from "react";
import BowlingGame from "../bowlingGame";

const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">React Bowling</h1>
  </header>
);

const Frame = ({ frameNumber, leftBox, rightBox, extraBox, score }) => (
  <div className="frame">
    <div className="frame-number">{frameNumber}</div>
    <div className="frame-score">
      <div className="box left">{leftBox}</div>
      <div className="box right">{rightBox}</div>
      <div className="box extra">{extraBox}</div>
    </div>
    <div className="running-score">{!isNaN(score) && score}</div>
  </div>
);

const Controls = ({ handleRoll, handleReset, pinsUp }) => (
  <div className="controls">
    <div className="controls-left">
      {[...Array(pinsUp + 1)].map((o, i) => (
        <button key={i} className="roll" onClick={() => handleRoll(i)}>
          {i}
        </button>
      ))}
    </div>
    <div className="controls-right">
      <div className="roll reset" onClick={() => handleReset()}>
        Reset Game {pinsUp}
      </div>
    </div>
  </div>
);

class ScoreBoard extends Component {
  constructor() {
    super();
    this.game = BowlingGame.create();
    this.state = {
      score: this.game.score()
    };
  }

  roll = pins => {
    this.game.roll(pins);
    this.setState({ score: this.game.score() });
  };

  reset = () => {
    this.game.reset();
    this.setState({ score: this.game.score() });
  };

  pinsUp = () => this.game.pinsUp();

  render() {
    const { score } = this.state;

    return (
      <div>
        <Controls handleRoll={this.roll} handleReset={this.reset} pinsUp={this.pinsUp()} />

        <div className="player-name">Frank</div>

        <div className="score-board">
          {[...Array(10)].map((o, i) => (
            <Frame
              key={i}
              frameNumber={i + 1}
              leftBox={score[i].leftBox}
              rightBox={score[i].rightBox}
              extraBox={score[i].extraBox}
              score={score[i].cumulativeScore}
            />
          ))}
        </div>
      </div>
    );
  }
}

const App = () => (
  <div className="App">
    <Header />
    <ScoreBoard />
  </div>
);

export default App;
