// ─────────────────────────────────────────────
//  EchoVerse AI — Mock Lyrics Provider
//  Simulates an LLM-backed lyrics generation service.
// ─────────────────────────────────────────────

import type { LyricsProvider } from '@/lib/services/providers';
import type { LyricsSection, LyricsSectionType } from '@/lib/types';

// ── Helpers ───────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function uuid(): string {
  return Math.random().toString(36).slice(2, 10) +
    '-' +
    Math.random().toString(36).slice(2, 10);
}

// ── Lyric templates keyed by genre + section type ────────────────

const VERSE_TEMPLATES: Record<string, string[]> = {
  pop: [
    'I wake up every morning with your voice inside my head\nThe echoes of your laughter paint the colours of my bed\nThe world outside is moving but my heart has found its place\nLost inside a moment, lost inside your grace',
    'Standing at the crossroads where the past meets the unknown\nSearching for a signal in the static all alone\nEvery breath a question, every step a leap of faith\nSomewhere in the distance I can feel the coming change',
  ],
  rock: [
    'Burning through the night sky like a comet falling down\nLeaving trails of fire across every sleeping town\nNo one sees us coming, no one hears the thunder roll\nWe are made of lightning and we live beyond control',
    'Shattered on the pavement where the kings once used to stand\nRusted chains of yesterday still grip my reaching hand\nEvery scar a story, every bruise a battle won\nI will rise from ashes long before this night is done',
  ],
  'hip-hop': [
    'Started from the bottom of the list they overlook\nEvery line I ever wrote was pages in my book\nThey said the stage was too big, said the crowd would never care\nNow I own the night and breathe my dreams into the air',
    'City lights and sirens, corner store at 2 AM\nCarrying the weight of every chapter, every stem\nVisions in the cipher turning coal into the gold\nEvery verse I spit is just another story told',
  ],
  jazz: [
    'Midnight piano whispers things I cannot say aloud\nSmoke curls through the lamplight like a ghost inside the crowd\nYour memory is a melody I cannot leave behind\nSlow and sweet and aching through the corridors of mind',
    'Rain on cobblestones, an old café, a borrowed chair\nThe saxophonist bends a note that hangs upon the air\nTime moves like molasses in the warmth of all we knew\nEvery blue-note moment was a love note written true',
  ],
  cinematic: [
    'The horizon burns with colour as the cavalry rides in\nA thousand years of silence waiting breathless to begin\nThe score swells like a promise lifting hearts above the plain\nIn this single fleeting instant nothing will be quite the same',
    'Mountains draped in silver mist beneath an ageless sky\nHeroes walk the edge of fate with fire in their eyes\nThe drums of time are beating out a march we all must hear\nThe world is turning over and the age of dawn is here',
  ],
  electronic: [
    'Synthetic light and data pulse through every living wire\nAlgorithms dancing on the edges of desire\nWe are the frequency, we are the wave and hum\nDissolving into signal until signal finally comes',
    'Neon signs are bleeding as the city comes alive\nEvery pulse is proof that in the chaos we survive\nDrop the bass, release the grid, let the voltage rise\nWe were built for moments where the real world disappears',
  ],
};

const CHORUS_TEMPLATES: Record<string, string> = {
  pop: 'And I\u2019ll carry every word you left behind\nLike a song that only I could find\nYou are the chorus in the noise of all I\u2019ve known\nAnd even in the silence I\u2019m never alone',
  rock: 'We burn, we fall, we rise again\nWe are the thunder and the rain\nNo force on earth can keep us down\nWe\u2019ll shake the very walls of this whole town',
  'hip-hop':
    'They counted us out but we counted back up\nEvery dream deferred was a seed we planted up\nWatch us grow, watch us rise, watch us claim what\u2019s ours\nWe built empires out of dust and midnight hours',
  jazz: 'And so the melody remains\nLong after all the joy and pain\nA soft refrain between the stars\nFor you, for me, for all we are',
  cinematic:
    'Rise up, rise up, the world is calling out your name\nNothing lost, nothing broken, nothing ever stays the same\nWith every breath a battle, with every fall a new resolve\nThe greatest stories start with wounds that slowly heal and solve',
  electronic:
    'Let the signal carry us above the city lights\nWe are frequency and fire burning through the night\nDissolve into the rhythm till the borders fade away\nTomorrow is a signal we are sending here today',
};

const BRIDGE_TEMPLATES: Record<string, string> = {
  pop: 'Maybe I\u2019ve been wrong about the way that endings feel\nMaybe every goodbye holds the seeds of something real\nI\u2019m learning how to let go and still hold onto the light\nLeaning into morning after the longest night',
  rock: 'I\u2019ve seen the mountains crumble and I\u2019ve watched the rivers run\nAnd still I stand here breathing underneath the sun\nThis isn\u2019t over — not until the last note rings\nI\u2019ll fight until the final chord on broken strings',
  'hip-hop':
    'Pause for a second — let the moment sink in deep\nAll the sacrifices that we made while others sleep\nThis is the inflection, this is where the plot turns right\nEverything before this was just practice for tonight',
  jazz: 'Between the notes is where the music truly lives\nIn the space the melody so graciously gives\nSilence is a colour that the greatest artists know\nAnd love, like jazz, is best when played a little slow',
  cinematic:
    'In the quiet before the battle, in the breath before the fall\nEvery hero hears the echo of the moment\u2019s call\nThis is not the ending — this is where the real war starts\nWe carry victory not in hands but in our hearts',
  electronic:
    'Strip away the signal, strip away the code\nAll that\u2019s left is you and I upon this endless road\nMaybe we\u2019re just data dreaming we are something more\nBut the dream is all I need to keep on going forward',
};

const OUTRO_TEMPLATES: Record<string, string> = {
  pop: 'And so the song fades out but the feeling stays\nEchoes of the chorus warming all my days\nYou are the verse I\u2019ll return to, time and time again\nThis is not the ending — this is just a bend',
  rock: 'When the last chord fades and the crowd goes home\nThe music stays inside us, and we\u2019re never alone\nOne more note, one more breath, one more chance to be\nEverything the music always told us we could be',
  'hip-hop':
    'That\u2019s the story — close the chapter, on to the next\nEvery bar a lesson, every song a test\nWe put it all on wax so the world could hear\nEchoVerse forever, year after year',
  jazz: 'Let the last note linger in the velvet air\nLeave a little something for tomorrow there\nGoodnight, sweet melody, goodnight to all we\u2019ve played\nThe music never truly dies — it simply waits',
  cinematic:
    'And as the screen fades to black and the credits roll\nThe music lives on in each and every soul\nThrough every frame of darkness, through every burst of light\nThis is the song that carried us through the night',
  electronic:
    'Signal lost... signal lost... reconnecting now\nWe will find each other again — I don\u2019t know how\nBut in the static silence there\u2019s a frequency\nThat brings us back to each other, endlessly',
};

function getTemplate<T>(map: Record<string, T>, genre: string, fallbackKey = 'pop'): T {
  return map[genre] ?? map[fallbackKey]!;
}

function getVerseTemplate(genre: string, index: number): string {
  const verses = VERSE_TEMPLATES[genre] ?? VERSE_TEMPLATES['pop']!;
  return verses[index % verses.length]!;
}

// ── Title generation per genre ────────────────

const TITLE_SEEDS: Record<string, string[]> = {
  pop: [
    'Neon Heartbeat',
    'Chasing Yesterday',
    'Electric Soul',
    'The Space Between',
    'Burning Slow',
    'Paper Stars',
  ],
  rock: [
    'Thunder & Rust',
    'Iron Sky',
    'The Last Storm',
    'Fire in the Fault',
    'Stone Cold Reverb',
    'Shatter',
  ],
  'hip-hop': [
    'Blueprint Sessions',
    'Corner Store Chronicles',
    'Cipher Ascending',
    'Gold on Concrete',
    'Late Night Frequency',
    'The Overtime',
  ],
  jazz: [
    'Blue Smoke Rising',
    'Midnight Standard',
    'The Rain Changes Key',
    'Last Call in C Minor',
    'Café Solitude',
    'Soft Diminuendo',
  ],
  cinematic: [
    'The Last Horizon',
    'Echoes of the Fallen',
    'Atlas Rising',
    'Empire of Light',
    'The Weight of Worlds',
    'Siege & Silence',
  ],
  electronic: [
    'Signal Found',
    'Infinite Loop',
    'Quantum Drift',
    'Voltage & Rain',
    'Data Dream',
    'The Overload',
  ],
  classical: [
    'Opus in G',
    'Sonata for Two Moons',
    'Prelude in Amber',
    'Nocturne No. 7',
    'The Veil',
    'Adagio for Dawn',
  ],
  'r&b': [
    'Silk & Smoke',
    'Golden Hour',
    'Midnight Devotion',
    'Your Season',
    'Velvet Frequency',
    'All of This',
  ],
  country: [
    'Red Dirt Road',
    'Tailgate Summer',
    'Honky-Tonk Heart',
    'Dusty Miles',
    'Back Porch Gospel',
    'Wide Open Fields',
  ],
  metal: [
    'Vortex Ascending',
    'The Reckoning',
    'Iron Cathedral',
    'Blood & Frequency',
    'Oblivion Gate',
    'Sovereign Chaos',
  ],
  folk: [
    'River Knows',
    'Old Oak and Ivy',
    'The Wanderer\u2019s Hymn',
    'Weathered Hands',
    'Ember & Song',
    'Three Candles',
  ],
  ambient: [
    'Oceanic Drift',
    'Slow Light',
    'The Breathing Room',
    'Vast Silence',
    'Suspended',
    'Cloud Atlas',
  ],
};

const RHYME_MAP: Record<string, string[]> = {
  love: ['above', 'dove', 'shove', 'glove', 'of', 'thereof'],
  heart: ['start', 'art', 'apart', 'smart', 'chart', 'part'],
  night: ['light', 'right', 'sight', 'might', 'fight', 'bright'],
  fire: ['desire', 'higher', 'wire', 'inspire', 'entire', 'choir'],
  dream: ['seem', 'stream', 'team', 'gleam', 'beam', 'scheme'],
  rain: ['pain', 'remain', 'gain', 'vain', 'chain', 'refrain'],
  sky: ['fly', 'high', 'die', 'cry', 'try', 'goodbye'],
  soul: ['whole', 'role', 'control', 'goal', 'toll', 'stole'],
  time: ['climb', 'rhyme', 'prime', 'sublime', 'paradigm', 'mime'],
  way: ['day', 'say', 'stay', 'play', 'pray', 'away'],
};

// ── MockLyricsProvider ────────────────────────

export class MockLyricsProvider implements LyricsProvider {
  async generateLyrics(params: {
    prompt: string;
    genre: string;
    mood: string;
    language: string;
    duration: number;
  }): Promise<{ sections: LyricsSection[]; rawLyrics: string; title: string }> {
    await delay(800);

    const { genre, duration } = params;

    const title = await this.generateTitle(params.prompt, genre);

    const sections: LyricsSection[] = [];
    let order = 0;

    // intro (for longer songs)
    if (duration >= 120) {
      sections.push({
        id: uuid(),
        type: 'intro' as LyricsSectionType,
        title: 'Intro',
        content: `[Instrumental intro — ${genre} style, ${params.mood} atmosphere]`,
        lineCount: 1,
        order: order++,
      });
    }

    // verse 1
    sections.push({
      id: uuid(),
      type: 'verse',
      title: 'Verse 1',
      content: getVerseTemplate(genre, 0),
      lineCount: 4,
      order: order++,
    });

    // chorus
    sections.push({
      id: uuid(),
      type: 'chorus',
      title: 'Chorus',
      content: getTemplate(CHORUS_TEMPLATES, genre),
      lineCount: 4,
      order: order++,
    });

    // verse 2
    sections.push({
      id: uuid(),
      type: 'verse',
      title: 'Verse 2',
      content: getVerseTemplate(genre, 1),
      lineCount: 4,
      order: order++,
    });

    // chorus (repeat)
    sections.push({
      id: uuid(),
      type: 'chorus',
      title: 'Chorus',
      content: getTemplate(CHORUS_TEMPLATES, genre),
      lineCount: 4,
      order: order++,
    });

    // bridge (for songs >= 90s)
    if (duration >= 90) {
      sections.push({
        id: uuid(),
        type: 'bridge',
        title: 'Bridge',
        content: getTemplate(BRIDGE_TEMPLATES, genre),
        lineCount: 4,
        order: order++,
      });

      // final chorus after bridge
      sections.push({
        id: uuid(),
        type: 'chorus',
        title: 'Final Chorus',
        content: getTemplate(CHORUS_TEMPLATES, genre),
        lineCount: 4,
        order: order++,
      });
    }

    // outro
    sections.push({
      id: uuid(),
      type: 'outro',
      title: 'Outro',
      content: getTemplate(OUTRO_TEMPLATES, genre),
      lineCount: 4,
      order: order++,
    });

    const rawLyrics = sections
      .map((s) => `[${s.title}]\n${s.content}`)
      .join('\n\n');

    return { sections, rawLyrics, title };
  }

  async rewriteSection(
    section: LyricsSection,
    instruction: string,
  ): Promise<LyricsSection> {
    await delay(600);

    // Simulate a rewrite by appending an extra nuance line
    const extraLine = `\n(${instruction.slice(0, 40).trim()}\u2026 reflected here)`;
    const rewritten = section.content
      .split('\n')
      .map((line, i) => {
        if (i === 0) return line.replace(/\b(\w)/, (c) => c.toUpperCase());
        return line;
      })
      .join('\n') + extraLine;

    return {
      ...section,
      id: uuid(),
      content: rewritten,
      lineCount: rewritten.split('\n').length,
    };
  }

  async translateLyrics(
    lyrics: LyricsSection[],
    targetLanguage: string,
  ): Promise<LyricsSection[]> {
    await delay(500);

    return lyrics.map((section) => ({
      ...section,
      id: uuid(),
      content: section.content
        .split('\n')
        .map((line) => `[${targetLanguage}] ${line}`)
        .join('\n'),
    }));
  }

  async suggestRhymes(word: string, _language: string): Promise<string[]> {
    await delay(300);

    const key = word.toLowerCase().trim();
    if (RHYME_MAP[key]) return RHYME_MAP[key]!;

    // Fallback: generate plausible-sounding rhymes
    const suffixes = ['ight', 'ame', 'ain', 'ove', 'ine', 'art'];
    return suffixes.map((s) => word.slice(0, Math.max(1, word.length - 2)) + s);
  }

  async generateTitle(prompt: string, genre: string): Promise<string> {
    await delay(400);

    const seeds = TITLE_SEEDS[genre] ?? TITLE_SEEDS['pop']!;
    const index = Math.abs(prompt.length + genre.length) % seeds.length;
    return seeds[index]!;
  }
}
