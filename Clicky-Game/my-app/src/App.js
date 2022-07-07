import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import flags from "./cards.json";
import "./App.css";

class App extends Component {
  state = {
    flags,
    clickedFlagIds: [],
    score: 0,
    goal: 12,
    status: ""
  };


  shuffleScoreCard = id => {
    let clickedFlagIds = this.state.clickedFlagIds;

    if (clickedFlagIds.includes(id)) {
      this.setState({ clickedFlagIds: [], score: 0, status: "Game Over! Try Again!!" });
      return;
    } else {
      clickedFlagIds.push(id)

      if (clickedFlagIds.length === 12) {
        this.setState({ score: 12, status: "You Won! Play Again!", clickedFlagIds: [] });
        console.log('You Win');
        return;
      }

      this.setState({ flags, clickedFlagIds, score: clickedFlagIds.length, status: " " });

      for (let i = flags.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [flags[i], flags[j]] = [flags[j], flags[i]];
      }
    }
  }


  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <h1 className="App-title">World Flag Clicky-Game</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
          goal={12}
          status={this.state.status}
        />
        <Wrapper>
          {this.state.flags.map(flag => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={flag.id}
              key={flag.id}
              image={flag.image}
            />
          ))}
        </Wrapper>
        <footer>
          <h3 class="white-text">Link</h3>
          <a class="grey-text text-lighten-3" id='link' target='_blank' href="https://github.com/Avickerman/Clicky-Game">My GitHub Repo</a>
        </footer>
      </div>
    );
  }
}

export default App;