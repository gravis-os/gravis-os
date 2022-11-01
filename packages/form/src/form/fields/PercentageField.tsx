import React, { FC, useEffect } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'
import TextField, { TextFieldProps } from './TextField'

interface PercentageFieldProps
  extends Omit<NumberFormatProps<TextFieldProps>, 'onChange'> {
  onChange: (percentage: number) => void
  value: number
}

const PercentageField: FC<PercentageFieldProps> = (props) => {
  const { onChange, value, ...rest } = props
  const [displayValue, setDisplayValue] = React.useState(value)

  useEffect(() => {
    setDisplayValue(value * 100)
  }, [value])

  return (
    <NumberFormat
      customInput={TextField}
      {...rest}
      value={displayValue}
      fullWidth
      thousandSeparator
      decimalScale={2}
      onValueChange={(target) => {
        setDisplayValue(target.floatValue)
        if (target.floatValue !== value) {
          onChange(target.floatValue / 100)
        }
      }}
      isNumericString
      suffix="%"
    />
  )
}

export default PercentageField
