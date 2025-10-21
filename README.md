# Creo - AI Image Generation App

A modern AI-powered image generation application built with Next.js and Supabase. Transform your creative ideas into stunning visuals with an intuitive, professional interface.

## Features

- **User Authentication**: Secure sign up and sign in with Supabase
- **AI Image Generation**: Create images from text prompts using AI
- **Image Gallery**: Save and manage your generated images
- **Download Images**: Export your creations to your device
- **User-specific Data**: Each user sees only their own generations
- **Modern UI**: Clean, professional design with emerald/teal color scheme
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Database + Authentication)
- **Deployment**: Vercel

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Supabase**:
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key from Settings > API

3. **Configure environment variables**:
   Create `.env.local` with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up database**:
   - Run the SQL from `supabase-schema.sql` in your Supabase SQL Editor

5. **Start development server**:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Usage

1. Sign up or sign in to your account
2. Enter a text prompt to generate images
3. View your generated images in the gallery
4. Download or delete images as needed

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page with authentication
│   ├── generations/page.tsx   # Main app with image generation
│   └── api/generate-image/    # API route for image generation
├── lib/
│   ├── supabase.ts           # Supabase client config
│   └── supabase-server.ts    # Server-side Supabase config
└── middleware.ts             # Authentication middleware
```