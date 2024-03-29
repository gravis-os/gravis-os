-- Set up realtime CREATE SCHEMA IF NOT EXISTS realtime;

-- Supabase super admin
ALTER USER supabase_admin WITH superuser createdb createrole replication bypassrls;

-- Extension namespacing
CREATE SCHEMA IF NOT EXISTS extensions;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;

GRANT anon TO authenticator;

GRANT authenticated TO authenticator;

GRANT service_role TO authenticator;

GRANT supabase_admin TO authenticator;

GRANT usage ON SCHEMA public TO postgres, anon, authenticated, service_role;

ALTER DEFAULT privileges IN SCHEMA public GRANT ALL ON tables TO postgres, anon, authenticated, service_role;

ALTER DEFAULT privileges IN SCHEMA public GRANT ALL ON functions TO postgres, anon, authenticated, service_role;

ALTER DEFAULT privileges IN SCHEMA public GRANT ALL ON sequences TO postgres, anon, authenticated, service_role;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- Allow Extensions to be used in the API
GRANT usage ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

-- Set up namespacing
ALTER USER supabase_admin SET search_path TO public, extensions;

-- don't include the "auth" schema
-- These are required so that the users receive grants whenever "supabase_admin" creates tables/function

ALTER DEFAULT privileges FOR USER supabase_admin IN SCHEMA public GRANT ALL ON sequences TO postgres, anon, authenticated, service_role;

ALTER DEFAULT privileges FOR USER supabase_admin IN SCHEMA public GRANT ALL ON tables TO postgres, anon, authenticated, service_role;

ALTER DEFAULT privileges FOR USER supabase_admin IN SCHEMA public GRANT ALL ON functions TO postgres, anon, authenticated, service_role;

-- Set short statement/query timeouts for API roles
ALTER ROLE anon SET statement_timeout = '3s';

ALTER ROLE authenticated SET statement_timeout = '8s';

GRANT EXECUTE ON FUNCTION "auth"."uid" ()
    TO PUBLIC;

GRANT EXECUTE ON FUNCTION "auth"."role" ()
    TO PUBLIC;

GRANT EXECUTE ON FUNCTION "auth"."email" ()
    TO PUBLIC;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.add_authorize_by_permission_policies_on_table_name(table_name_text text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
BEGIN
    EXECUTE FORMAT('ALTER TABLE public.%1$s enable ROW level SECURITY;', table_name_text);
    BEGIN
        EXECUTE FORMAT('
              	CREATE POLICY "Allow ALL on %1$s table to authorized users only" ON public.%1$s FOR ALL USING (authorize_by_permission (''%1$s.*'', auth.uid(), id, workspace_id ) );
              	CREATE POLICY "Allow READ on %1$s table to authorized users only" ON public.%1$s FOR SELECT USING (authorize_by_permission (''%1$s.read'', auth.uid(), id, workspace_id ) );
              	CREATE POLICY "Allow CREATE on %1$s table to authorized users only" ON public.%1$s FOR INSERT WITH CHECK (authorize_by_permission (''%1$s.create'', auth.uid(), id, workspace_id ) );
              	CREATE POLICY "Allow UPDATE on %1$s table to authorized users only" ON public.%1$s FOR UPDATE USING (authorize_by_permission (''%1$s.update'', auth.uid(), id, workspace_id ) );
              	CREATE POLICY "Allow DELETE on %1$s table to authorized users only" ON public.%1$s FOR DELETE USING (authorize_by_permission (''%1$s.delete'', auth.uid(), id, workspace_id ) );
              ', table_name_text);
    EXCEPTION
        -- Column does not exist (No workspace_id on this table)
        WHEN sqlstate '42703' THEN
            EXECUTE FORMAT('
             	CREATE POLICY "Allow ALL on %1$s table to authorized users only" ON public.%1$s FOR ALL USING (authorize_by_permission (''%1$s.*'', auth.uid(), id) );
             	CREATE POLICY "Allow READ on %1$s table to authorized users only" ON public.%1$s FOR SELECT USING (authorize_by_permission (''%1$s.read'', auth.uid(), id) );
             	CREATE POLICY "Allow CREATE on %1$s table to authorized users only" ON public.%1$s FOR INSERT WITH CHECK (authorize_by_permission (''%1$s.create'', auth.uid(), id) );
             	CREATE POLICY "Allow UPDATE on %1$s table to authorized users only" ON public.%1$s FOR UPDATE USING (authorize_by_permission (''%1$s.update'', auth.uid(), id) );
             	CREATE POLICY "Allow DELETE on %1$s table to authorized users only" ON public.%1$s FOR DELETE USING (authorize_by_permission (''%1$s.delete'', auth.uid(), id) );
             ', table_name_text);
        WHEN OTHERS THEN
            RAISE NOTICE 'Exception Caught at Others! %', sqlstate;
    END;
END
$function$;

CREATE OR REPLACE FUNCTION public.add_authorize_to_user_table()
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
DECLARE
    table_name_text text := 'user';
BEGIN
    EXECUTE FORMAT('ALTER TABLE public.%1$s enable ROW level SECURITY;', table_name_text);
    EXECUTE FORMAT('
	             	CREATE POLICY "Allow ALL on %1$s table to authorized users only" ON public.%1$s FOR ALL USING (authorize_by_permission_on_user_table (''%1$s.*''::text, auth.uid(), id) );

	             	CREATE POLICY "Allow READ on %1$s table to authorized users only" ON public.%1$s FOR SELECT USING (authorize_by_permission_on_user_table (''%1$s.read''::text, auth.uid(), id) );

	             	CREATE POLICY "Allow CREATE on %1$s table to authorized users only" ON public.%1$s FOR INSERT WITH CHECK (authorize_by_permission_on_user_table (''%1$s.create''::text, auth.uid(), id) );

	             	CREATE POLICY "Allow UPDATE on %1$s table to authorized users only" ON public.%1$s FOR UPDATE USING (authorize_by_permission_on_user_table (''%1$s.update''::text, auth.uid(), id) );

	             	CREATE POLICY "Allow DELETE on %1$s table to authorized users only" ON public.%1$s FOR DELETE USING (authorize_by_permission_on_user_table (''%1$s.delete''::text, auth.uid(), id) );
  ', table_name_text);
END
$function$;

CREATE OR REPLACE FUNCTION public.authorize_by_permission(requested_permission_title text, auth_id uuid, row_id integer DEFAULT NULL::integer, row_workspace_id integer DEFAULT NULL::integer)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
DECLARE
    bind_permissions int;
    -- This would be 'workspace' after splitting front-end of 'workspace.read'
    table_name_text text := SPLIT_PART(requested_permission_title, '.', 1);
    -- This would be 'read' after splitting tail-end of 'workspace.read'
    operation_text text := SPLIT_PART(requested_permission_title, '.', 2);
    -- A list of approved read-only tables required for user checks to function
    permitted_read_only_tables text [] := ARRAY ['workspace', 'role', 'role_permission', 'permission', 'tier', 'tier_feature', 'feature', 'person'];
    -- Allow read if this is a infrastructural table needed for the app to function.
    -- Don't need check permissions if this is a permitted action and table
    /*
     * We want certain tables to be read only
     * Here we are checking that this is a read action
     * and that the table name is in a list of approved-system read-only tables
     */
    is_permitted_read_only_table boolean := (operation_text ILIKE '%read%'
        AND table_name_text = ANY (permitted_read_only_tables));
BEGIN
    /*
     * [Scenario 1]: Action is Read, on permitted system tables. User has no permissions.
     * ------------------------------------------------------------------------------------
     * For is_permitted_read_only_tables, ensure only read into the tenant's scope
     */
    IF is_permitted_read_only_table THEN
        RETURN authorize_by_workspace(requested_permission_title, auth_id, row_id, row_workspace_id);
        /*
         * [Default Scenario]: Check Permissions table
         * -----------------------------------------------------------------------------------
         */
    ELSE
        SELECT
            count(*)
        FROM
            public.role_permission AS rp
                INNER JOIN public.permission AS perm ON rp.permission_id = perm.id
                INNER JOIN public.person AS person ON rp.role_id = person.role_id
                INNER JOIN public.user AS usr ON person.user_id = usr.id
                INNER JOIN public.workspace AS ws ON person.workspace_id = ws.id
        WHERE
          --  [Filter 1]. filter by authenticated user (disambiguate the column names)
                usr.auth_id = authorize_by_permission.auth_id
          --  [Filter 2]. filter by permission: allow show rows that have this filter
          AND(
            -- current user's permissions === requested permission
                    perm.title = requested_permission_title
                -- is admin
                OR perm.title = '*'
                -- allow user to update their own workspace only if given workspace:self.*.
                OR (
                        CASE
                            WHEN (
                                        table_name_text = 'workspace'
                                    AND SPLIT_PART(REPLACE(perm.title, ':self', ''), '.', 1) = 'workspace'
                                )
                                -- User workspace_id = Current workspace.id. This limits the scope to the user's workspace only.
                                THEN ws.id = row_id
                            ELSE false
                            END
                        )
            )
          --  [Filter 3]. filter by workspace: allow show rows that have this filter
          AND(
            -- the item has no notion of a workspace
                row_workspace_id IS NULL
                -- is the correct workspace
                OR row_workspace_id = ws.id
                -- is admin
                OR ws.title = 'Admin'
            )
        INTO bind_permissions;

        RETURN bind_permissions > 0;
    END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.authorize_by_permission_on_user_table(requested_permission_title text, auth_id uuid, row_id integer DEFAULT NULL::integer)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
DECLARE
    bind_permissions int;
    is_public_role boolean;
    -- This would be 'workspace' after splitting front-end of 'workspace.read'
    table_name_text text := SPLIT_PART(requested_permission_title, '.', 1);
    -- This would be 'read' after splitting tail-end of 'workspace.read'
    operation_text text := SPLIT_PART(requested_permission_title, '.', 2);
BEGIN
    /*
     * Allow read user to read himself granted.
     */
    SELECT
        count(*)
    FROM
        public.role_permission AS rp
            INNER JOIN public.permission AS perm ON rp.permission_id = perm.id
            INNER JOIN public.person AS person ON rp.role_id = person.role_id
            INNER JOIN public.user AS usr ON person.user_id = usr.id
            INNER JOIN public.workspace AS ws ON person.workspace_id = ws.id
    WHERE
      --  1. is authenticated user
            usr.auth_id = authorize_by_permission_on_user_table.auth_id
      --  2. has permission or it's self-read
      AND(perm.title = requested_permission_title
        OR perm.title = '*'
        OR row_id = person.user_id) INTO bind_permissions;

    /*
     * Allow the user to read himself if the role is called 'Member'.
     * Otherwise, when Member role has no permissions, no user will be returned
     * and the user won't even be able to login as his/her own user data is blocked.
     */
    SELECT EXISTS (
                   SELECT
                       person.id
                   FROM
                       public.person AS person
                           INNER JOIN public.role AS ROLE ON person.role_id = role.id
                           INNER JOIN public.user AS usr ON person.user_id = usr.id
                   WHERE
                           usr.auth_id = authorize_by_permission_on_user_table.auth_id
                     AND role.title = 'Member'
                     AND row_id = person.user_id
               ) INTO is_public_role;

    RETURN bind_permissions > 0 OR is_public_role;
END;
$function$;

CREATE OR REPLACE FUNCTION public.authorize_by_workspace(requested_permission_title text, auth_id uuid, row_id integer DEFAULT NULL::integer, row_workspace_id integer DEFAULT NULL::integer)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
DECLARE
    -- This would be 'workspace' after splitting front-end of 'workspace.read'
    table_name_text text := SPLIT_PART(requested_permission_title, '.', 1);
    -- This would be 'read' after splitting tail-end of 'workspace.read'
    operation_text text := SPLIT_PART(requested_permission_title, '.', 2);
    -- A list of approved read-only tables required for user checks to function
    permitted_read_only_tables text [] := ARRAY ['workspace', 'role', 'role_permission', 'permission', 'tier', 'tier_feature', 'feature', 'person'];
    -- Allow read if this is a infrastructural table needed for the app to function.
    -- Don't need check permissions if this is a permitted action and table
    /*
     * We want certain tables to be read only
     * Here we are checking that this is a read action
     * and that the table name is in a list of approved-system read-only tables
     */
    is_permitted_read_only_table boolean := (operation_text ILIKE '%read%'
        AND table_name_text = ANY (permitted_read_only_tables));
    -- Ensure that permitted read only tables are tenant isolated
    is_permitted_read_only_table_tenant_isolated boolean;
BEGIN
    IF table_name_text = 'role' THEN
        -- Allow public read on role table except for Admin and Super Admin roles specifically.
        -- This is so that the Workspace Owner, can select roles for assignment to e.g. Workspace Manager.
        SELECT
            (row_id = ANY (
                SELECT
                    id
                FROM
                    ROLE
                WHERE
                    NOT(role.title = ANY (ARRAY ['Admin', 'Super Admin'])))) INTO is_permitted_read_only_table_tenant_isolated;

        RETURN is_permitted_read_only_table_tenant_isolated;
    ELSE
        -- Allow self-reads only on the permitted read_only_tables.
        EXECUTE FORMAT('SELECT
 	         		($1 = ANY (SELECT DISTINCT
 	         					usr.auth_id
 	         				FROM
 	         					public.role_permission
 	         					INNER JOIN public.permission ON role_permission.permission_id = permission.id
 	         					INNER JOIN public.person ON role_permission.role_id = person.role_id
 	         					INNER JOIN public.user AS usr ON person.user_id = usr.id
 	         					INNER JOIN public.role ON person.role_id = role.id
 	         					INNER JOIN public.workspace ON person.workspace_id = workspace.id
 	         					INNER JOIN public.tier ON workspace.tier_id = tier.id
 	         					LEFT JOIN public.tier_feature ON tier_feature.tier_id = tier.id
 	         					LEFT JOIN public.feature ON feature.id = tier_feature.feature_id
 	         					LEFT JOIN public.company ON person.company_id = company.id
 	         				WHERE
 	         					usr.auth_id = $1
 	         					AND (
 	         						workspace.title = ''Admin''
 	         						OR ($2 AND $3 = %I.id)
 	         					)
 	       					))', table_name_text)
            USING auth_id, is_permitted_read_only_table, row_id
            INTO is_permitted_read_only_table_tenant_isolated;

        RETURN is_permitted_read_only_table_tenant_isolated;
    END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.bulk_authorize_tables(table_name_texts text[] DEFAULT ARRAY['company'::text, 'person'::text])
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
DECLARE
    table_name_text text;
BEGIN
    FOREACH table_name_text IN ARRAY table_name_texts LOOP
            BEGIN
                EXECUTE drop_authorize_by_permission_policies_on_table_name (table_name_text);
                EXECUTE add_authorize_by_permission_policies_on_table_name (table_name_text);
            EXCEPTION
                -- Object does not exist
                WHEN sqlstate '42704' THEN
                    EXECUTE add_authorize_by_permission_policies_on_table_name (table_name_text);
                WHEN OTHERS THEN
                    raise notice 'Exception Caught at Others! %', SQLERRM;
            END;
        END LOOP;
END
$function$;

CREATE OR REPLACE FUNCTION public.bulk_public_read_tables(table_name_texts text[])
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
DECLARE
    table_name_text text;
BEGIN
    FOREACH table_name_text IN ARRAY table_name_texts LOOP
            BEGIN
                EXECUTE FORMAT('
              	CREATE POLICY "Allow READ on %1$s table to anon users" ON public.%1$s AS PERMISSIVE FOR SELECT TO anon USING (is_active = true);
              ', table_name_text);
            EXCEPTION
                WHEN OTHERS THEN
                    raise notice 'Exception Caught at Others! %', SQLERRM;
            END;
        END LOOP;
END
$function$;

CREATE OR REPLACE FUNCTION public.drop_authorize_by_permission_policies_on_table_name(table_name_text text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
BEGIN
    EXECUTE FORMAT('ALTER TABLE public.%1$s disable ROW level SECURITY;', table_name_text);
    EXECUTE FORMAT('
        	DROP POLICY "Allow ALL on %1$s table to authorized users only" ON public.%1$s;
        	DROP POLICY "Allow READ on %1$s table to authorized users only" ON public.%1$s;
        	DROP POLICY "Allow CREATE on %1$s table to authorized users only" ON public.%1$s;
        	DROP POLICY "Allow UPDATE on %1$s table to authorized users only" ON public.%1$s;
        	DROP POLICY "Allow DELETE on %1$s table to authorized users only" ON public.%1$s;
        ', table_name_text);
END
$function$;

CREATE OR REPLACE FUNCTION public.handle_delete_user()
    RETURNS trigger
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM public.user
    WHERE public.user.auth_id = old.id;
    RETURN old;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.user(auth_id, email, title, slug, avatar_src)
    values(new.id, new.email, new.email, new.email, new.raw_user_meta_data ->> 'avatar_src');
    RETURN new;
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_admin(auth_id uuid)
    RETURNS boolean
    LANGUAGE plpgsql
    STABLE SECURITY DEFINER
AS $function$
DECLARE
    is_admin boolean;
BEGIN
    SELECT
        EXISTS (
                SELECT
                    1
                FROM
                    person
                        LEFT JOIN ROLE ON person.role_id = role.id
                        INNER JOIN user AS usr ON person.user_id = usr.id
                WHERE
                        usr.auth_id = is_admin.auth_id
                  AND(role.title = 'Admin'
                    OR role.title = 'Super Admin')) INTO is_admin;
    RETURN coalesce(is_admin, FALSE);
END
$function$;

DO $$
    BEGIN
        PERFORM bulk_authorize_tables (ARRAY ['enquiry', 'workspace', 'role', 'role_permission', 'permission', 'tier', 'tier_feature', 'feature', 'person', 'company']);
	    PERFORM add_authorize_to_user_table();
    END
$$;

-- 1. Allow public access to any files in the "public" bucket
CREATE POLICY "Anyone can read any image"
    ON storage.objects FOR SELECT
    USING ( bucket_id = 'public' );

-- 2. Allow insert access to the "public" bucket
CREATE POLICY "User can insert any image"
    ON storage.objects FOR INSERT
    WITH CHECK ( bucket_id = 'public' AND auth.role() = 'authenticated' );

-- Enable public read access to domain-specific tables
DO $$
    BEGIN
        PERFORM
            bulk_authorize_tables (ARRAY [
                'workspace',
                'person',
                'site',
                'blog',
                'blog_category',
                'post',
                'directory',
                'directory_category',
                'listing',
                'blog',
                'blog_category',
                'post',
                'menu',
                'menu_item',
                'page',
                'forum',
                'forum_category',
                'thread',
                'thread_comment',
                'announcement',
                'brand'
            ]);
            bulk_public_read_tables (ARRAY [
                'workspace',
                'person',
                'site',
                'blog',
                'blog_category',
                'post',
                'directory',
                'directory_category',
                'listing',
                'menu',
                'menu_item',
                'page',
                'forum',
                'forum_category',
                'thread',
                'thread_comment',
                'announcement',
                'brand'
            ]);
    END
$$;
