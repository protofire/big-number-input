# big-number-input

A BigNumberInput to use with decentralized applications and React.

[![Build Status](https://travis-ci.com/protofire/big-number-input.svg?branch=master)](https://travis-ci.com/protofire/big-number-input)
[![NPM version](https://badge.fury.io/js/big-number-input.svg)](https://npmjs.org/package/big-number-input)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/protofire/big-number-input/master/LICENSE)
[![dependencies Status](https://david-dm.org/protofire/big-number-input/status.svg)](https://david-dm.org/protofire/big-number-input)
[![devDependencies Status](https://david-dm.org/protofire/big-number-input/dev-status.svg)](https://david-dm.org/protofire/big-number-input?type=dev)

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
import React from 'react'
import { BigNumberInput } from 'big-number-input'

function App() {
  const [value, setValue] = React.useState('1000000')

  return (
    <div>
      <BigNumberInput
        decimals={6}
        onChange={setValue}
        value={value}
      />
      <div>{value || 'empty'}</div>
    </div>
  )
}

export default App
```

In this case the input value is 1000000 and the rendered value will be 1. If the user changes it to 2 in the UI the onChange will be called with 2000000.


The required props are:

- `decimals`: The number of decimals you want to use
- `value`: A string with the raw value that will be used by the input, eg. 1000000.
- `onChange`: A function that receives the new raw value, or an empty string when the input is empty

Then you have a bunch of optional props you can use:

- `autofocus`: Set to true if you want the input to obtain focus as soon as it's rendered
- `placeholder`: A string to use as the input's placeholder
- `disabled`: A boolean used to disable the input
- `min`, `max` and `step`: The min and max values you want to use and the step used when you increase or decrease the
  number with the arrow keys or by clicking the arrows in the input. These values are also strings with the raw values and are interpreted with the same number of decimals as the main value.

### Using a different input component

If you want to use a different input, for example the `Input` from [Material UI](https://material-ui.com/), you can use
the `renderInput` prop:

```typescript
import React from 'react';
import { BigNumberInput } from 'big-number-input'
import { Input } from '@material-ui/core'


function App() {
  const [value, setValue] = React.useState('')

  return (
    <div>
      <BigNumberInput decimals={6} onChange={setValue} value={value} renderInput={
        props => <Input {...props} />
      }/>
      <div>{value || 'empty'}</div>
    </div>
  );
}
```

### Converting to and from a big number

If you want to use some big number library to store your value, you can follow an approach like this:

```typescript
import React from "react";
import Big from 'big.js'
import { BigNumberInput } from "big-number-input";

function App() {
  const [value, setValue] = React.useState(null);
  return (
    <div>
      <BigNumberInput
        autofocus={true}
        decimals={6}
        onChange={newValue => newValue ? setValue(new Big(newValue)) : setValue(null)}
        value={value ? value.toString() : ''}
      />
      <div>{value ? value.toString() : "empty"}</div>
    </div>
  );
}
```

Here we use `null` to indicate an empty input, and a big number instance when there is something entered in the input.
