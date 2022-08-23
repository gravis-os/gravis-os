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
                WHERE
                        person.user_id = auth_id
                  AND(role.title = 'Admin'
                    OR role.title = 'Super Admin')) INTO is_admin;
    RETURN coalesce(is_admin, FALSE);
END
$function$;

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
             	CREATE POLICY "Allow ALL on %1$s table to authorized users only" ON public.%1$s FOR ALL USING (authorize_by_permission_on_user_table (''%1$s.*'', auth.uid(), id) );
             	CREATE POLICY "Allow READ on %1$s table to authorized users only" ON public.%1$s FOR SELECT USING (authorize_by_permission_on_user_table (''%1$s.read'', auth.uid(), id) );
             	CREATE POLICY "Allow CREATE on %1$s table to authorized users only" ON public.%1$s FOR INSERT WITH CHECK (authorize_by_permission_on_user_table (''%1$s.create'', auth.uid(), id) );
             	CREATE POLICY "Allow UPDATE on %1$s table to authorized users only" ON public.%1$s FOR UPDATE USING (authorize_by_permission_on_user_table (''%1$s.update'', auth.uid(), id) );
             	CREATE POLICY "Allow DELETE on %1$s table to authorized users only" ON public.%1$s FOR DELETE USING (authorize_by_permission_on_user_table (''%1$s.delete'', auth.uid(), id) );
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
    permitted_read_only_tables text [] := ARRAY ['workspace', 'role', 'role_permission', 'permission', 'tier', 'tier_feature', 'feature'];
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
     * Authorization Layer 1: Permissions
     */
    SELECT
        count(*)
    FROM
        public.role_permission AS rp
            INNER JOIN public.permission AS perm ON rp.permission_id = perm.id
            INNER JOIN public.person AS person ON rp.role_id = person.role_id
            INNER JOIN public.workspace AS ws ON person.workspace_id = ws.id
    WHERE
      --  1. is authenticated user
            person.user_id = auth_id
      --  2. has permission
      AND(perm.title = requested_permission_title
        OR perm.title = '*'
        OR is_permitted_read_only_table)
      --  3. belongs to correct workspace
      AND(row_workspace_id IS NULL
        OR row_workspace_id = ws.id
        OR ws.title = 'Admin') INTO bind_permissions;

    IF is_permitted_read_only_table THEN
        RETURN authorize_by_workspace(requested_permission_title, auth_id, row_id, row_workspace_id);
    ELSE
        RETURN bind_permissions > 0;
    END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.authorize_by_permission_on_user_table(requested_permission_title text, auth_id uuid, row_id uuid DEFAULT NULL::uuid, row_workspace_id integer DEFAULT NULL::integer)
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
    permitted_read_only_tables text [] := ARRAY ['workspace', 'role', 'role_permission', 'permission', 'tier', 'tier_feature', 'feature'];
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
     * Authorization Layer 1: Permissions
     */
    SELECT
        count(*)
    FROM
        public.role_permission AS rp
            INNER JOIN public.permission AS perm ON rp.permission_id = perm.id
            INNER JOIN public.person AS person ON rp.role_id = person.role_id
            INNER JOIN public.workspace AS ws ON person.workspace_id = ws.id
    WHERE
      --  1. is authenticated user
            person.user_id = auth_id
      --  2. has permission or it's self-read
      AND(perm.title = requested_permission_title
        OR perm.title = '*'
        OR row_id = person.user_id) INTO bind_permissions;
    RETURN bind_permissions > 0;
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
    permitted_read_only_tables text [] := ARRAY ['workspace', 'role', 'role_permission', 'permission', 'tier', 'tier_feature', 'feature'];
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
    /*
     * Authorization Layer 2: Read-Only Scope by Workspace for Permitted Read Only Tables
     * For is_permitted_read_only_tables, ensure only read into the tenant's scope
     */
    EXECUTE FORMAT('SELECT
        		($1 = ANY (SELECT DISTINCT
        					person.user_id
        				FROM
        					public.role_permission
        					INNER JOIN public.permission ON role_permission.permission_id = permission.id
        					INNER JOIN public.person ON role_permission.role_id = person.role_id
        					INNER JOIN public.role ON person.role_id = role.id
        					INNER JOIN public.workspace ON person.workspace_id = workspace.id
        					INNER JOIN public.tier ON workspace.tier_id = tier.id
        					INNER JOIN public.company ON person.company_id = company.id
        				WHERE
        					person.user_id = $1
        					AND (
        					workspace.title = ''Admin''
        					OR
        					($2
        					AND $3 = %I.id)
        					)
      					))', table_name_text)
        USING auth_id,
            is_permitted_read_only_table,
            row_id INTO is_permitted_read_only_table_tenant_isolated;
    RETURN is_permitted_read_only_table_tenant_isolated;
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
                    raise notice 'Exception Caught at Others! %', SQL;
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
    WHERE public.user.id = old.id;
    RETURN old;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.user(id, email, title, slug, avatar_src)
    values(new.id, new.email, new.email, new.email, new.raw_user_meta_data ->> 'avatar_src');
    RETURN new;
END;
$function$;

DO $$
    BEGIN
        PERFORM bulk_authorize_tables (ARRAY ['workspace', 'role', 'role_permission', 'permission', 'tier', 'tier_feature', 'feature', 'person', 'company']);
	    PERFORM add_authorize_to_user_table();
    END
$$;
