# PixelForge - AI Creative Studio

A modern, professional AI-powered image generation application built with Next.js and Supabase. Transform your creative ideas into stunning visuals with our intuitive workspace.

## Features

- **Professional Authentication**: Secure sign up and sign in functionality
- **AI Image Generation**: Create placeholder images from text prompts (demo version)
- **Creative Library**: Save and manage your generated images in a beautiful gallery
- **Download Images**: Export your creations to your device
- **User-specific Data**: Each user sees only their own generations
- **Modern UI**: Clean, professional design with emerald/teal color scheme
- **Real-time Updates**: Images are saved to Supabase database
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Supabase (Database + Authentication)
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd todolist
npm install
```

### 2. Set up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Go to Settings > API to get your project URL and anon key

### 3. Set up Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Set up Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql` into the SQL editor
4. Run the SQL to create the generations table and set up Row Level Security

### 5. Configure Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Make sure "Enable email confirmations" is turned ON for production
3. Add your domain to "Site URL" (e.g., `http://localhost:3000` for development)

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Sign Up**: Create a new account with your email and password
2. **Sign In**: Log in with your existing credentials
3. **Generate Images**: Enter a text prompt to create placeholder images (demo version)
4. **View Gallery**: Browse your generated images in the professional gallery
5. **Download Images**: Save your favorite creations to your device
6. **Manage Library**: Delete images you no longer want
7. **Sign Out**: Log out when you're done

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page with split-screen design
│   ├── generations/
│   │   └── page.tsx      # Creative studio workspace
│   ├── api/
│   │   └── generate-image/
│   │       └── route.ts  # API route for image generation
│   └── layout.tsx        # Root layout
├── lib/
│   ├── supabase.ts       # Client-side Supabase config
│   └── supabase-server.ts # Server-side Supabase config
└── middleware.ts         # Authentication middleware
```

## Database Schema

The `generations` table includes:
- `id`: UUID primary key
- `prompt`: Original text prompt used for generation (required)
- `image_url`: URL of the generated image (required)
- `description`: AI-generated description of the image
- `user_id`: Foreign key to auth.users
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Design System

### Color Palette
- **Primary**: Emerald (500-600)
- **Secondary**: Teal (500-600)
- **Accent**: Cyan (500-600)
- **Background**: Light gradients from emerald-50 to cyan-50
- **Text**: Gray-800 for headings, Gray-600 for body text

### Typography
- **Headings**: Bold, clean fonts with proper hierarchy
- **Body**: Readable, professional text
- **UI Elements**: Consistent sizing and spacing

### Layout
- **Split-screen landing page**: Branding on left, auth on right
- **Studio workspace**: Clean header with gallery grid
- **Cards**: Rounded corners, subtle shadows, hover effects

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Update Supabase Settings

After deployment, update your Supabase project:
1. Go to Authentication > Settings
2. Update "Site URL" to your production domain
3. Add your production domain to "Redirect URLs"

## Security Features

- Row Level Security (RLS) ensures users only see their own generations
- Authentication middleware protects routes
- Secure password handling with Supabase Auth
- CSRF protection built into Supabase

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License