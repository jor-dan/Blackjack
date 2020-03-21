import React from 'react';

interface ControlsProps {
  functions: {
    hit(): void;
    stand(): void;
    reset(): void;
  };
  enabled: {
    hit: boolean;
    stand: boolean;
    reset: boolean;
  };
}

const Controls: React.FC<ControlsProps> = ({ functions, enabled }) => (
  <>
    <button
      className="btn btn-success"
      id="hit"
      onClick={() => functions.hit()}
      disabled={!enabled.hit}
      type="button"
    >
      Hit
    </button>
    <button
      className="btn btn-warning"
      id="stand"
      onClick={() => functions.stand()}
      disabled={!enabled.stand}
      type="button"
    >
      Stand
    </button>
    <button
      className="btn btn-danger"
      id="reset"
      onClick={() => functions.reset()}
      disabled={!enabled.reset}
      type="button"
    >
      Reset
    </button>
  </>
);

export default Controls;
