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
  renderInput = props => <input {...props} />,
  autofocus,
  placeholder = '0.00',
  max,
  min,
}: BigNumberInputProps) {
  const [currentValue, setCurrentValue] = React.useState('')

  const inputRef = React.useRef<any>(null)

  // update current value
  React.useEffect(() => {
    if (!value) {
      setCurrentValue('')
    } else if (!parseUnits(currentValue || '0', decimals).eq(value)) {
      setCurrentValue(formatUnits(value, decimals))
    }
  }, [value, decimals, currentValue])

  // autofocus
  React.useEffect(() => {
    if (autofocus && inputRef) {
      const node = inputRef.current as HTMLInputElement
      node.focus()
    }
  }, [autofocus, inputRef])

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    if (value === '') {
      onChange(value)
      setCurrentValue('')
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

    onChange(newValue.toString())

    setCurrentValue(value)
  }

  const inputProps = {
    placeholder,
    onChange: updateValue,
    value: currentValue,
    type: 'text',
    ref: inputRef,
  }

  return renderInput({ ...inputProps })
}
