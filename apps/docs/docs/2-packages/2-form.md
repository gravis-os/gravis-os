# @gravis-os/form

## Installation

1. Install the following peer dependencies in your app:

  `yarn add react-hook-form react-hot-toast react-quilljs quill react-number-format`

2. In `_app.tsx`, import css required for HtmlField:

  `import 'react-quill/dist/quill.snow.css'`

## FAQs

### How to mount a field as defaultValue but hide it from the UI?

In FormSections, use the `hidden` prop which corresponds to the `<input type="hidden" />` field.

```tsx
export const formSections = [
	{
    key: 'workspace_id',
    name: 'workspace_id',
    type: 'model',
    module: workspaceModule,
    required: true,
    // Set defaultValue and hide this field based on user role.
		hidden: ({ user }: UserContextInterface) => user?.isNotAdmin,
  },
]
```
