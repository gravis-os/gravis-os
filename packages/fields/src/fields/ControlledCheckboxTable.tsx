/* @typescript-eslint/no-empty-function */
import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import groupBy from 'lodash/groupBy'
import { CheckboxTable, CheckboxTableProps } from '@gravis-os/ui'

export interface ControlledCheckboxTableOptions<T = { id: string | number }>
  extends Pick<CheckboxTableProps<unknown>, 'isReadOnly' | 'title'> {
  hasToggleRowColumn?: boolean
  columns: string[]
  rows: T[]
  groupBy: (value: T) => string
}

export interface ControlledCheckboxTableProps extends UseControllerProps {
  checkboxTableProps: ControlledCheckboxTableOptions
}

const ControlledCheckboxTable: React.FC<ControlledCheckboxTableProps> = (
  props
) => {
  const { control, name, checkboxTableProps, ...rest } = props

  const {
    hasToggleRowColumn,
    rows,
    groupBy: injectedGroupBy,
  } = checkboxTableProps

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange, value: formValues = [], ...fieldProps } = field

        const handleToggleCell = <T extends { id: string | number }>(
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
            value: row,
            key: row.id,
            checked: formValues.some((formValue) => formValue.id === row.id),
            onChange: handleToggleCell,
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
