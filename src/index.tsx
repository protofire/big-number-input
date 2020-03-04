import * as React from 'react'
import { formatUnits, parseUnits } from '@ethersproject/units'
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

  const [inputValue, setInputvalue] = React.useState('')

  // update current value
  React.useEffect(() => {
    if (!value) {
      setInputvalue('')
    } else if (!parseUnits(inputValue || '0', decimals).eq(value)) {
      setInputvalue(formatUnits(value, decimals))
    }
  }, [value, decimals, inputValue])

  React.useEffect(() => {
    if (!renderInput && autofocus && inputRef) {
      const node = inputRef.current as HTMLInputElement
      node.focus()
    }
  }, [autofocus, inputRef])

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    if (value === '') {
      onChange(value)
      setInputvalue(value)
      return
    }

    let newValue: BigNumber
    try {
      newValue = parseUnits(value, decimals)
    } catch (e) {
      // don't update the input on invalid values
      return
    }

    const invalidValue = (min && newValue.lt(min)) || (max && newValue.gt(max))
    if (invalidValue) {
      return
    }

    setInputvalue(value)
    onChange(newValue.toString())
  }

  const inputProps = {
    placeholder,
    onChange: updateValue,
    type: 'text',
    value: inputValue,
  }

  return renderInput ? renderInput({ ...inputProps }) : <input {...inputProps} ref={inputRef} />
}
