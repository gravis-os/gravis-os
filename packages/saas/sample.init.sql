CREATE OR REPLACE FUNCTION public.authorize_by_permission(requested_permission_title text, auth_id uuid, row_workspace_id integer DEFAULT NULL::integer)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
DECLARE
    bind_permissions int;
BEGIN
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
      AND(perm.title = requested_permission_title OR perm.title = '*')
--  3. belongs to correct workspace
      AND(row_workspace_id IS NULL OR row_workspace_id = ws.id OR ws.title = 'Admin')
    INTO bind_permissions;
    RETURN bind_permissions > 0;
END;
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
              	CREATE POLICY "Allow ALL on %1$s table to authorized users only" ON public.%1$s FOR ALL USING (authorize_by_permission (''%1$s.*'', auth.uid(), workspace_id ) );
              	CREATE POLICY "Allow READ on %1$s table to authorized users only" ON public.%1$s FOR SELECT USING (authorize_by_permission (''%1$s.read'', auth.uid(), workspace_id ) );
              	CREATE POLICY "Allow CREATE on %1$s table to authorized users only" ON public.%1$s FOR INSERT WITH CHECK (authorize_by_permission (''%1$s.create'', auth.uid(), workspace_id ) );
              	CREATE POLICY "Allow UPDATE on %1$s table to authorized users only" ON public.%1$s FOR UPDATE USING (authorize_by_permission (''%1$s.update'', auth.uid(), workspace_id ) );
              	CREATE POLICY "Allow DELETE on %1$s table to authorized users only" ON public.%1$s FOR DELETE USING (authorize_by_permission (''%1$s.delete'', auth.uid(), workspace_id ) );
              ', table_name_text);
    EXCEPTION
        -- Column does not exist (No workspace_id on this table)
        WHEN sqlstate '42703' THEN
            EXECUTE FORMAT('
             	CREATE POLICY "Allow ALL on %1$s table to authorized users only" ON public.%1$s FOR ALL USING (authorize_by_permission (''%1$s.*'', auth.uid()) );
             	CREATE POLICY "Allow READ on %1$s table to authorized users only" ON public.%1$s FOR SELECT USING (authorize_by_permission (''%1$s.read'', auth.uid()) );
             	CREATE POLICY "Allow CREATE on %1$s table to authorized users only" ON public.%1$s FOR INSERT WITH CHECK (authorize_by_permission (''%1$s.create'', auth.uid()) );
             	CREATE POLICY "Allow UPDATE on %1$s table to authorized users only" ON public.%1$s FOR UPDATE USING (authorize_by_permission (''%1$s.update'', auth.uid()) );
             	CREATE POLICY "Allow DELETE on %1$s table to authorized users only" ON public.%1$s FOR DELETE USING (authorize_by_permission (''%1$s.delete'', auth.uid()) );
             ', table_name_text);
        WHEN OTHERS THEN
            RAISE NOTICE 'Exception Caught at Others! %', sqlstate;
    END;
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

CREATE OR REPLACE FUNCTION public.bulk_authorize_tables(table_name_texts text[] DEFAULT ARRAY['company'::text, 'person'::text])
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS $function$
DECLARE
    table_name_text text;
    text_var1 text;
    text_var2 text;
    text_var3 text;
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
                    raise notice 'Exception Caught at Others! %', sqlstate;
            END;
        END LOOP;
END
$function$;

DO $$
    BEGIN
        PERFORM bulk_authorize_tables (ARRAY ['company', 'person']);
        --  PERFORM drop_authorize_by_permission_policies_on_table_name('permission');
    END
$$;
