# Roadmap

## Launch Todos

- [x]  Documentation @clodal
- [ ]  Marketing Page @clodal
- [ ]  Tests (RTL) @clodal
- [ ]  Storybook @clodal
- [ ]  Fix Typings (No any) @alxdr
- [ ]  Headless export (@gravis-os/core|system|hooks|headless) @alxdr

## RFC
```
# RFC for next evolution of @Gravis-OS
Separation of logic from UI to allow reuse of logic for different UI designs. Most suitable for use by Agencies to spin out new dashboards with different UIs or to reuse a standard white label dashboard.

## Headless UI @Gravis-OS/base
### Lower level hooks
1. Table hook
2. Crud hook
3. Form hook
4. Layout hook
### Higher level page hooks
1. List Page hook
2. Detail Page hook
## White-label @Gravis-OS/packages
1. List Page
2. Detail Page
3. UI components
```

```tsx
import { useGravisListPage } from '@gravis-os/crud'

const {
	// States
	items,
	selectedItems,
	columns,

	// Methods
	onSearch,
	onFilter,
	onAdd,
	onDelete,

	// Preview Drawer
	isPreviewDrawerOpen,
	previewDrawerChildren

} = useGravisListPage({
	fetchListItems: fetchListPackages,

	filterDefs: [],
	columnDefs: [],

	addFormSections: [],
	previewFormSections: [],
})
```

