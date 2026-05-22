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
    image: "https://sc02.alicdn.com/kf/Afa45159bed894706bfbb60421d6f4f4a1.png",
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
    image: "https://sc02.alicdn.com/kf/Aa0ebae08e169469196f2b3aacb47c2d2x.png",
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
    image: "https://sc02.alicdn.com/kf/Ace445737ebad44eabaa3a2d589ccaf660.png",
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
    image: "https://sc02.alicdn.com/kf/Af5ec46ad8b934653ba5d67472fdfdc6eB.png",
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
    image: "https://sc02.alicdn.com/kf/Af0fa14e87101472486e9a4b9f807963fU.png",
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
    image: "https://sc02.alicdn.com/kf/Af97bfe837c1f402d9296b65379b05de6C.png",
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
    image: "https://sc02.alicdn.com/kf/A3888bfde4bc14ee4a6f10f946b2035133.png",
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
    image: "https://sc02.alicdn.com/kf/A251bc028f18842c1a7c933a07c3281f1z.png",
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
    image: "https://sc02.alicdn.com/kf/A562e54d9420e4ba099761bc792858f25H.png",
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
    image: "https://sc02.alicdn.com/kf/Aaba906fdff5043b291626f371d2b8712i.png",
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
    image: "https://sc02.alicdn.com/kf/Aae18fe0c29fd45c2bf64bb57fd9436d2z.png",
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
    image: "https://sc02.alicdn.com/kf/Af6c086307c8f455080099fae28892bcaK.png",
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
  },
  {
    id: "q7",
    text: "All'inizio della partita, dove scegli di scendere/posizionarti?",
    options: [
      { text: "Nel centro del caos (Hot drop)", weights: { clutch: 15, ego: 10 } },
      { text: "Periferia sicura per lootare", weights: { tactics: 15, resilience: 5 } },
      { text: "Dove dice il leader, senza discutere", weights: { resilience: 10, ego: -15 } },
      { text: "Vado da solo dove mi pare", weights: { ego: 25, toxic: 10 } }
    ]
  },
  {
    id: "q8",
    text: "Trovi un oggetto leggendario che serve anche a un tuo compagno. Che fai?",
    options: [
      { text: "Lo prendo io, sono il carry", weights: { ego: 30, toxic: 5 } },
      { text: "Lo lascio a chi ne ha più bisogno", weights: { resilience: 15, ego: -20 } },
      { text: "Chiedo in chat chi lo vuole", weights: { tactics: 10, toxic: -10 } },
      { text: "Lo prendo e poi mi lamento se perdiamo", weights: { toxic: 20, ego: 10 } }
    ]
  },
  {
    id: "q9",
    text: "Com'è il tuo stile di comunicazione durante il match?",
    options: [
      { text: "Comandi precisi e costanti (IGL)", weights: { tactics: 25, ego: 10 } },
      { text: "Silenzio assoluto, parlo con i fatti", weights: { clutch: 15, tactics: 5 } },
      { text: "Principalmente lamentele e critiche", weights: { toxic: 30, ego: 10 } },
      { text: "Battute e meme per tenere alto il morale", weights: { resilience: 20, toxic: -15 } }
    ]
  },
  {
    id: "q10",
    text: "Esce una nuova patch che depotenzia (nerf) il tuo personaggio preferito.",
    options: [
      { text: "Mi adatto e imparo il nuovo meta", weights: { tactics: 20, resilience: 15 } },
      { text: "Continuo a usarlo e do la colpa ai dev", weights: { ego: 20, toxic: 15 } },
      { text: "Disinstallo il gioco per una settimana", weights: { resilience: -30, toxic: 10 } },
      { text: "Trovo un nuovo modo per renderlo broken", weights: { tactics: 25, ego: 15 } }
    ]
  },
  {
    id: "q11",
    text: "Quanto tempo passi ad allenarti (aim lab, mappe custom)?",
    options: [
      { text: "Ore ogni giorno, sono un professionista", weights: { tactics: 20, resilience: 20, clutch: 10 } },
      { text: "Solo 5 minuti prima di iniziare", weights: { tactics: 5, resilience: 5 } },
      { text: "Mai, il mio talento è naturale", weights: { ego: 30, tactics: -15 } },
      { text: "L'allenamento è per chi non sa improvvisare", weights: { ego: 15, clutch: 15 } }
    ]
  },
  {
    id: "q12",
    text: "Perdi 5 partite di fila. Cosa succede nella tua stanza?",
    options: [
      { text: "Silenzio tombale e analisi dei replay", weights: { tactics: 20, resilience: 25 } },
      { text: "Tastiera/Controller in pericolo di vita", weights: { toxic: 40, resilience: -30 } },
      { text: "Ne inizio un'altra subito: 'la vinco per forza'", weights: { ego: 20, resilience: -10 } },
      { text: "Vado a dormire, non è giornata", weights: { resilience: 15, tactics: 10 } }
    ]
  },
  {
    id: "q13",
    text: "Vinci il torneo più importante dell'anno. La tua prima azione?",
    options: [
      { text: "Posto lo screen ovunque: 'Sono il Re'", weights: { ego: 35, toxic: 10 } },
      { text: "Ringrazio il team, vittoria collettiva", weights: { ego: -20, resilience: 20 } },
      { text: "Cerco subito i punti deboli della mia performance", weights: { tactics: 30 } },
      { text: "Dico agli avversari quanto sono scarsi", weights: { toxic: 45, ego: 15 } }
    ]
  },
  {
    id: "q14",
    text: "Qual è il tuo rapporto con le skin e l'estetica in game?",
    options: [
      { text: "Se non ho la skin rara, non gioco bene", weights: { ego: 25 } },
      { text: "Inutili, bado solo alle prestazioni", weights: { tactics: 15, ego: -10 } },
      { text: "Compro tutto per intimidire i nemici", weights: { ego: 20, toxic: 10 } },
      { text: "Uso quelle base per sembrare uno smurf", weights: { tactics: 10, ego: 20 } }
    ]
  },
  {
    id: "q15",
    text: "Un giocatore nuovo ti chiede consigli. Cosa fai?",
    options: [
      { text: "Gli spiego tutto con pazienza", weights: { resilience: 20, ego: -10 } },
      { text: "'Guarda i miei video e impara'", weights: { ego: 30 } },
      { text: "Lo ignoro, mi fa perdere tempo", weights: { toxic: 20, tactics: 5 } },
      { text: "Gli do consigli sbagliati per ridere", weights: { toxic: 40, ego: 5 } }
    ]
  },
  {
    id: "q16",
    text: "Devi giocare con un amico che è molto più scarso di te.",
    options: [
      { text: "Lo carryo e lo incoraggio", weights: { resilience: 25, clutch: 15 } },
      { text: "Gli rinfaccio ogni errore ogni 2 minuti", weights: { toxic: 30, ego: 10 } },
      { text: "Uso la partita per testare tattiche folli", weights: { tactics: 15, clutch: 10 } },
      { text: "Gioco col 10% dell'impegno", weights: { ego: 10, resilience: -15 } }
    ]
  },
  {
    id: "q17",
    text: "Vedi due team che combattono tra loro. Cosa fai?",
    options: [
      { text: "Aspetto che finiscano e pulisco (Third party)", weights: { tactics: 25, toxic: 10 } },
      { text: "Entro nel mezzo sparando a tutto", weights: { clutch: 20, ego: 15 } },
      { text: "Ne approfitto per scappare/ruotare", weights: { tactics: 20, resilience: 10 } },
      { text: "Guardo e rido mentre muoiono", weights: { toxic: 20 } }
    ]
  },
  {
    id: "q18",
    text: "Inizi ad avere lag pesante durante un momento critico.",
    options: [
      { text: "Cerco di compensare e sopravvivere", weights: { resilience: 30, clutch: 20 } },
      { text: "Urlo contro il provider internet in chat", weights: { toxic: 25, resilience: -20 } },
      { text: "Mi arrendo, impossibile giocare così", weights: { resilience: -25 } },
      { text: "Uso il lag come scusa per ogni mio errore", weights: { ego: 20, toxic: 15 } }
    ]
  },
  {
    id: "q19",
    text: "Guardando un Pro Player, cosa noti di più?",
    options: [
      { text: "I suoi movimenti e la mira (Meccaniche)", weights: { clutch: 20, tactics: 5 } },
      { text: "Le sue decisioni macro e la visione", weights: { tactics: 30 } },
      { text: "Quante skin costose possiede", weights: { ego: 15 } },
      { text: "Quanto è arrogante con gli avversari", weights: { toxic: 15, ego: 10 } }
    ]
  },
  {
    id: "q20",
    text: "Sei l'ultimo vivo. Tutto il team ti osserva in spettatore.",
    options: [
      { text: "Mi sento un Dio, è il mio momento", weights: { ego: 30, clutch: 25 } },
      { text: "Sento un'ansia paralizzante", weights: { clutch: -30, resilience: -20 } },
      { text: "Chiedo loro di stare zitti e ascolto i passi", weights: { tactics: 20, clutch: 15 } },
      { text: "Faccio una giocata stupida per ridere", weights: { toxic: 15, ego: 10 } }
    ]
  },
  {
    id: "q21",
    text: "Quale ruolo preferisci solitamente?",
    options: [
      { text: "Entry Fragger (Vado avanti io)", weights: { ego: 20, clutch: 15 } },
      { text: "Support/Healer (Aiuto il team)", weights: { resilience: 25, ego: -20 } },
      { text: "Sniper/Lurker (Gioco da solo)", weights: { tactics: 20, clutch: 10 } },
      { text: "Quello che mi permette di fare più kill", weights: { ego: 30, toxic: 10 } }
    ]
  },
  {
    id: "q22",
    text: "Quanto è importante il tuo Rank (Grado) per te?",
    options: [
      { text: "È la mia identità, vivo per salire", weights: { ego: 25, resilience: 10 } },
      { text: "Solo un numero, gioco per divertirmi", weights: { resilience: 20, ego: -20 } },
      { text: "Uno strumento per trovare sfide migliori", weights: { tactics: 20 } },
      { text: "Lo nascondo se sono basso, lo vanto se è alto", weights: { ego: 30, toxic: 15 } }
    ]
  },
  {
    id: "q23",
    text: "C'è un 'Cheater' o uno 'Smurf' nel team avversario.",
    options: [
      { text: "È la sfida definitiva, voglio batterlo", weights: { resilience: 30, clutch: 25, ego: 15 } },
      { text: "Report immediato e smetto di provare", weights: { resilience: -20, toxic: 10 } },
      { text: "Studio come gioca per imparare qualcosa", weights: { tactics: 25 } },
      { text: "Inizio a insultarlo in Global Chat", weights: { toxic: 40, ego: 5 } }
    ]
  },
  {
    id: "q24",
    text: "Il matchmaking ti mette con compagni scarsi. Cosa pensi?",
    options: [
      { text: "Devo caricarli sulle spalle (Carry mode)", weights: { ego: 20, clutch: 20 } },
      { text: "Il sistema è truccato contro di me", weights: { toxic: 30, resilience: -20 } },
      { text: "Cerco di coordinarli via voce", weights: { tactics: 25, resilience: 10 } },
      { text: "Trollo la partita per finirla prima", weights: { toxic: 45, resilience: -40 } }
    ]
  },
  {
    id: "q25",
    text: "Perché giochi ai videogiochi competitivi?",
    options: [
      { text: "Per l'adrenalina dei momenti decisivi", weights: { clutch: 30 } },
      { text: "Per dimostrare di essere superiore agli altri", weights: { ego: 40, toxic: 10 } },
      { text: "Per la profondità strategica", weights: { tactics: 30 } },
      { text: "Per staccare dal mondo reale", weights: { resilience: 20 } }
    ]
  }
];
