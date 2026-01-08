-- Add priorities column for client qualification
ALTER TABLE public.submissions 
ADD COLUMN priorities text;