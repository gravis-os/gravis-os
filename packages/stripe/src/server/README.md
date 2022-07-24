# @gravis-os/stripe/server

## Troubleshooting

##### Module not found: Can't resolve 'child_process' in 'MyApp/node_modules/stripe/lib'
- This folder should not be exported in the barrel or it will be called in SSR apps like NextJS.
- Ideally, this package can continue to be isomorphic + SSR-friendly.
- In the meantime, do not import this package directly from the barrel.
