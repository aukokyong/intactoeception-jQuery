// click on cell
// check if cell is empty, place marker on grid if empty, else no effect
// check if 3 in a line on sub-grid, if yes => win sub-grid
// control next player's move
// next player's turn
// check if 3 in a line on main grid, if yes => win main grid,

const gameState = {
  currentPlayer: "O",
  gameOn: true,
  xColor: "Blue",
  oColor: "Red",
  xCellBgColor: "lightskyblue",
  oCellBgColor: "lightcoral",
  nextMoveBgColor: "yellow",
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
    let isAllowPutInCell = gameState.gameGridAllow[mainCellPos];

    if (
      isMainCellEmpty === "" &&
      isSubCellEmpty === "" &&
      isAllowPutInCell === "-"
    ) {
      // console.log("CELL CLICKED");
      gameState.gameSubGrid[mainCellPos][subCellPos] = gameState.currentPlayer; // Update player marking to gameSubGrid array

      checkIfWinSubCell(mainCellPos);
      listNextAvaliableMove(subCellPos);
      nextPlayerTurn();
    }

    checkIfWinMainCell();
    checkDrawConditionMainCell();
    listNextAvaliableMoveColor();
    SubCellWinColor();
    render();
  });
};

const checkIfWinSubCell = (mainCellPos) => {
  // console.log("CHECKING IF PLAYER WIN SUBCELL...");
  let winCombList = gameState.winningCombination;
  for (let i = 0; i < gameState.winningCombination.length; i++) {
    let a = gameState.gameSubGrid[mainCellPos][winCombList[i][0]];
    let b = gameState.gameSubGrid[mainCellPos][winCombList[i][1]];
    let c = gameState.gameSubGrid[mainCellPos][winCombList[i][2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      // Player win subcell, update main grid
      gameState.gameMainGrid[mainCellPos] = gameState.currentPlayer;
    }
  }
};

const listNextAvaliableMove = (subCellPos) => {
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

const nextPlayerTurn = () => {
  if (gameState.currentPlayer === "O") {
    gameState.currentPlayer = "X";
    $(".message").text(gameState.xColor + "'s turn to play.");
  } else {
    gameState.currentPlayer = "O";
    $(".message").text(gameState.oColor + "'s turn to play.");
  }
};

const checkIfWinMainCell = () => {
  // console.log("CHECKING IF PLAYER WIN MAIN CELL...");
  let winCombList = gameState.winningCombination;
  for (let i = 0; i < gameState.winningCombination.length; i++) {
    let a = gameState.gameMainGrid[winCombList[i][0]];
    let b = gameState.gameMainGrid[winCombList[i][1]];
    let c = gameState.gameMainGrid[winCombList[i][2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      gameState.gameGridAllow = ["", "", "", "", "", "", "", "", ""];
      gameState.gameOn = false;
      if (gameState.currentPlayer === "X") {
        $(".message").text(`${gameState.oColor} Won!`);
      } else {
        $(".message").text(`${gameState.xColor}  Won!`);
      }
    }
  }
};

const checkDrawConditionMainCell = () => {
  let findSpace = gameState.gameMainGrid.indexOf("");
  if (findSpace === -1) {
    $(".message").text("Draw! Press the restart button to start a new game.");
  }
};

const listNextAvaliableMoveColor = () => {
  $(".mainCell").css({ "background-color": "transparent " });
  for (let i = 0; i < 9; i++) {
    if (gameState.gameGridAllow[i] === "-") {
      $(".mainCell").eq(i).css({
        "background-color": gameState.nextMoveBgColor,
        transition: "background-color 0.5s ease",
      });
    }
  }
};

const SubCellWinColor = () => {
  for (let i = 0; i < 9; i++) {
    if (gameState.gameMainGrid[i] === "X") {
      $(".mainCell").eq(i).css({
        "background-color": gameState.xCellBgColor,
        transition: "background-color 1s ease",
      });
    } else if (gameState.gameMainGrid[i] === "O") {
      $(".mainCell").eq(i).css({
        "background-color": gameState.oCellBgColor,
        transition: "background-color 1s ease",
      });
    }
  }
};

const render = () => {
  changeHoverColor();
  // updateGridText(); // Not in use
  updateGridColor();

  // console.log(gameState.gameMainGrid);
  console.log("");
  console.log("");
  console.log("NEXT ALLOWABLE MOVE: ");
  console.log(gameState.gameGridAllow);
  // console.log("");
  console.log("CURRENT GAME STATUS: ");
  console.log(gameState.gameMainGrid);
  // console.log("");
  // console.log("Rendered");
};

const updateGridText = () => {
  for (let i = 0, k = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      $(".subCell").eq(k).text(gameState.gameSubGrid[i][j]);
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
        $(".subCell").eq(counter).css({ "background-color": gameState.xColor });
      } else if (symbol === "O") {
        $(".subCell").eq(counter).css({ "background-color": gameState.oColor });
      }
      counter++;
    }
  }
};

const changeHoverColor = () => {
  if (gameState.currentPlayer === "O" && gameState.gameOn === true) {
    $(".subCell")
      .off("mouseenter mouseleave")
      .hover(
        (event) => {
          $(event.target).addClass("hoverPlayerO");
        },
        (event) => {
          $(event.target).removeClass("hoverPlayerO");
        }
      );
  } else if (gameState.gameOn === true) {
    $(".subCell")
      .off("mouseenter mouseleave")
      .hover(
        (event) => {
          $(event.target).addClass("hoverPlayerX");
        },
        (event) => {
          $(event.target).removeClass("hoverPlayerX");
        }
      );
  } else {
    $(".subCell").unbind();
  }
};

const resetGameBtn = () => {
  $(".restartBtn").on("click", () => {
    location.reload(true);
  });
};

const howToPlayBtn = () => {
  $(".instructionBtn").on("click", () => {
    $(".instructionContainer").css({
      visibility: "visible",
    });
    $(".tagline").css({
      visibility: "hidden",
    });
    $(".gameContainer").css({
      visibility: "hidden",
    });
    $(".message").css({
      visibility: "hidden",
    });
    $(".restartBtn").css({
      visibility: "hidden",
    });
    $(".instructionBtn").css({
      visibility: "hidden",
    });
  });
};

const closeBtn = () => {
  $(".closeBtn").on("click", () => {
    $(".instructionContainer").css({
      visibility: "hidden",
    });
    $(".tagline").css({
      visibility: "visible",
    });
    $(".gameContainer").css({
      visibility: "visible",
    });
    $(".message").css({
      visibility: "visible",
    });
    $(".restartBtn").css({
      visibility: "visible",
    });
    $(".instructionBtn").css({
      visibility: "visible",
    });
  });
};

$(() => {
  setup();
  listNextAvaliableMoveColor();
  onClickCell();
  render();
  resetGameBtn();
  howToPlayBtn();
  closeBtn();
});
