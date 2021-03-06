import React from 'react';

import { SmStarSC, MdStarSC, LgStarSC } from '../Components/StyledComponents';
import { KEYS } from '../Resources';

import enemy1 from '../Assets/enemy1.svg';
import enemy2 from '../Assets/enemy2.svg';
import enemy3 from '../Assets/enemy3.svg';
import Enemy from '../Components/Enemy';

const enemiesSVGS = [enemy1, enemy2, enemy3];
const maxX = 1025;
const minX = -40;

//////////////////////
// Helper Functions //
//////////////////////

// Runs every 50ms in order to assess and adjust state
export const tick = App => {
  const enemies = App.enemies;
  let state = App.state;

  updateEnemies(enemies, state);
  state = decayVelocity(state);

  return state;
};

// Lower the inertia of a moving ship
const decayVelocity = state => {
  const { rVelocity, lVelocity, shipX } = state;
  const velocity = lVelocity + rVelocity;

  state.lVelocity = lVelocity < 0 ? lVelocity + 1 : 0;

  state.rVelocity = rVelocity > 0 ? rVelocity - 1 : 0;

  if (velocity >= 0) {
    state.shipX = shipX <= maxX ? shipX + velocity : minX;
  } else if (velocity <= 0) {
    state.shipX = shipX >= minX ? shipX + velocity : maxX;
  }

  return state;
};

// Update enemies and conduct hit-detection on them and the ship
const updateEnemies = (enemies, state) => {
  const shipX = document.querySelector('.Ship').getBoundingClientRect().x;

  enemies.forEach(enemy => {
    const enemyDim = enemy.getBoundingClientRect();
    const { y, x } = enemyDim;

    if (y > 625 && y < 775) {
      if (x >= shipX - 60 && x <= shipX + 60) {
        state.isShipHit = true;
      }
    }

    if (y >= 825) {
      resetEnemy(enemy);
      state.score = state.score + 1;
    }
  });
};

// Randomly re-creates and places an enemy at the top
const resetEnemy = enemy => {
  enemy.style.webkitAnimation = 'none';
  enemy.style.animation = 'none';
  enemy.style.animationDuration = `0s`;

  // There is a slight delay so that the element has time
  // to fully reset to the CSS Styled sheets animation
  // before overriding them here
  setTimeout(function() {
    enemy.style.animation = '';
    enemy.style.webkitAnimation = '';
    enemy.style.left = `${randomUpTo(11) * 100}px`;
    enemy.style.background = `url(${enemiesSVGS[randomUpTo(3)]})`;
    enemy.style.animationDuration = `3s`;
    enemy.style.backgroundSize = 'cover';
  }, 10);
};

// Move the ship through keyboard input
export const handleKeys = (state, e) => {
  const { rVelocity, lVelocity, shipX } = state;
  const key = e.keyCode;

  if (key === KEYS.RIGHT || key === KEYS.D)
    state.rVelocity = rVelocity < 20 ? rVelocity + 2 : 20;

  if (key === KEYS.LEFT || key === KEYS.A)
    state.lVelocity = lVelocity > -20 ? lVelocity - 2 : -20;

  state.shipX = shipX + state.lVelocity + state.rVelocity;

  if (key === KEYS.SPACE) {
    window.location.reload();
  }

  return state;
};

// Creates 'n' star elements with animation
// Returns array of stars
export const addStars = n => {
  const rX = () => randomUpTo(maxX);
  const rDelay = () => 0 - randomUpTo(4800);

  const stars = [];
  for (let i = 0; i < n; ++i) {
    stars.push(
      <SmStarSC key={'a' + i} x={rX()} sp={12} delay={rDelay()} />,
      <MdStarSC key={'b' + i} x={rX()} sp={8} delay={rDelay()} />,
      <LgStarSC key={'c' + i} x={rX()} sp={6} delay={rDelay()} />,
    );
  }

  return stars;
};

// Creates 'n' amount of enemies for the game
// Returns an array of Enemy components
export const addEnemies = n => [...Array(n).keys()].map(i => <Enemy key={i} />);

// Random number from one up to the parameter
export const randomUpTo = upperLimit => Math.floor(Math.random() * upperLimit);

export const initialState = () => ({
  score: 0,
  shipX: 490,
  rVelocity: 0,
  lVelocity: 0,
  isShipHit: false,
});
