
-- Enable RLS on debug_telegram_log
ALTER TABLE public.debug_telegram_log ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.debug_telegram_log FROM anon, authenticated;
GRANT ALL ON public.debug_telegram_log TO service_role;
CREATE POLICY "Admins can view debug log" ON public.debug_telegram_log
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Switch has_role to SECURITY INVOKER (safe: all call sites pass auth.uid(),
-- and user_roles RLS lets users read their own rows)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- update_updated_at_column is a trigger function; revoke direct EXECUTE
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Storage policies: lock down bathroom-photos
DROP POLICY IF EXISTS "Anyone can upload photos to their submission folder" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view their own photos" ON storage.objects;

-- Reads restricted to admins only (edge functions use service role and bypass RLS)
CREATE POLICY "Admins can view bathroom photos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'bathroom-photos'
  AND public.has_role(auth.uid(), 'admin')
);

-- No INSERT policy: uploads go through process-submission edge function (service role bypasses RLS)
