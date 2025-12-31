-- Add name column to submissions table
ALTER TABLE public.submissions 
ADD COLUMN name text;