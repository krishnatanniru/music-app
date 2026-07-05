# EchoVerse AI — Custom AI Music & Voice Studio

> Generate complete songs from a text prompt using AI voice cloning, lyric generation, and full instrumental composition.

[![Vercel](https://img.shields.io/badge/deployed%20on-vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com)

---

## Features

- 🎤 **AI Voice Cloning** — Clone your voice with 3–10 minutes of audio
- ✍️ **AI Lyrics Generation** — Original lyrics in 12 languages (English, Hindi, Telugu, Tamil, and more)
- 🎵 **Full Music Composition** — Melody, chords, harmony, and full instrumentation
- 🎛️ **Studio Mixer** — Fine-tune vocals, bass, drums, guitar, piano, and strings
- 🎨 **AI Cover Art** — Auto-generated cover art for every song
- 👥 **Community Feed** — Share songs, follow creators, discover trending music
- 📊 **Admin Dashboard** — User management, analytics, and moderation

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS + Framer Motion |
| **Auth** | Clerk |
| **Database** | Supabase (PostgreSQL) |
| **ORM** | Prisma (ready for integration) |
| **Cache/Queue** | Upstash Redis + BullMQ |
| **State** | Zustand |
| **Audio Player** | WaveSurfer.js |
| **Rich Text** | TipTap |
| **Charts** | Recharts |
| **Deployment** | Vercel (frontend) |

---

## AI Provider Interfaces

All AI services are abstracted behind provider interfaces, making them swap-ready:

| Interface | Current | Swap With |
|---|---|---|
| `LyricsProvider` | Mock | OpenAI GPT, Claude, Gemini |
| `MusicProvider` | Mock | Suno, Udio, MusicGen, Stable Audio, ACE-Step |
| `VoiceProvider` | Mock | ElevenLabs, Cartesia, XTTS, OpenVoice, Fish Speech |
| `ImageProvider` | Mock | OpenAI Images, Stable Diffusion XL, Flux |
| `JobQueueProvider` | In-memory | BullMQ + Upstash Redis |

To switch a provider, update `lib/services/index.ts`.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- A [Clerk](https://clerk.com) account (free)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/echoverse-ai.git
cd echoverse-ai
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Fill in at minimum:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

Get these from [clerk.com](https://clerk.com) → Create Application → API Keys.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
echoverse-ai-music-studio/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── dashboard/            # Project dashboard
│   │   ├── create/               # Song creation
│   │   ├── voice-library/        # Voice profiles
│   │   ├── song/[id]/            # Song result page
│   │   ├── community/            # Public community feed
│   │   ├── profile/              # User profile
│   │   └── admin/                # Admin panel
│   ├── api/                      # Route handlers
│   └── page.tsx                  # Landing page
├── components/
│   ├── landing/                  # Landing page sections
│   ├── layout/                   # Navbar, Sidebar, Footer
│   ├── voice/                    # Voice cloning UI
│   ├── create/                   # Song creation UI
│   ├── player/                   # Waveform audio player
│   ├── song/                     # Song result components
│   ├── lyrics/                   # TipTap lyrics editor
│   ├── mixer/                    # Music mixer controls
│   ├── dashboard/                # Dashboard cards
│   ├── community/                # Community feed
│   ├── chat/                     # AI chat assistant
│   ├── admin/                    # Admin dashboard
│   ├── profile/                  # Profile components
│   └── notifications/            # Notification system
├── lib/
│   ├── types/                    # TypeScript types
│   ├── constants/                # App constants
│   ├── services/                 # AI provider abstractions
│   │   ├── providers.ts          # Provider interfaces
│   │   └── mock/                 # Mock implementations
│   ├── store/                    # Zustand state stores
│   └── utils/                    # Helper functions
├── .env.example                  # Environment template
├── docker-compose.yml            # Local Docker stack
├── Dockerfile                    # Production Docker image
└── vercel.json                   # Vercel deployment config
```

---

## Deployment

### Vercel (Recommended for Frontend)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables from `.env.example`
4. Deploy!

### Docker (Full Stack)

```bash
# Development with all services
docker-compose up

# With dev tools (pgAdmin, Redis Commander)
docker-compose --profile dev-tools up

# Production build
docker build -t echoverse-ai .
docker run -p 3000:3000 echoverse-ai
```

### Supabase (Database)

1. Create project at [supabase.com](https://supabase.com)
2. Copy the connection string to `DATABASE_URL`
3. Run Prisma migrations: `npx prisma migrate deploy`

### Upstash Redis (Queue)

1. Create database at [upstash.com](https://upstash.com)
2. Copy REST URL and token to env vars

---

## Connecting Real AI APIs

### Switch to ElevenLabs Voice Cloning

```typescript
// lib/services/index.ts
import { ElevenLabsVoiceProvider } from './elevenlabs/ElevenLabsVoiceProvider';
export const voiceProvider = new ElevenLabsVoiceProvider(process.env.ELEVENLABS_API_KEY!);
```

### Switch to OpenAI for Lyrics

```typescript
import { OpenAILyricsProvider } from './openai/OpenAILyricsProvider';
export const lyricsProvider = new OpenAILyricsProvider(process.env.OPENAI_API_KEY!);
```

### Switch to Suno for Music Generation

```typescript
import { SunoMusicProvider } from './suno/SunoMusicProvider';
export const musicProvider = new SunoMusicProvider(process.env.SUNO_API_KEY!);
```

---

## Security

- Voice samples are associated with authenticated users only
- Explicit consent required before voice cloning
- Users can permanently delete their voice data
- JWT authentication via Clerk
- Rate limiting on all API routes
- Input validation with Zod
- Audit logging for sensitive operations

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push and open a PR

---

Built with ❤️ using Next.js, Clerk, and the power of AI.
