import React from 'react';
import { GuideSC, KeycapSC } from './StyledComponents';

const Guide = () => (
  <GuideSC>
    <KeycapSC>A</KeycapSC>
    <span>and</span>
    {<KeycapSC>D</KeycapSC>}
    <span>or</span>
    {<KeycapSC>←</KeycapSC>}
    <span>and</span>
    {<KeycapSC>→</KeycapSC>}
  </GuideSC>
);

export default Guide;
