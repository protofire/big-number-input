# big-number-input

A BigNumberInput to use with decentralized applications and React.

[![Build Status](https://travis-ci.com/mariano-aguero/big-number-input.svg?branch=master)](https://travis-ci.com/mariano-aguero/big-number-input)
[![NPM version](https://badge.fury.io/js/big-number-input.svg)](https://npmjs.org/package/big-number-input)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mariano-aguero/big-number-input/master/LICENSE)
[![dependencies Status](https://david-dm.org/mariano-aguero/big-number-input/status.svg)](https://david-dm.org/mariano-aguero/big-number-input)
[![devDependencies Status](https://david-dm.org/mariano-aguero/big-number-input/dev-status.svg)](https://david-dm.org/mariano-aguero/big-number-input?type=dev)

## The problem

You are using big integer numbers that can be expressed as smaller fractional numbers and you want users to be able to
enter them in this format. The originating use case for this library are ERC20 tokens, but a simpler example is having
some amount expressed in millions. You want the user to input `1.5` but to receive a bignumber containing `1500000`. In
this case, you can use `big-number-input` with a `decimals` value of 6. See `Usage` below for more information.

## Installation

```shell
npm install big-number-input
```

## Usage

Import the component and pass the required props:

```typescript
import React from 'react';
import { BigNumberInput } from 'big-number-input'
import { BigNumber } from 'ethers/utils'


function App() {
  const [value, setValue] = React.useState(new BigNumber(0))
  return (
    <div>
      <BigNumberInput decimals={6} onChange={setValue} value={value} />
      <div>{value.toString()}</div>
    </div>
  );
}

export default App;
```

The required props are:

- `decimals`: The number of decimals you want to use
- `value`: The BigNumber value that will be used by the input
- `onChange`: A function that receives the new BigNumber value

Then you have a bunch of optional props you can use:

- `autofocus`: Set to true if you want the input to obtain focus as soon as it's rendered
- `placeholder`: A string to use as the input's placeholder
- `disabled`: A boolean used to disable the input
- `min`, `max` and `step`: The min and max values you want to use and the step used when you increase or decrease the
  number with the arrow keys or by clicking the arrows in the input. These values are also BigNumbers and are
  interpreted with the same number of decimals as the main value.
