-- Create role enum for admin system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table to store role assignments
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Add SELECT policy for admins to view all submissions
CREATE POLICY "Admins can view all submissions"
ON public.submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Add UPDATE policy for admins to update submission status
CREATE POLICY "Admins can update submissions"
ON public.submissions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policy for admins to delete spam/test submissions
CREATE POLICY "Admins can delete submissions"
ON public.submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Only admins can insert new role assignments
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));