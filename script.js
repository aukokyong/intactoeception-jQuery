// click on cell
// check if cell is empty, place marker on grid if empty, else no effect
// check if 3 in a line, if yes => win smaller grid
// check if 3 in a line, if yes => win main grid,
// control next player's move
// next player's turn
//
//
// Other features?
//

const gameState = {
  currentPlayer: "O",
  playerColor: "Red",
  gameSubGrid: [
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

  gameMainGrid: ["", "", "", "", "", "", "", "", ""],
  gameGridAllow: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
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

const onClickCell = () => {
  $(".subCell").on("click", (event) => {
    let cell = $(event.target);
    let mainCellPos = cell.attr("data-mainCell");
    let subCellPos = cell.attr("data-subCell");

    let isMainCellEmpty = gameState.gameMainGrid[mainCellPos];
    let isSubCellEmpty = gameState.gameSubGrid[mainCellPos][subCellPos];
    let allowableCell = gameState.gameGridAllow[mainCellPos];

    if (
      isMainCellEmpty === "" &&
      isSubCellEmpty === "" &&
      allowableCell === "-"
    ) {
      console.log("CELL CLICKED");
      gameState.gameSubGrid[mainCellPos][subCellPos] = gameState.currentPlayer; // Update marking to array

      checkIfSubCellWon(mainCellPos);
      nextAvaliableMove(subCellPos);
      nextPlayerTurn();
    }

    checkIfMainCellWon();
    nextAvaliableMoveColor();
    checkIfSubCellWonColor();
    render();
  });
};

const nextAvaliableMove = (subCellPos) => {
  gameState.gameGridAllow = ["", "", "", "", "", "", "", "", ""];
  gameState.gameGridAllow[subCellPos] = "-";

  if (
    gameState.gameMainGrid[subCellPos] !== "" &&
    gameState.gameGridAllow[subCellPos] === "-"
  ) {
    for (i = 0; i < 9; i++) {
      if (gameState.gameMainGrid[i] === "") {
        gameState.gameGridAllow[i] = "-";
      } else {
        gameState.gameGridAllow[i] = "NA";
      }
    }
  }
};

const nextAvaliableMoveColor = () => {
  $(".mainCell").css({ "background-color": "transparent " });
  for (let i = 0; i < 9; i++) {
    if (gameState.gameGridAllow[i] === "-") {
      $(".mainCell").eq(i).css({ "background-color": "yellow" });
    }
  }
};

const checkIfSubCellWon = (mainCellPos) => {
  console.log("CHECKING IF PLAYER WIN SUBCELL...");
  let winCombList = gameState.winningCombination;
  for (let i = 0; i < gameState.winningCombination.length; i++) {
    let a = gameState.gameSubGrid[mainCellPos][winCombList[i][0]];
    let b = gameState.gameSubGrid[mainCellPos][winCombList[i][1]];
    let c = gameState.gameSubGrid[mainCellPos][winCombList[i][2]];

    if (a === "" || b === "" || c === "") {
      // console.log("NONE");
      continue;
    }
    if (a === b && b === c) {
      gameState.gameMainGrid[mainCellPos] = gameState.currentPlayer;
      // console.log("WON SUBCELL");
    }
  }
};

const checkIfMainCellWon = () => {
  console.log("CHECKING IF PLAYER WIN MAIN CELL...");
  let winCombList = gameState.winningCombination;
  for (let i = 0; i < gameState.winningCombination.length; i++) {
    let a = gameState.gameMainGrid[winCombList[i][0]];
    let b = gameState.gameMainGrid[winCombList[i][1]];
    let c = gameState.gameMainGrid[winCombList[i][2]];

    if (a === "" || b === "" || c === "") {
      // console.log("NONE");
      continue;
    }
    if (a === b && b === c) {
      gameState.gameGridAllow = ["", "", "", "", "", "", "", "", ""];
      if (gameState.playerColor === "Red") {
        $(".message").text("Player Blue Won!");
      } else {
        $(".message").text("Player Red Won!");
      }
    }
  }
};

const checkIfSubCellWonColor = () => {
  for (let i = 0; i < 9; i++) {
    if (gameState.gameMainGrid[i] === "X") {
      $(".mainCell").eq(i).css({ "background-color": "lightskyblue" });
    } else if (gameState.gameMainGrid[i] === "O") {
      $(".mainCell").eq(i).css({ "background-color": "lightcoral" });
    }
  }
};

const nextPlayerTurn = () => {
  if (gameState.currentPlayer === "O") {
    gameState.currentPlayer = "X";
    gameState.playerColor = "Blue";
  } else {
    gameState.currentPlayer = "O";
    gameState.playerColor = "Red";
  }
  $(".message").text(gameState.playerColor + "'s turn to play.");
};

const render = () => {
  changeHoverColor();
  updateGrid();
  updateGridColor();

  // console.log(gameState.gameMainGrid);
  // console.log("");
  console.log("NEXT ALLOWABLE MOVE: ");
  console.log(gameState.gameGridAllow);
  console.log("");
  console.log("CURRENT GAME STATUS: ");
  console.log(gameState.gameMainGrid);
  console.log("");
  console.log("Rendered");
};

const updateGrid = () => {
  for (let i = 0, k = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // $(".subCell").eq(k).text(gameState.gameSubGrid[i][j]);
      k++;
    }
  }
};

const updateGridColor = () => {
  let counter = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let symbol = gameState.gameSubGrid[i][j];
      if (symbol === "X") {
        $(".subCell").eq(counter).css({ "background-color": "blue" });
      } else if (symbol === "O") {
        $(".subCell").eq(counter).css({ "background-color": "red" });
      }
      counter++;
    }
  }
};

const changeHoverColor = () => {
  if (gameState.playerColor === "Red") {
    $(".subCell")
      .off("mouseenter mouseleave")
      .hover(
        (event) => {
          $(event.target).addClass("hoverRed");
        },
        (event) => {
          $(event.target).removeClass("hoverRed");
        }
      );
  } else {
    $(".subCell")
      .off("mouseenter mouseleave")
      .hover(
        (event) => {
          $(event.target).addClass("hoverBlue");
        },
        (event) => {
          $(event.target).removeClass("hoverBlue");
        }
      );
  }
};

const resetGame = () => {
  $(".restartBtn").on("click", () => {
    //   gameState.currentPlayer = "O";
    //   gameState.playerColor = "Red";
    //   gameState.currentPlayer = "O";
    //   gameState.gameSubGrid = [
    //     ["", "", "", "", "", "", "", "", ""],
    //     ["", "", "", "", "", "", "", "", ""],
    //     ["", "", "", "", "", "", "", "", ""],
    //     ["", "", "", "", "", "", "", "", ""],
    //     ["", "", "", "", "", "", "", "", ""],
    //     ["", "", "", "", "", "", "", "", ""],
    //     ["", "", "", "", "", "", "", "", ""],
    //     ["", "", "", "", "", "", "", "", ""],
    //     ["", "", "", "", "", "", "", "", ""],
    //   ];
    //   gameState.gameMainGrid = ["", "", "", "", "", "", "", "", ""];
    //   gameState.gameGridAllow = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    //   $(".message").text("Click to Start");
    //   $(".mainCell").css({ "background-color": "transparent" });
    //   $(".subCell").text("").css({ "background-color": "transparent" });
    //   nextAvaliableMoveColor();
    //   changeHoverColor();
    //   console.log("Restart!");
    //   console.log(gameState);
    location.reload(true);
  });
};

const howToPlay = () => {
  $(".instructionBtn")
    .off("mouseenter mouseleave")
    .hover(
      () => {
        $(".instructionContainer").css({ display: "flex" });
      },
      () => {
        $(".instructionContainer").css({ display: "none" });
      }
    );
};

$(() => {
  setup();
  nextAvaliableMoveColor();
  onClickCell();
  render();
  resetGame();
  howToPlay();
});
