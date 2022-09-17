# Building

## Troubleshooting
#### Build error occurred. Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables are required!
When building the app and receiving the above error, check that you have added the following into the corresponding package.
```bash
# .env
NEXT_PUBLIC_SUPABASE_URL=MOCK
NEXT_PUBLIC_SUPABASE_ANON_KEY=MOCK
```
