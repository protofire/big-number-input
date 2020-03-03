import * as React from 'react'
import { parseUnits } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'

export type BigNumberInputProps = {
  decimals: number
  value: string
  onChange: (value: string) => void
  renderInput?: (props: React.HTMLProps<HTMLInputElement>) => React.ReactElement
  autofocus?: boolean
  placeholder?: string
  max?: string
  min?: string
}

export function BigNumberInput({
  decimals,
  value,
  onChange,
  renderInput,
  autofocus,
  placeholder = '0.00',
  max,
  min,
}: BigNumberInputProps) {
  const inputRef = React.useRef<any>(null)
  const [parsedMin, setParsedMin] = React.useState()
  const [parsedMax, setParsedMax] = React.useState()

  const defaultRenderInput = props => <input {...props} />

  React.useEffect(() => {
    if (min) {
      setParsedMin(parseUnits(min, decimals))
    }
    if (max) {
      setParsedMax(parseUnits(max, decimals))
    }
  }, [min, max])

  // autofocus (only for default Input)
  React.useEffect(() => {
    if (!renderInput && autofocus && inputRef) {
      const node = inputRef.current as HTMLInputElement
      node.focus()
    }
  }, [autofocus, inputRef])

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: localValue } = event.currentTarget

    if (localValue === '') {
      onChange(localValue)
      return
    }

    let newValue: BigNumber
    try {
      newValue = parseUnits(localValue, decimals)
    } catch (e) {
      // don't update the input on invalid values
      return
    }
    const invalidValue = (min && newValue.lt(parsedMin)) || (max && newValue.gt(parsedMax))

    if (invalidValue) {
      return
    }

    onChange(newValue.toString())
  }

  const inputProps = {
    placeholder,
    onChange: updateValue,
    type: 'text',
    value,
    ref: inputRef,
  }

  return renderInput ? renderInput({ ...inputProps }) : defaultRenderInput({ ...inputProps })
}
