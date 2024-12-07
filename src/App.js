import "./App.css";
import * as React from "react";
import data from "./data/data.json";
import genreData from "./data/genres.json";
import dateData from "./data/dates.json";
import ReactDOMServer from 'react-dom/server'
import {
  Autocomplete,
  createFilterOptions,
  TextField,
  Modal,
  Typography,
} from "@mui/material";

function App() {
  const date = new Date();
  var randomDate = -1;
  let currentDate = `${date.getDay() + 1}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  let todayText = `${date.toLocaleString("default", { month: "short" })} ${
    date.getDay() + 1
  }, ${date.getFullYear()}`;
  const games = data.solutions;
  const allGenres = genreData;
  var options = [];
  const rand = React.useState(
    Math.floor(Math.random() * data.solutions.length)
  );
  randomDate = rand[0];
  //console.log(data.solutions.length + "" + dateData.length);
  for (var i = 0; i < dateData.length - 2; i++) {
    if (dateData[i].date === currentDate) {
      randomDate = i;
    }
  }

  //const randomGame = games[rand[0]];
  const day = 1;
  const randomGame = games[randomDate];
  const randGenres = randomGame.genre
    .toString()
    .split(",")
    .map((item) => item.trim());

  //create Refs
  const inputRef = React.createRef();
  const answerRef = React.createRef();
  const eree = React.createRef();
  const modalRef = React.createRef();
  const resultsRef = React.createRef();

  //populate search field
  for (var i = 0; i < games.length; i++) {
    var option = games[i].game;
    options.push(option);
  }

  const [guesses, setGuesses] = React.useState([]); // each guess is an array
  const [colors, setColors] = React.useState([]); // each guess has its color values evaluated and stored as array
  const [arrows, setArrows] = React.useState([]); //each guess can have an arrow attached for comparisons
  const [squares, setSquares] = React.useState([]); //copypaste graphic for accuracy

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function printResults(){
    var gaming = (<div id="copy" ref={resultsRef}>
      <b>
        Clubdle ({todayText}) {guesses.length}/6
      </b>
      {squares.map((squess) => (
        <div id="resultRow">
          <pre>
            {squess[1]} {squess[6]} {squess[7]} {squess[4]} {squess[3]}{" "}
            {squess[2]} {squess[5]}
          </pre>
        </div>
      ))}
      <p>https://wadenoble.github.io/clubdle/</p>
    </div>);
    //console.log(ReactDOMServer.renderToString(gaming));
    return gaming;
    
  }
function copyResults(text){
  navigator.clipboard.writeText(text).then(() => {alert("copied!");}).catch(() => {alert("Something went wrong. Soz")});
}
  //genres button
  function showGenres() {
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
    for (var i = 0; i < games.length; i++) {
      if (value == games[i].game) {
        var gameObject = games[i];
        var genres = games[i].genre.split(",").map((item) => item.trim());

        var colorValues = [];
        var images = [];
        var colorBoxes = [];

        var boxchamp;
        var emoji;
        var filePath;
        var done = false;
      }
    }

    //if blank
    if (value === "") {
      return;
    }

    //if redone
    for (var i = 0; i < guesses.length; i++) {
      if (value == guesses[i].game) {
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
        emoji = "🟪";
        colorBoxes.push(emoji);
        filePath = "url('https://i.imgur.com/2mVSBqP.png')";
        images.push(filePath);
      }
      //too low
      else if (!isNaN(gameObject[key]) && gameObject[key] < randomGame[key]) {
        console.log("Too low!");
        boxchamp = "purple";
        colorValues.push(boxchamp);
        emoji = "🟪";
        colorBoxes.push(emoji);
        filePath = "url('https://i.imgur.com/G1yMQ35.png')";
        images.push(filePath);
      } //a genre matches, but not all
      else if (
        gameObject.genre == gameObject[key] &&
        randGenres.some((r) => genres.includes(r))
      ) {
        if (gameObject[key] == randomGame[key]) {
          //console.log("genre?");
          boxchamp = "green";
          colorValues.push(boxchamp);
          emoji = "🟩";
          colorBoxes.push(emoji);
          filePath = "none";
          images.push(filePath);
          //not full genre match
        } else {
          boxchamp = "purple";
          colorValues.push(boxchamp);
          emoji = "🟪";
          colorBoxes.push(emoji);
        }
      } else if (gameObject[key] == randomGame[key]) {
        console.log("huh?");
        boxchamp = "green";
        colorValues.push(boxchamp);
        emoji = "🟩";
        colorBoxes.push(emoji);
        filePath = "none";
        images.push(filePath);
      } else {
        console.log("nope!");
        boxchamp = "grey";
        colorValues.push(boxchamp);
        emoji = "🟫";
        colorBoxes.push(emoji);
        filePath = "none";
        images.push(filePath);
      }
      //console.log(key + gameObject[key] + randomGame[key]);
    });

    //if correct
    if (value == randomGame.game) {
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
      colorBoxes = ["🟩", "🟩", "🟩", "🟩", "🟩", "🟩", "🟩", "🟩"];
      images = ["none", "none", "none", "none", "none", "none", "none", "none"];
      modalRef.current.hidden = false;
      done = true;
    }
    //if guesses used up
    if (guesses.length > 5 || open) {
      alert("never lucky...");
      answerRef.current.hidden = false;
      modalRef.current.hidden = false;
      return;
    }
    //update state
    setColors((prev) => {
      return [...prev, colorValues];
    });
    setSquares((prev) => {
      return [...prev, colorBoxes];
    });
    setGuesses((prev) => {
      inputRef.current.value = "";
      return [...prev, gameObject];
    });
    setArrows((prev) => {
      return [...prev, images];
    });
    setOpen(() => {
      return done;
    });
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
            //filterOptions={createFilterOptions({limit:10})}
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
      <div className="info">
        <p>I'm thinking of a mystery club game.</p>
        <b> Are you a bad enough dude to Club this dle?</b>
        <p>
          <green>Green</green> squares fully match the mystery game.
          <purple> Purple </purple>squares are partially correct (An up arrow
          means the <b>mystery game's</b> value is higher in that field. A down
          arrow means the mystery game's value is lower). <gray>Grey</gray>{" "}
          squares are fully incorrect.{" "}
        </p>
        <p>You have six guesses. Good luck!</p>
        <p>
          (This is the daily puzzle for <green>{todayText}</green>)
        </p>
        <b id="answer" ref={answerRef} hidden={true}>
          GGs!!
        </b>
      </div>
      <button id="results" hidden="true" ref={modalRef} onClick={handleOpen}>
        Results
      </button>
      <div className="modal">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-content">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Holy crap 😻!! It was {randomGame.game}!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              And it only took you {guesses.length} guesses!
            </Typography>
            <hr></hr>
            <p>Share your results with the squad:</p>
            {printResults()}
            <button id="gittem" hidden="true" onClick={copyResults.bind(null,printResults())}>Copy to clipboard</button>
          </div>
        </Modal>
      </div>

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
