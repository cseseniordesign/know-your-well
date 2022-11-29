// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useRef, useEffect } from 'react';

function useState(...hookArgs) {
  const isMounted = useRef(false);
  useEffect(
    () => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    },
    [],
  );

  const [state, setState] = React.useState(...hookArgs);
  const setStateProxy = (...setterArgs) => {
    if (isMounted.current) {
      setState(...setterArgs);
    }
  };

  return [state, setStateProxy];
}

export default useState;
