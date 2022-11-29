declare const useState: <S>(initialState: S | (() => S)) => [S, (state: S | ((previousState: S) => void)) => void];

export default useState;
