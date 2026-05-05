// gameboard.js
export function Gameboard(size = 10) {
  const grid = Array.from({ length: size }, () => Array(size).fill(null));
  const ships = [];
  const missedShots = [];
  const hitShots = [];

  function canPlace(ship, [x, y], direction = 'horizontal') {
    const len = ship.length;
    if (direction === 'horizontal') {
      if (y + len > size) return false;
      for (let i = 0; i < len; i++) if (grid[x][y + i]) return false;
    } else {
      if (x + len > size) return false;
      for (let i = 0; i < len; i++) if (grid[x + i][y]) return false;
    }
    return true;
  }

  function placeShip(ship, [x, y], direction = 'horizontal') {
    const len = ship.length;
    if (!canPlace(ship, [x, y], direction)) return false;

    if (direction === 'horizontal') {
      for (let i = 0; i < len; i++) grid[x][y + i] = ship;
    } else {
      for (let i = 0; i < len; i++) grid[x + i][y] = ship;
    }
    ships.push(ship);
    return true;
  }

  function receiveAttack(x, y) {
    const target = grid[x]?.[y];
    const alreadyMiss = missedShots.some(([mx, my]) => mx === x && my === y);
    const alreadyHit = hitShots.some(([hx, hy]) => hx === x && hy === y);

    if (target && typeof target.hit === 'function') {
      if (!alreadyHit) {
        target.hit();
        hitShots.push([x, y]);
      }
      return 'hit';
    } else {
      if (!alreadyMiss) missedShots.push([x, y]);
      return 'miss';
    }
  }

  function areAllShipsSunk() {
    return ships.length > 0 && ships.every(s => s.isSunk());
  }

   function hasShot(x, y) {
    return hitShots.some(([hx, hy]) => hx === x && hy === y)
    || missedShots.some(([mx, my]) => mx === x && my === y);
  }


  return {
    grid,
    ships,
    missedShots,
    hitShots,
    placeShip,
    receiveAttack,
    areAllShipsSunk,
    hasShot,
  };
}
