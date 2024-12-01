import "./App.css";
import * as React from "react";
import data from "./data/data.json";
import genreData from "./data/genres.json";
import { Autocomplete, TextField } from "@mui/material";

function App() {
  const games = data.solutions;
  const allGenres = genreData;
  var options = [];
  const rand = React.useState(
    Math.floor(Math.random() * data.solutions.length)
  );
  const randomGame = games[rand[0]];
  const randGenres = randomGame.genre.toString().split(",");
  const inputRef = React.createRef();
  const answerRef = React.createRef();
  const eree = React.createRef();

  for (var i = 0; i < games.length; i++) {
    var option = games[i].game;
    options.push(option);
  }

  const [guesses, setGuesses] = React.useState([]); // each guess is an array
  const [colors, setColors] = React.useState([]); // each guess has its color values evaluated and stored as array
  const [arrows, setArrows] = React.useState([]); //each guess can have an arrow attached for comparisons

  //genres button
  function showGenres(e) {
    if (eree.current.hidden === false) {
      eree.current.hidden = true;
    } else {
      eree.current.hidden = false;
    }
  }
  //submission handling
  function onSubmit(e) {
    e.preventDefault();

    const value = inputRef.current.value;
    for (i = 0; i < games.length; i++) {
      if (value == games[i].game) {
        var gameObject = games[i];
        var genres = games[i].genre.split(",");
        var colorValues = [];
        var images = [];
        var boxchamp;
        var filePath;
        console.log(gameObject);
        console.log(genres);
      }
    }

    //if blank
    if (value === "") {
      return;
    }

    //if redone
    for (var i = 0; i < guesses.length; i++) {
      if (value == guesses[i].game) {
        alert("You already tried that one dumbass!!!");
        return;
      }
    }
    //color processing
    Object.keys(gameObject).forEach((key) => {
      //correct
      if (!isNaN(gameObject[key]) && gameObject[key] > randomGame[key]) {
        console.log("Too high!");
        boxchamp = "purple";
        colorValues.push(boxchamp);
        filePath = "url('https://i.imgur.com/2mVSBqP.png')";
        images.push(filePath);
      } 
      //too low
      else if (!isNaN(gameObject[key]) && gameObject[key] < randomGame[key]) {
        console.log("Too low!");
        boxchamp = "purple";
        colorValues.push(boxchamp);
        filePath = "url('https://i.imgur.com/G1yMQ35.png')";
        images.push(filePath);
      } //a genre matches, but not all 
      else if (
        gameObject.genre == gameObject[key] &&
        genres.some((r) => randGenres.includes(r))
      ) {
        if (gameObject[key] == randomGame[key]) {
          console.log("huh?");
          boxchamp = "green";
          colorValues.push(boxchamp);
          filePath = "none";
          images.push(filePath);
          //too high
        }
        console.log(genres + " " + randGenres);
        boxchamp = "purple";
        colorValues.push(boxchamp);
      } 
      else if (gameObject[key] == randomGame[key]) {
        console.log("huh?");
        boxchamp = "green";
        colorValues.push(boxchamp);
        filePath = "none";
        images.push(filePath);
        //too high
      }
      else {
        console.log("nope!");
        boxchamp = "grey";
        colorValues.push(boxchamp);
        filePath = "none";
        images.push(filePath);
      }
      console.log(key + gameObject[key] + randomGame[key]);
    });

    //if correct
    if (value == randomGame.game) {
      alert("holy crap!! 😻");
      answerRef.current.hidden = false;
      colorValues = [
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
      ];
      images = ["none", "none", "none", "none", "none", "none", "none", "none"];
    }

    //if guesses used up

    //update state
    setColors((prev) => {
      return [...prev, colorValues];
    });
    setGuesses((prev) => {
      inputRef.current.value = "";
      return [...prev, gameObject];
    });
    setArrows((prev) => {
      return [...prev, images];
    });
    console.log(colors);
    console.log(arrows);

    if (guesses.length >= 5) {
      alert("sorry bro... you struck out this time... 🙀");
      answerRef.current.hidden = false;
      return;
    }
  }

  //rendering
  return (
    <div className="App">
      <nav>
        <h1>Clubdle 😼</h1>
      </nav>

      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="search">
          <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                inputRef={inputRef}
                {...params}
                id="words"
                label="🔎 Choose a game..."
              />
            )}
          />
        </div>
        <input value="Guess" type="submit" />
      </form>
      <div className="grid">
        <div className="row" id="topbar">
          <div className="box legend">Game Name</div>
          <div className="box legend"> Season</div>
          <div className="box legend">Genre </div>
          <div className="box legend">Year of Release</div>
          <div className="box legend"> Developer</div>
          <div className="box legend">Country of Origin</div>
          <div className="box legend">Average Clubber Score</div>
        </div>
        {guesses.map((guess) => (
          <div className="row">
            <div
              className="box"
              style={{ backgroundColor: colors[guesses.indexOf(guess)][1] }}
            >
              {guess.game}
            </div>
            <div
              className="box"
              style={{
                backgroundColor: colors[guesses.indexOf(guess)][6],
                backgroundImage: arrows[guesses.indexOf(guess)][6],
              }}
            >
              {guess.season}
            </div>
            <div
              className="box"
              style={{ backgroundColor: colors[guesses.indexOf(guess)][7] }}
            >
              {guess.genre}
            </div>
            <div
              className="box"
              style={{
                backgroundColor: colors[guesses.indexOf(guess)][4],
                backgroundImage: arrows[guesses.indexOf(guess)][4],
              }}
            >
              {guess.year}
            </div>
            <div
              className="box"
              style={{ backgroundColor: colors[guesses.indexOf(guess)][3] }}
            >
              {guess.dev}
            </div>
            <div
              className="box"
              style={{ backgroundColor: colors[guesses.indexOf(guess)][2] }}
            >
              {guess.country}
            </div>
            <div
              className="box"
              style={{
                backgroundColor: colors[guesses.indexOf(guess)][5],
                backgroundImage: arrows[guesses.indexOf(guess)][5],
              }}
            >
              {guess.score}
            </div>
          </div>
        ))}
      </div>
      <hr />
      <p>I'm thinking of a mystery club game.</p>
      <b> Are you a bad enough dude to Club this Dle?</b>
      <p>
        You know the drill. Green squares fully match the mystery game. 
        Purple squares are
        partially correct (Up Arrows means the mystery game's value is higher in that field, down arrows=lower). Grey squares are fully incorrect.{" "}
      </p>
      <p>You have six guesses. Good luck!</p>
      <b ref={answerRef} hidden={true}>
        It was {randomGame.game}!! 
      </b>
      <br></br>
      <button id="possible" onClick={showGenres}>
        Possible genres:
      </button>
      <div id="genres" hidden="true" ref={eree}>
        {allGenres.map((entity) => (
          <jeff>{entity}</jeff>
        ))}
      </div>
    </div>
  );
}
/*
need to track:
- solution 
  - (selected item in array)
- guesses
  - array of previous guesses
  - each guess has its parameters displayed [{},{},{etc}]
  - each parameter has its correctness evaluated and displayed {genre:'action', color:'yellow'}
- current guess
  - "Mega Man X", etc
- turn number - shows how many rows need to be generated [integer]

game logic:
- user enters a game {autofill field}
- when user hits enter/submit with a valid game it submits the word
 - if not valid or empty, submit should do nothing/prompt the user
 - if game is in prev guesses array, submit should prompt the user
- each field is checked for match to the solution
- each field assigned a color based on correctness
  - match is green, partial match yellow, older/newer has up arrow/alternate coloring style, no match is gray
- guess added to grid with those colors

-  game ends when guess matches solution (popup for "good job!")
- or when no more guesses remain (popup for "how???")

*/
export default App;
