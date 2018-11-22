import React from 'react';

import { SmStarSC, MdStarSC, LgStarSC } from '../Components/StyledComponents';
import { KEYS } from '../Resources';

export const tick = state => {
  state = decayVelocity(state);

  state.enemy1 = updateEnemy(state.enemy1);
  state.enemy2 = updateEnemy(state.enemy2);
  state.enemy3 = updateEnemy(state.enemy3);
  state.enemy4 = updateEnemy(state.enemy4);
  state.enemy5 = updateEnemy(state.enemy5);

  return state;
};

export const updateEnemy = enemy => {
  const { y, speed, index } = enemy;

  enemy.y = y + speed * 10;
  enemy = enemy.y > 1000 ? createEnemy(index) : enemy;

  return enemy;
};

export const decayVelocity = state => {
  const { rVelocity, lVelocity, shipX } = state;
  const velocity = lVelocity + rVelocity;
  const maxX = 900;

  state.lVelocity = lVelocity < 0 && shipX > 0 ? lVelocity + 1 : 0;

  state.rVelocity = rVelocity > 0 && shipX < maxX ? rVelocity - 1 : 0;

  if (velocity >= 0) {
    state.shipX = shipX <= maxX ? shipX + velocity : maxX;
  } else if (velocity <= 0) {
    state.shipX = shipX >= 0 ? shipX + velocity : 0;
  }

  return state;
};

export const handleKeys = (state, e) => {
  const key = e.keyCode;
  const { rVelocity, lVelocity, shipX } = state;

  if (!shipX >= 0 && !shipX <= 1000) {
    if (key === KEYS.RIGHT || key === KEYS.D)
      state.rVelocity = rVelocity < 20 ? rVelocity + 2 : 20;

    if (key === KEYS.LEFT || key === KEYS.A)
      state.lVelocity = lVelocity > -20 ? lVelocity - 2 : -20;

    state.shipX = shipX + state.lVelocity + state.rVelocity;

    return state;
  }
};

export const createStars = () => {
  const rX = () => randomUpTo(1000);
  const rDelay = () => 0 - randomUpTo(4800);

  const stars = [];
  for (let i = 0; i < 10; ++i) {
    stars.push(
      <SmStarSC key={'a' + i} x={rX()} sp={12} delay={rDelay()} />,
      <MdStarSC key={'b' + i} x={rX()} sp={8} delay={rDelay()} />,
      <LgStarSC key={'c' + i} x={rX()} sp={6} delay={rDelay()} />
    );
  }

  return stars;
};

export const createEnemy = (key = 1) => ({
  key,
  y: 0,
  index: key,
  color: randomUpTo(3),
  x: randomUpTo(10) * 100,
  speed: randomUpTo(3) + 1
});

export const randomUpTo = upperLimit => Math.floor(Math.random() * upperLimit);
