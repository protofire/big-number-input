import * as React from 'react'
import { BigNumber, formatUnits, parseUnits } from 'ethers/utils'

export interface BigNumberInputProps {
  decimals: number
  onChange: (value: BigNumber) => void
  value: BigNumber
  autofocus?: boolean
  className?: string
  placeholder?: string
  max?: BigNumber
  min?: BigNumber
  step?: BigNumber
  disabled?: boolean
}

export const BigNumberInput = (props: BigNumberInputProps) => {
  const {
    placeholder = '0.00',
    autofocus = false,
    value,
    decimals,
    step,
    min,
    max,
    className,
    disabled = false,
    onChange,
  } = props

  const [currentValue, setCurrentValue] = React.useState('')

  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!parseUnits(currentValue || '0', decimals).eq(value)) {
      setCurrentValue(formatUnits(value, decimals))
    }
  }, [value, decimals, currentValue])

  React.useEffect(() => {
    if (autofocus && inputRef) {
      const node = inputRef.current as HTMLInputElement
      node.focus()
    }
  }, [autofocus, inputRef])

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    const newValue = parseUnits(value, decimals)
    const invalidValue = (min && newValue.lt(min)) || (max && newValue.gt(max))

    if (invalidValue) {
      return
    }

    onChange(newValue)

    setCurrentValue(value)
  }

  const currentStep = step && formatUnits(step, decimals)
  const currentMin = min && formatUnits(min, decimals)
  const currentMax = max && formatUnits(max, decimals)

  return (
    <input
      className={className}
      max={currentMax}
      min={currentMin}
      onChange={updateValue}
      ref={inputRef}
      step={currentStep}
      type={'number'}
      value={currentValue}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
