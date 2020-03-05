import React from 'react';

interface ControlsProps {
  hit(): void;
  stand(): void;
  enabled: {
    hit: boolean;
    stand: boolean;
  };
}

const Controls: React.FC<ControlsProps> = ({ hit, stand, enabled }) => (
  <>
    <button id="hit" onClick={() => hit()} disabled={!enabled.hit} type="button">
      Hit
    </button>
    <button id="stand" onClick={() => stand()} disabled={!enabled.stand} type="button">
      Stand
    </button>
  </>
);

export default Controls;
