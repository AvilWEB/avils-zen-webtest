-- Lock down direct submissions inserts: edge function uses service_role (bypasses RLS).
DROP POLICY IF EXISTS "Anyone can submit evaluations" ON public.submissions;
CREATE POLICY "Block direct inserts to submissions"
  ON public.submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- Add missing INSERT/UPDATE/DELETE policies on bathroom-photos storage bucket.
-- Service role (used by edge functions) bypasses RLS, so uploads still work.
-- Only admins can write/replace/delete via authenticated session.
CREATE POLICY "Admins can upload bathroom photos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'bathroom-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update bathroom photos"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'bathroom-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'bathroom-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete bathroom photos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'bathroom-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));