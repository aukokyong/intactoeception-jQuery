const gameState = {
  currentPlayer: "O",
  gameGrid: [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
  ],

  gameGridMain: ["", "", "", "", "", "", "", "", ""],
  gameGridMainAllow: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  winningCombination: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
};

const setup = () => {
  console.log("Setup Complete.");
};

// click on cell
// check if cell is empty, place marker on grid if empty
// check if 3 in a row, if yes => win smaller grid
// control next player's move
// next player's turn

const onClickCell = () => {
  $(".subCell").on("click", (event) => {
    let cell = $(event.target);
    let mainCellPos = cell.attr("data-mainCell");
    let subCellPos = cell.attr("data-subCell");

    let isMainCellEmpty = gameState.gameGridMain[mainCellPos];
    let isSubCellEmpty = gameState.gameGrid[mainCellPos][subCellPos];
    let allowableCell = gameState.gameGridMainAllow[mainCellPos];

    if (
      isMainCellEmpty === "" &&
      isSubCellEmpty === "" &&
      allowableCell === "-"
    ) {
      console.log("CELL CLICKED");
      gameState.gameGrid[mainCellPos][subCellPos] = gameState.currentPlayer; // Update marking to array
      checkIfSubCellWon(mainCellPos);
      nextAvaliableMove(subCellPos);
      nextPlayerTurn();
    }

    // if (gameState.gameGrid[mainCellPos][subCellPos] === "") {
    //   gameState.gameGrid[mainCellPos][subCellPos] = gameState.currentPlayer;
    //   console.log(gameState.gameGrid);
    //   nextPlayerTurn();
    // }

    checkIfMainCellWon();
    render();
  });
};

const nextAvaliableMove = (subCellPos) => {
  gameState.gameGridMainAllow = ["", "", "", "", "", "", "", "", ""];
  gameState.gameGridMainAllow[subCellPos] = "-";

  if (
    gameState.gameGridMain[subCellPos] !== "" &&
    gameState.gameGridMainAllow[subCellPos] === "-"
  ) {
    for (i = 0; i < 9; i++) {
      if (gameState.gameGridMain[i] === "") {
        gameState.gameGridMainAllow[i] = "-";
      } else {
        gameState.gameGridMainAllow[i] = "NA";
      }
    }
  }
};

const checkIfSubCellWon = (mainCellPos) => {
  console.log("CHECKING IF PLAYER WIN SUBCELL...");
  let winCombList = gameState.winningCombination;
  for (let i = 0; i < gameState.winningCombination.length; i++) {
    let a = gameState.gameGrid[mainCellPos][winCombList[i][0]];
    let b = gameState.gameGrid[mainCellPos][winCombList[i][1]];
    let c = gameState.gameGrid[mainCellPos][winCombList[i][2]];

    if (a === "" || b === "" || c === "") {
      console.log("NONE");
      continue;
    }
    if (a === b && b === c) {
      gameState.gameGridMain[mainCellPos] = gameState.currentPlayer;
      console.log("WON SUBCELL");
    }
  }
};

const checkIfMainCellWon = () => {
  console.log("CHECKING IF PLAYER WIN MAIN CELL...");
  let winCombList = gameState.winningCombination;
  for (let i = 0; i < gameState.winningCombination.length; i++) {
    let a = gameState.gameGridMain[winCombList[i][0]];
    let b = gameState.gameGridMain[winCombList[i][1]];
    let c = gameState.gameGridMain[winCombList[i][2]];

    if (a === "" || b === "" || c === "") {
      console.log("NONE");
      continue;
    }
    if (a === b && b === c) {
      console.log("ULTIMATE WINNER!");
    }
  }
};

const nextPlayerTurn = () => {
  if (gameState.currentPlayer === "O") {
    gameState.currentPlayer = "X";
  } else {
    gameState.currentPlayer = "O";
  }
  $(".message").text(gameState.currentPlayer + "'s turn to play.");
};

const render = () => {
  updateGrid();
  console.log("");
  console.log("NEXT ALLOWABLE MOVE");
  console.log(gameState.gameGridMainAllow);
  console.log("");
  console.log("CURRENT GAME STATUS");
  console.log(gameState.gameGridMain);
  console.log("");
  console.log("Rendered");
};

const updateGrid = () => {
  for (let i = 0, k = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      $(".subCell").eq(k).text(gameState.gameGrid[i][j]);
      k++;
    }
  }
};

const resetGame = () => {
  $(".restartBtn").on("click", () => {
    gameState.currentPlayer = "O";
    gameState.gameGrid = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];

    gameState.gameGridMain = ["", "", "", "", "", "", "", "", ""];
    gameState.gameGridMainAllow = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

    $(".subCell").text("");
    console.log("Restart!");
    console.log(gameState);
  });
};

$(() => {
  setup();
  onClickCell();
  render();
  resetGame();
});

// add in start button
// add in timer feature??
// add in counter for no. of moves??
