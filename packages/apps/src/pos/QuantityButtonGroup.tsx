import React from 'react'
import { TextField } from '@gravis-os/fields'
import { Button, Stack, Typography } from '@gravis-os/ui'
import isNan from 'lodash/isNaN'
import parseInt from 'lodash/parseInt'

const QuantityButtonGroup = ({ quantity, setQuantity }) => {
  const onIncrement = () => setQuantity(quantity + 1)
  const onDecrement = () => {
    if (quantity === 0) return
    setQuantity(quantity - 1)
  }

  const handleOnChange = (e) => {
    const value = parseInt(e.target.value)
    if (value < 0 || isNan(value)) {
      setQuantity(0)
    }
    setQuantity(value)
  }

  return (
    <Stack>
      <Typography
        variant="overline"
        fontSize={16}
        sx={{ color: 'text.secondary' }}
      >
        Quantity
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
        spacing={2}
      >
        <Button size="large" fullWidth onClick={onDecrement}>
          <Typography variant="h1">-</Typography>
        </Button>
        <TextField
          fullWidth
          value={quantity}
          sx={{ height: '100%' }}
          inputProps={{
            sx: { height: 32, fontSize: 'h1.fontSize', textAlign: 'center' },
          }}
          onChange={(e) => handleOnChange(e)}
        />
        <Button size="large" color="primary" fullWidth onClick={onIncrement}>
          <Typography variant="h1" color="white">
            +
          </Typography>
        </Button>
      </Stack>
    </Stack>
  )
}

export default QuantityButtonGroup
