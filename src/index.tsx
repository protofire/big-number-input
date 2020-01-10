import * as React from 'react'
import { BigNumber, formatUnits, parseUnits } from 'ethers/utils'

export interface BigNumberInputProps {
  decimals: number
  value: BigNumber | null
  onChange: (value: BigNumber | null) => void
  renderInput?: (props: React.HTMLProps<HTMLInputElement>) => React.ReactElement
  autofocus?: boolean
  placeholder?: string
  max?: BigNumber
  min?: BigNumber
  step?: BigNumber
}

export const BigNumberInput = ({
  decimals,
  value,
  onChange,
  renderInput = props => <input {...props} />,
  autofocus,
  placeholder = '0.00',
  max,
  min,
  step,
}: BigNumberInputProps) => {
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

    if (!value) {
      onChange(null)
      setCurrentValue('')
      return
    }

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

  return renderInput({
    placeholder,
    onChange: updateValue,
    value: currentValue,
    max: currentMax,
    min: currentMin,
    step: currentStep,
    type: 'number',
    ref: inputRef,
  })
}
