import React, { useEffect, useState } from 'react';

const App = () => {
  //? useState hook: [ stateVar, setState-function ] = useState(initial-state)
  const [hello, setHello] = useState('');
  const [world, setWorld] = useState('');

  //? useEffect hook: simulates lifecycle-methods
  useEffect(() => {
    const compDidMount = async () => {
      setTimeout(() => {
        setHello('Hello ');
      }, 5e3);
    };

    compDidMount();
  }, []);
  //? [] === componentDidMount

  useEffect(() => {
    const compDidUpdate = async () => {
      setTimeout(() => {
        setWorld('World!');
      }, 1e3);
    };

    if (hello) {
      compDidUpdate();
    }
  }, [hello]);
  //? [listener1, listener2, etc...] === componentDidUpdate
  //! will still run on mount, hence the 'if' statement!

  return (
    <>
      <h1 className="example">{hello + world}</h1>
    </>
  );
};

export default App;
