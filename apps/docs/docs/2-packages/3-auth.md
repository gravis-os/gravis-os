# @gravis-os/auth

## Troubleshooting
#### When making Supabase queries, data response is returning as `[]`.
If you have data in the db and the request status is 200, but the response is returning only `[]`, then check on the Row Level Security (RLS) feature of this table in the Supabase Dashboard. This is most likely a authorization issue.

#### Immediately after login, you're getting redirected to the http://localhost:3000/auth/unauthorized route.
If you notice that the user data is retrieved successfully, but you somehow got redirected to AUTHORIZATION_FAILURE_REDIRECT route, it means that you are authenticated but not authorized.

Ensure that you have done the following:
1. Granted a Role to the Person with sufficient Permissions to access the app.
