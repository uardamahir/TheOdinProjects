import { Gameboard } from "./gameboard.js";

export function Player(isComputer = false) {
  const board = Gameboard();
  const previousMoves = new Set();

  function attack(enemyPlayer, x, y) {
    if (enemyPlayer.board.hasShot(x, y)) return 'repeat';
    return enemyPlayer.board.receiveAttack(x, y); // 'hit' | 'miss'
  }

  function randomAttack(enemyPlayer) {
    const size = enemyPlayer.board.grid.length;
    if (enemyPlayer.board.hitShots.length + enemyPlayer.board.missedShots.length >= size * size) {
      return 'exhausted';
    }
    let x, y;
    do {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    } while (enemyPlayer.board.hasShot(x, y));

    return attack(enemyPlayer, x, y);
  }

  return {
    board,
    isComputer,
    attack,
    randomAttack,
  };
}
