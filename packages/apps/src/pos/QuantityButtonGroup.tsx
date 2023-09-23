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
        fontSize={16}
        sx={{ color: 'text.secondary' }}
        variant="overline"
      >
        Quantity
      </Typography>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Button fullWidth onClick={onDecrement} size="large">
          <Typography variant="h1">-</Typography>
        </Button>
        <TextField
          fullWidth
          inputProps={{
            sx: { fontSize: 'h1.fontSize', height: 32, textAlign: 'center' },
          }}
          onChange={(e) => handleOnChange(e)}
          sx={{ height: '100%' }}
          value={quantity}
        />
        <Button color="primary" fullWidth onClick={onIncrement} size="large">
          <Typography color="white" variant="h1">
            +
          </Typography>
        </Button>
      </Stack>
    </Stack>
  )
}

export default QuantityButtonGroup
