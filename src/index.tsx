import * as React from 'react'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'

export type BigNumberInputProps = {
  decimals: number
  initialValue: string
  onChange: (value: string) => void
  renderInput?: (props: React.HTMLProps<HTMLInputElement>) => React.ReactElement
  autofocus?: boolean
  placeholder?: string
  max?: string
  min?: string
}

export function BigNumberInput({
  decimals,
  initialValue,
  onChange,
  renderInput,
  autofocus,
  placeholder = '0.00',
  max,
  min,
}: BigNumberInputProps) {
  const inputRef = React.useRef<any>(null)

  const [inputValue, setInputvalue] = React.useState('')
  const [parsedMin, setParsedMin] = React.useState<BigNumber | null>()
  const [parsedMax, setParsedMax] = React.useState<BigNumber | null>()

  // update current value
  React.useEffect(() => {
    setInputvalue(formatUnits(initialValue, decimals))
  }, [initialValue, decimals, inputValue])

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
    const { value } = event.currentTarget

    if (value === '') {
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

    if (parsedMin && newValue.lt(parsedMin)) {
      return
    }

    if (parsedMax && newValue.lt(parsedMax)) {
      return
    }

    setInputvalue(formatUnits(value, decimals))
    onChange(newValue.toString())
  }

  const inputProps = {
    placeholder,
    onChange: updateValue,
    type: 'text',
    value: inputValue,
  }

  return renderInput
    ? renderInput({ ...inputProps })
    : defaultRenderInput({ ...inputProps, ref: inputRef })
}
