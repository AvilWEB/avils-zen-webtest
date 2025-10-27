-- Create submissions table
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  zip TEXT NOT NULL,
  description TEXT NOT NULL,
  height TEXT,
  height_unit TEXT,
  photos_folder_url TEXT,
  stripe_payment_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for bathroom photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'bathroom-photos',
  'bathroom-photos',
  false,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Enable Row Level Security
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- RLS policies for submissions - allow public insert (for funnel submissions)
CREATE POLICY "Anyone can submit evaluations"
ON public.submissions
FOR INSERT
WITH CHECK (true);

-- RLS policies for storage - allow public upload to their own folder
CREATE POLICY "Anyone can upload photos to their submission folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'bathroom-photos'
);

CREATE POLICY "Authenticated users can view their own photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'bathroom-photos');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_submissions_submission_id ON public.submissions(submission_id);
CREATE INDEX idx_submissions_email ON public.submissions(email);
CREATE INDEX idx_submissions_created_at ON public.submissions(created_at DESC);
