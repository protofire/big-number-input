import * as React from 'react'
import { BigNumber, formatUnits, parseUnits } from 'ethers/utils'

export interface BigNumberInputProps {
  decimals: number
  value: BigNumber | null
  onChange: (value: BigNumber | null) => void
  renderInput: (props: BigNumberRenderProps) => React.ReactElement
  autofocus?: boolean
  placeholder?: string
  max?: BigNumber
  min?: BigNumber
  step?: BigNumber
}

export interface BigNumberRenderProps {
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  type: string
  max?: string | undefined
  min?: string | undefined
  step?: string | undefined
}

export const BigNumberInput = ({
  decimals,
  value,
  onChange,
  renderInput,
  placeholder = '0.00',
  max,
  min,
  step,
}: BigNumberInputProps) => {
  const [currentValue, setCurrentValue] = React.useState('')

  React.useEffect(() => {
    if (!value) {
      setCurrentValue('')
    } else if (!parseUnits(currentValue || '0', decimals).eq(value)) {
      setCurrentValue(formatUnits(value, decimals))
    }
  }, [value, decimals, currentValue])

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
  })
}
