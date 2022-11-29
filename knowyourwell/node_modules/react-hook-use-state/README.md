# react-hook-use-state

![npm](https://img.shields.io/npm/v/react-hook-use-state) [![Build Status](https://travis-ci.org/we-code-now/react-hook-use-state.svg?branch=master)](https://travis-ci.org/we-code-now/react-hook-use-state) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/c67890a8255a46d9a65e7bb158b6dd7d)](https://www.codacy.com/app/StevenTea/react-hook-use-state?utm_source=github.com&utm_medium=referral&utm_content=we-code-now/react-hook-use-state&utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/c67890a8255a46d9a65e7bb158b6dd7d)](https://www.codacy.com/app/StevenTea/react-hook-use-state?utm_source=github.com&utm_medium=referral&utm_content=we-code-now/react-hook-use-state&utm_campaign=Badge_Coverage) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-hook-use-state) ![GitHub](https://img.shields.io/github/license/we-code-now/react-hook-use-state)

useState() with confidence!

## Table of Contents

-   [Motivation](#motivation)
-   [Disclaimer](#disclaimer)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Demo](#demo)
-   [License](#license)

## Motivation

Sometimes, we accidentally try to update state on an unmounted React component. And then we get a warning like this:

```text
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

With `react-hook-use-state`, you can use `useState()` hook with confidence.

## Disclaimer

This package is based on React lifecycle hooks and don't update state if React component is unmounted.

[BUT ... THIS APPROACH IS AN ANTIPATTERN. CLICK HERE TO READ MORE!](https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html)

I strongly encourage all asynchronous tasks should be cleaned up when React component is unmounted. But if you don't mind for some reason, this solution is for you :)

## Installation

```shell
$ npm install --save react-hook-use-state
```

## Usage

-   Similar to official `useState()`, super easy!

```js
import useState from 'react-hook-use-state';

function Counter() {
  const [count, setCount] = useState(0);
  // your code here
}
```

## Demo

Website: <https://wecodenow-react-hook-use-state.stackblitz.io>

Playground: <https://stackblitz.com/edit/wecodenow-react-hook-use-state>

## License

MIT
