import * as React from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { BigNumber } from 'ethers/utils'

export interface BigNumberInputReturn {
  name: string
  value: BigNumber
}

export interface BigNumberInputProps {
  decimals: number
  name: string
  autofocus?: boolean
  className?: string
  placeholder?: string
  max?: BigNumber
  min?: BigNumber
  onChange: (value: BigNumberInputReturn) => void
  step?: BigNumber
  value?: BigNumber
  disabled?: boolean
}

const Input = styled.input`
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  &:focus {
    outline: none;
  }
`

export const BigNumberInput = (props: BigNumberInputProps) => {
  const {
    placeholder = '0.00',
    autofocus = false,
    value = null,
    decimals,
    name,
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
    if (!value) {
      setCurrentValue('')
    } else if (value && !ethers.utils.parseUnits(currentValue || '0', decimals).eq(value)) {
      setCurrentValue(ethers.utils.formatUnits(value, decimals))
    }
  }, [value, decimals, currentValue])

  React.useEffect(() => {
    if (autofocus && inputRef) {
      const node = inputRef.current as HTMLInputElement
      node.focus()
    }
  }, [autofocus, inputRef])

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget

    if (!value) {
      onChange({ name, value: new BigNumber(0) })
    } else {
      const newValue = ethers.utils.parseUnits(value, decimals)
      const invalidValue = (min && newValue.lt(min)) || (max && newValue.gt(max))

      if (invalidValue) {
        return
      }

      onChange({ name, value: newValue })
    }

    setCurrentValue(value)
  }

  const currentStep = step && ethers.utils.formatUnits(step, decimals)
  const currentMin = min && ethers.utils.formatUnits(min, decimals)
  const currentMax = max && ethers.utils.formatUnits(max, decimals)

  return (
    <Input
      data-testid={name}
      className={className}
      max={currentMax}
      min={currentMin}
      onChange={updateValue}
      ref={inputRef}
      step={currentStep}
      type={'number'}
      name={name}
      value={currentValue}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
