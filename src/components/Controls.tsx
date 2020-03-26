import React from 'react';

interface ControlsProps {
  message: string;
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

const Controls: React.FC<ControlsProps> = ({ message, functions, enabled }) => (
  <div className="container bar">
    <div className="row">
      <div className="col">
        <h3>{message}</h3>
      </div>
      <div className="col my-auto">
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
      </div>
      <div className="col" />
    </div>
  </div>
);

export default Controls;
