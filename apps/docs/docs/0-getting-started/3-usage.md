# Usage

## Basic Usage
All Gravis exports are available as **named imports** via the respective package.

```tsx
import { Button, Alert, Box } from '@gravis-os/ui'
import { printNumber } from '@gravis-os/utils'
```

:::tip
Refer to the [MUI Docs](https://mui.com/material-ui/getting-started/overview/) if you are unable to find a component that you're looking for.
:::

## Key Concepts

1. Each component **extends off the API of its corresponding [Ant Design](https://ant.design/components/overview/) counterpart** and is **injected with [MUI's `sx` prop](https://mui.com/system/getting-started/the-sx-prop/)** which enables styling via emotion/jss and access to the [global theme object](https://mui.com/material-ui/customization/default-theme/). You may also find components **extended with custom props**.

*Example of extending an Ant Design Divider component*:
```tsx
import React from 'react'
import { Divider as AntdDivider, DividerProps as AntdDividerProps } from 'antd'
import { withStyledTheme, ThemeInterface } from '../styles/withTheme'

export interface DividerProps extends AntdDividerProps, ThemeInterface {}

const StyledDivider = withStyledTheme(AntdDivider)()

const Divider: React.FC<DividerProps> = (props) => {
  return <StyledDivider {...props} />
}

export default Divider
```
2. Gravis has several types of exports.

3. Gravis is governed by a set of principles.

### Example 1: Extending layout

```tsx
// DashboardLayout.tsx
import { DashboardTemplate } from '@gravis-os'

const DashboardLayout = () => {
	return (
		<DashboardTemplate leftAsideMenuItems={...}>
			...
		</DashboardTemplate>
	)
}
```

### Example 2: Extending core components

```tsx
// MyCard.tsx
import { Card, Typography } from '@gravis-os'

const MyCard = (props) => (
	<Card {...props}>
		<Typography variant="h4">Title</Typography>
	</Card>
)
```

### Example 3: Extending types

```tsx
import { Alert, AlertProps } from '@gravis-os'

export interface MyAlertProps extends AlertProps {}

const MyAlert: React.FC<MyAlertProps> = (props) => (
	<Alert {...props}>
		...
	</Alert>
)
```
