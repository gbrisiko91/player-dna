export interface Archetype {
  id: string;
  name: string;
  slug: string;
  description: string;
  quote: string;
  rarity: number;
  color: string;
  image: string; // URL o Icona specifica
  traits: {
    ego: number;
    clutch: number;
    toxic: number;
    tactics: number;
    resilience: number;
  };
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "1",
    name: "Clutch Demon",
    slug: "clutch-demon",
    description: "Time slows down when you're the last one standing. You thrive in impossible situations.",
    quote: "The 1v5 isn't a problem. It's an opportunity.",
    rarity: 3,
    color: "#00f2ff",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=clutch&backgroundColor=00f2ff&shape1Color=000000",
    traits: { ego: 65, clutch: 98, toxic: 20, tactics: 70, resilience: 95 }
  },
  {
    id: "2",
    name: "Tilt Berserker",
    slug: "tilt-berserker",
    description: "One mistake triggers an unstoppable wave of aggression. For you and everyone else.",
    quote: "If we're going down, I'm taking the whole server with me.",
    rarity: 15,
    color: "#ff4b2b",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=berserk&backgroundColor=ff4b2b&shape1Color=000000",
    traits: { ego: 80, clutch: 40, toxic: 85, tactics: 30, resilience: 10 }
  },
  {
    id: "3",
    name: "The Silent Killer",
    slug: "silent-killer",
    description: "0 chat, 40 kills. You are the ghost in the server that everyone fears.",
    quote: "Actions speak. I don't.",
    rarity: 5,
    color: "#ffffff",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=ghost&backgroundColor=ffffff&shape1Color=000000",
    traits: { ego: 40, clutch: 85, toxic: 5, tactics: 80, resilience: 90 }
  },
  {
    id: "4",
    name: "The Main Character",
    slug: "main-character",
    description: "The game revolves around you, or it doesn't revolve at all.",
    quote: "Wait for me. I'm the win condition.",
    rarity: 8,
    color: "#f9d423",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=star&backgroundColor=f9d423&shape1Color=000000",
    traits: { ego: 99, clutch: 60, toxic: 45, tactics: 50, resilience: 30 }
  },
  {
    id: "5",
    name: "Zen Master",
    slug: "zen-master",
    description: "Unshakable. While the world burns, you remain perfectly centered.",
    quote: "It's just a game. But winning is a habit.",
    rarity: 2,
    color: "#f6d365",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=zen&backgroundColor=f6d365&shape1Color=000000",
    traits: { ego: 20, clutch: 80, toxic: 0, tactics: 85, resilience: 99 }
  },
  {
    id: "6",
    name: "The Fake Chill",
    slug: "fake-chill",
    description: "You sound calm, but your passive-aggressive remarks are a work of art.",
    quote: "I'm not mad. I'm just disappointed in your fundamental lack of skill.",
    rarity: 12,
    color: "#82ffb0",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=chill&backgroundColor=82ffb0&shape1Color=000000",
    traits: { ego: 50, clutch: 30, toxic: 70, tactics: 40, resilience: 60 }
  },
  {
    id: "7",
    name: "Tactical Monk",
    slug: "tactical-monk",
    description: "You win with your brain. If you have to aim, something has already gone wrong.",
    quote: "Calculated. Every move was foreseen.",
    rarity: 10,
    color: "#a18cd1",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=monk&backgroundColor=a18cd1&shape1Color=000000",
    traits: { ego: 30, clutch: 50, toxic: 5, tactics: 99, resilience: 75 }
  },
  {
    id: "8",
    name: "Chaos Merchant",
    slug: "chaos-merchant",
    description: "Your gameplay makes no sense. That's why it's so effective. You are the wildcard.",
    quote: "If I don't know what I'm doing, they certainly don't.",
    rarity: 7,
    color: "#ff00ff",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=chaos&backgroundColor=ff00ff&shape1Color=000000",
    traits: { ego: 70, clutch: 80, toxic: 40, tactics: 10, resilience: 50 }
  },
  {
    id: "9",
    name: "The Human Shield",
    slug: "human-shield",
    description: "You die so they can live. But you make sure they know exactly how much you sacrificed.",
    quote: "I gave my life for this team. Don't waste it.",
    rarity: 20,
    color: "#4facfe",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=shield&backgroundColor=4facfe&shape1Color=000000",
    traits: { ego: 60, clutch: 40, toxic: 30, tactics: 50, resilience: 90 }
  },
  {
    id: "10",
    name: "Economic God",
    slug: "economic-god",
    description: "You manage resources better than most CEOs. Efficiency is your only religion.",
    quote: "Don't buy. We win with what we have.",
    rarity: 9,
    color: "#00b09b",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=gold&backgroundColor=00b09b&shape1Color=000000",
    traits: { ego: 40, clutch: 30, toxic: 20, tactics: 95, resilience: 80 }
  },
  {
    id: "11",
    name: "The Gatekeeper",
    slug: "gatekeeper",
    description: "You've been here since the beta. You hate everyone who hasn't.",
    quote: "Go back to tutorial. This is my house.",
    rarity: 6,
    color: "#667eea",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=old&backgroundColor=667eea&shape1Color=000000",
    traits: { ego: 85, clutch: 50, toxic: 95, tactics: 70, resilience: 60 }
  },
  {
    id: "12",
    name: "The Specialist",
    slug: "specialist",
    description: "You do one thing. You do it perfectly. If you are banned out, you are useless.",
    quote: "I don't play the game. I play the character.",
    rarity: 3,
    color: "#cfd9df",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=special&backgroundColor=cfd9df&shape1Color=000000",
    traits: { ego: 90, clutch: 70, toxic: 10, tactics: 20, resilience: 40 }
  }
];

export interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    weights: {
      ego?: number;
      clutch?: number;
      toxic?: number;
      tactics?: number;
      resilience?: number;
    };
  }[];
}

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Il tuo team sta perdendo 12-0. Cosa scrivi in chat?",
    options: [
      { text: "/ff next please", weights: { resilience: -20, toxic: 10 } },
      { text: "Mute all e provo l'ace", weights: { ego: 20, clutch: 10 } },
      { text: "Cosa possiamo cambiare tatticamente?", weights: { tactics: 20, resilience: 10 } },
      { text: "Niente, sto già guardando YouTube", weights: { toxic: 25, resilience: -30 } }
    ]
  },
  {
    id: "q2",
    text: "Un compagno di squadra sbaglia un colpo decisivo. La tua reazione?",
    options: [
      { text: "Nice try, capita", weights: { resilience: 15, toxic: -10 } },
      { text: "Sospiro rumoroso nel microfono", weights: { toxic: 15, ego: 10 } },
      { text: "Analizzo l'errore matematicamente", weights: { tactics: 15 } },
      { text: "Esco dal gioco immediatamente", weights: { toxic: 30, resilience: -40 } }
    ]
  },
  {
    id: "q3",
    text: "Sei in un 1v3. Senti la pressione?",
    options: [
      { text: "Il cuore accelera, sono pronto", weights: { clutch: 20 } },
      { text: "Nervosismo puro, probabilmente sbaglierò", weights: { clutch: -20, resilience: -10 } },
      { text: "È un puzzle da risolvere", weights: { tactics: 20, clutch: 10 } },
      { text: "Lo faccio solo per le clip su TikTok", weights: { ego: 30 } }
    ]
  },
  {
    id: "q4",
    text: "Vinci una partita grazie a un colpo di fortuna. Cosa ammetti?",
    options: [
      { text: "Puro skill, tutto calcolato", weights: { ego: 25, toxic: 5 } },
      { text: "Ho avuto fortuna, onesto", weights: { resilience: 15, ego: -10 } },
      { text: "GGEZ", weights: { toxic: 25, ego: 10 } },
      { text: "Analizzo come replicarlo", weights: { tactics: 20 } }
    ]
  },
  {
    id: "q5",
    text: "Un nemico ti provoca (teabagging/trash talk). Come reagisci?",
    options: [
      { text: "Lo ignoro e lo distruggo in game", weights: { resilience: 20, tactics: 10 } },
      { text: "Reagisco con violenza verbale", weights: { toxic: 30, resilience: -20 } },
      { text: "Lo trovo divertente, rido", weights: { resilience: 15 } },
      { text: "Diventa la mia unica missione ucciderlo", weights: { ego: 20, tactics: -10 } }
    ]
  },
  {
    id: "q6",
    text: "Preferisci vincere giocando male o perdere giocando come un dio?",
    options: [
      { text: "Vincere è l'unica cosa che conta", weights: { tactics: 10, ego: 10 } },
      { text: "Perdere ma splendere, voglio le clip", weights: { ego: 30, tactics: -10 } },
      { text: "Analizzo perché abbiamo perso", weights: { tactics: 25 } },
      { text: "Mi arrendo subito se il team è scarso", weights: { toxic: 20, resilience: -20 } }
    ]
  }
];
