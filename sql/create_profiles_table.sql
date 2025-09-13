-- Run this in Supabase SQL editor to create a profiles table
create table if not exists profiles (
  id uuid references auth.users on delete cascade,
  email text,
  full_name text,
  primary key (id)
);
