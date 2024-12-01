import React, { useState, useEffect } from "react";
import useLogic from "./useLogic";
import gameData from "../src/data/data.json";
import App from "../src/App";


function GameBoard({ solution }) {
  function drawBox(container, row, col, content) {
    const box = document.createElement("div");
    box.className = "box";
    box.id = `box${row}${col}`;
    box.textContent = content;

    container.appendChild(box);
    return box;
  }

  function drawGrid(container) {
    const grid = document.createElement("div");
    grid.className = "grid";

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        drawBox(grid, i, j);
      }
    }

    container.appendChild(grid);
  }

  function updateGrid() {
    for (let i = 0; i < App.state.grid.length; i++) {
      for (let j = 0; j < App.state.grid[i].length; j++) {
        const box = document.getElementById(`box${i}${j}`);
        box.textContent = App.state.grid[i][j];
      }
    }
  }

}

export default GameBoard;
