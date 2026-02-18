Smart Bookmarks

A simple Next.js application that lets users save and view bookmarks using Supabase as the backend.

 Live Demo

https://smart-bookmarks-five-iota.vercel.app

GitHub Repository

https://github.com/pavani7394610/smart-bookmarks

Features

Add bookmarks (title + URL)

Save data securely to Supabase

View your saved bookmarks

Fully deployed on Vercel

Tech Stack

Next.js

Supabase (Database + Auth-ready environment)

React

TypeScript

Hosted on Vercel

What Problems I Faced & How I Solved Them
1. Module not found (@/lib/supabaseClient)

At first, Next.js couldn’t find my Supabase client file.
This happened because my folder alias (@/) was not set up
After restarting the dev server, the error was gone.

2. Supabase keys missing (supabaseUrl is required)

My local development kept failing because environment variables weren’t loading.

 Fix:
Created a .env.local file and added

Supabase uses Row Level Security, so To save my bookmarks first.

I need proper policies for INSERT and SELECT.

Fix:
Added simple policies allowing public access

Deployment failing on Vercel (supabase URL missing)

When deploying, Vercel showed a build error because environment variables were not added
Vercel requires you to manually add them
 Fix:
Added both Supabase variables under:
Vercel → Project → Settings → Environment Variables

Re-deployed → succeeded