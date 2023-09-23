/* @typescript-eslint/no-empty-function */
import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

import { CheckboxTable, CheckboxTableProps } from '@gravis-os/ui'
import groupBy from 'lodash/groupBy'

export interface ControlledCheckboxTableOptions<T = { id: number | string }>
  extends Pick<CheckboxTableProps<unknown>, 'isReadOnly' | 'title'> {
  columns: string[]
  groupBy: (value: T) => string
  hasToggleRowColumn?: boolean
  rows: T[]
}

export interface ControlledCheckboxTableProps extends UseControllerProps {
  checkboxTableProps: ControlledCheckboxTableOptions
}

const ControlledCheckboxTable: React.FC<ControlledCheckboxTableProps> = (
  props
) => {
  const { checkboxTableProps, control, name, ...rest } = props

  const {
    groupBy: injectedGroupBy,
    hasToggleRowColumn,
    rows,
  } = checkboxTableProps

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange, value: formValues = [], ...fieldProps } = field

        const handleToggleCell = <T extends { id: number | string }>(
          checked: boolean,
          value: T
        ) => {
          const nextValues = checked
            ? [...formValues, value]
            : formValues.filter((formValue) => formValue.id !== value.id)

          onChange(nextValues)
        }

        const handleToggleRow = (checked: boolean, group: string) => {
          const nextValues = checked
            ? [
                ...formValues.filter(
                  (formValue) => injectedGroupBy(formValue) !== group
                ),
                ...rows.filter((row) => injectedGroupBy(row) === group),
              ]
            : formValues.filter(
                (formValue) => injectedGroupBy(formValue) !== group
              )

          onChange(nextValues)
        }

        const nextRows = groupBy(
          rows.map((row) => ({
            checked: formValues.some((formValue) => formValue.id === row.id),
            key: row.id,
            onChange: handleToggleCell,
            value: row,
          })),
          (row) => injectedGroupBy(row.value)
        )

        return (
          <CheckboxTable
            onChangeRow={hasToggleRowColumn ? handleToggleRow : undefined}
            {...fieldProps}
            {...checkboxTableProps}
            rows={nextRows}
          />
        )
      }}
      {...rest}
    />
  )
}

export default ControlledCheckboxTable
