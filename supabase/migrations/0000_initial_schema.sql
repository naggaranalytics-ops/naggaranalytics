-- Supabase Schema for Naggar Analytics Dashboard

-- 1. Create custom Enums for strict typing
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE degree_type AS ENUM ('Masters', 'PhD', 'Other');
CREATE TYPE project_status AS ENUM ('Pending', 'Payment Verified', 'Analysis In Progress', 'Review', 'Completed');
CREATE TYPE payment_phase AS ENUM ('Deposit 70%', 'Final 30%', 'Paid in Full');
CREATE TYPE file_type AS ENUM ('Raw Data', 'Supporting Doc', 'Final Result');

-- 2. Create the Profiles table 
-- (This links your Kinde users to Supabase)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY, -- matches Kinde ID
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role user_role DEFAULT 'user'::user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the Projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    thesis_title TEXT NOT NULL,
    degree degree_type NOT NULL,
    status project_status DEFAULT 'Pending'::project_status NOT NULL,
    selected_tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_price NUMERIC NOT NULL,
    payment_phase payment_phase DEFAULT 'Paid in Full'::payment_phase NOT NULL,
    receipt_url TEXT,
    is_verified BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create the Project Files table
CREATE TABLE public.project_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    file_url TEXT NOT NULL,
    file_type file_type NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Set up Row Level Security (RLS) Rules

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Projects Policies
CREATE POLICY "Users can insert their own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects (if pending)" ON public.projects FOR UPDATE USING (auth.uid() = user_id AND status = 'Pending'::project_status);
CREATE POLICY "Admins have full access to projects" ON public.projects FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Project Files Policies
CREATE POLICY "Users can insert files for their projects" ON public.project_files FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_files.project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can view files for their projects" ON public.project_files FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_files.project_id AND user_id = auth.uid())
);
CREATE POLICY "Admins have full access to files" ON public.project_files FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 6. Trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_modtime
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
