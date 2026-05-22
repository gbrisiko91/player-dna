export interface Archetype {
  id: string;
  name: string;
  name_it: string;
  slug: string;
  description: string;
  description_it: string;
  motivation: string;
  motivation_it: string;
  quote: string;
  quote_it: string;
  rarity: number;
  color: string;
  image: string; 
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
    name_it: "Demone del Clutch",
    slug: "clutch-demon",
    description: "Time slows down when you're the last one standing. You thrive in impossible situations.",
    description_it: "Il tempo rallenta quando sei l'ultimo rimasto. Prosperi in situazioni impossibili.",
    motivation: "Your neural map shows extreme stability under high-pressure spikes. While others experience cognitive collapse, your focus sharpens.",
    motivation_it: "La tua mappa neurale mostra una stabilità estrema sotto picchi di pressione. Mentre altri subiscono il collasso cognitivo, il tuo focus si affina.",
    quote: "The 1v5 isn't a problem. It's an opportunity.",
    quote_it: "L'1v5 non è un problema. È un'opportunità.",
    rarity: 3,
    color: "#00f2ff",
    image: "https://sc02.alicdn.com/kf/Afa45159bed894706bfbb60421d6f4f4a1.png",
    traits: { ego: 65, clutch: 98, toxic: 20, tactics: 70, resilience: 95 }
  },
  {
    id: "2",
    name: "Tilt Berserker",
    name_it: "Berserker del Tilt",
    slug: "tilt-berserker",
    description: "One mistake triggers an unstoppable wave of aggression. For you and everyone else.",
    description_it: "Un solo errore scatena un'ondata inarrestabile di aggressività. Per te e per tutti gli altri.",
    motivation: "Your emotional dampeners are non-existent. You use frustration as fuel, resulting in high mechanical output but tactical unpredictability.",
    motivation_it: "I tuoi smorzatori emotivi sono inesistenti. Usi la frustrazione come carburante, con un'alta resa meccanica ma imprevedibilità tattica.",
    quote: "If we're going down, I'm taking the whole server with me.",
    quote_it: "Se stiamo affondando, porto con me tutto il server.",
    rarity: 15,
    color: "#ff4b2b",
    image: "https://sc02.alicdn.com/kf/Aa0ebae08e169469196f2b3aacb47c2d2x.png",
    traits: { ego: 80, clutch: 40, toxic: 85, tactics: 30, resilience: 10 }
  },
  {
    id: "3",
    name: "The Silent Killer",
    name_it: "Il Killer Silenzioso",
    slug: "silent-killer",
    description: "0 chat, 40 kills. You are the ghost in the server that everyone fears.",
    description_it: "0 chat, 40 kill. Sei il fantasma nel server che tutti temono.",
    motivation: "Absolute communication efficiency. Your focus is 100% on execution. You don't seek validation, only the objective.",
    motivation_it: "Efficienza comunicativa assoluta. Il tuo focus è al 100% sull'esecuzione. Non cerchi conferme, solo l'obiettivo.",
    quote: "Actions speak. I don't.",
    quote_it: "Le azioni parlano. Io no.",
    rarity: 5,
    color: "#ffffff",
    image: "https://sc02.alicdn.com/kf/Ace445737ebad44eabaa3a2d589ccaf660.png",
    traits: { ego: 40, clutch: 85, toxic: 5, tactics: 80, resilience: 90 }
  },
  {
    id: "4",
    name: "The Main Character",
    name_it: "Il Protagonista",
    slug: "main-character",
    description: "The game revolves around you, or it doesn't revolve at all.",
    description_it: "Il gioco ruota intorno a te, o non ruota affatto.",
    motivation: "Highest Ego Index recorded. You function as the primary win condition, but your performance dictates the entire team's mental state.",
    motivation_it: "Indice di Ego più alto registrato. Funzioni come condizione di vittoria primaria, ma la tua prestazione detta lo stato mentale dell'intero team.",
    quote: "Wait for me. I'm the win condition.",
    quote_it: "Aspettatemi. Sono io la condizione di vittoria.",
    rarity: 8,
    color: "#f9d423",
    image: "https://sc02.alicdn.com/kf/Af5ec46ad8b934653ba5d67472fdfdc6eB.png",
    traits: { ego: 99, clutch: 60, toxic: 45, tactics: 50, resilience: 30 }
  },
  {
    id: "5",
    name: "Zen Master",
    name_it: "Maestro Zen",
    slug: "zen-master",
    description: "Unshakable. While the world burns, you remain perfectly centered.",
    description_it: "Inamovibile. Mentre il mondo brucia, tu rimani perfettamente centrato.",
    motivation: "Unrivaled resilience levels. Negative external stimuli (toxicity, loss) are filtered out, allowing for consistent long-term optimization.",
    motivation_it: "Livelli di resilienza senza pari. Gli stimoli esterni negativi (tossicità, sconfitta) vengono filtrati, permettendo un'ottimizzazione costante a lungo termine.",
    quote: "It's just a game. But winning is a habit.",
    quote_it: "È solo un gioco. Ma vincere è un'abitudine.",
    rarity: 2,
    color: "#f6d365",
    image: "https://sc02.alicdn.com/kf/Af0fa14e87101472486e9a4b9f807963fU.png",
    traits: { ego: 20, clutch: 80, toxic: 0, tactics: 85, resilience: 99 }
  },
  {
    id: "6",
    name: "The Fake Chill",
    name_it: "Il Finto Calmo",
    slug: "fake-chill",
    description: "You sound calm, but your passive-aggressive remarks are a work of art.",
    description_it: "Sembri calmo, ma i tuoi commenti passivo-aggressivi sono un'opera d'arte.",
    motivation: "Complex psychological profile. You maintain a facade of composure while subtly degrading enemy and teammate confidence levels.",
    motivation_it: "Profilo psicologico complesso. Mantieni una facciata di compostezza mentre degradi sottilmente i livelli di fiducia di nemici e compagni.",
    quote: "I'm not mad. I'm just disappointed in your fundamental lack of skill.",
    quote_it: "Non sono arrabbiato. Sono solo deluso dalla tua fondamentale mancanza di abilità.",
    rarity: 12,
    color: "#82ffb0",
    image: "https://sc02.alicdn.com/kf/Af97bfe837c1f402d9296b65379b05de6C.png",
    traits: { ego: 50, clutch: 30, toxic: 70, tactics: 40, resilience: 60 }
  },
  {
    id: "7",
    name: "Tactical Monk",
    name_it: "Monaco Tattico",
    slug: "tactical-monk",
    description: "You win with your brain. If you have to aim, something has already gone wrong.",
    description_it: "Vinci con il cervello. Se devi mirare, qualcosa è già andato storto.",
    motivation: "Pre-frontal cortex dominance. You solve the match through positioning and resource management rather than mechanical raw power.",
    motivation_it: "Dominanza della corteccia prefrontale. Risolvi il match attraverso il posizionamento e la gestione delle risorse piuttosto che con la pura forza meccanica.",
    quote: "Calculated. Every move was foreseen.",
    quote_it: "Calcolato. Ogni mossa era prevista.",
    rarity: 10,
    color: "#a18cd1",
    image: "https://sc02.alicdn.com/kf/A3888bfde4bc14ee4a6f10f946b2035133.png",
    traits: { ego: 30, clutch: 50, toxic: 5, tactics: 99, resilience: 75 }
  },
  {
    id: "8",
    name: "Chaos Merchant",
    name_it: "Mercante del Caos",
    slug: "chaos-merchant",
    description: "Your gameplay makes no sense. That's why it's so effective. You are the wildcard.",
    description_it: "Il tuo gameplay non ha senso. Ecco perché è così efficace. Sei la carta imprevista.",
    motivation: "Unpredictable neural patterns. Your brain bypasses standard tactical loops, creating scenarios that opponents literally cannot simulate.",
    motivation_it: "Pattern neurali imprevedibili. Il tuo cervello scavalca i normali loop tattici, creando scenari che gli avversari letteralmente non possono simulare.",
    quote: "If I don't know what I'm doing, they certainly don't.",
    quote_it: "Se non so cosa sto facendo io, loro certamente non lo sanno.",
    rarity: 7,
    color: "#ff00ff",
    image: "https://sc02.alicdn.com/kf/A251bc028f18842c1a7c933a07c3281f1z.png",
    traits: { ego: 70, clutch: 80, toxic: 40, tactics: 10, resilience: 50 }
  },
  {
    id: "9",
    name: "The Human Shield",
    name_it: "Lo Scudo Umano",
    slug: "human-shield",
    description: "You die so they can live. But you make sure they know exactly how much you sacrificed.",
    description_it: "Muori perché loro possano vivere. Ma ti assicuri che sappiano esattamente quanto hai sacrificato.",
    motivation: "High empathy mixed with martyr complex. You prioritize team survival but require constant validation of your altruistic utility.",
    motivation_it: "Alta empatia mista a complesso del martire. Dai priorità alla sopravvivenza del team ma richiedi una convalida costante della tua utilità altruistica.",
    quote: "I gave my life for this team. Don't waste it.",
    quote_it: "Ho dato la vita per questa squadra. Non sprecatela.",
    rarity: 20,
    color: "#4facfe",
    image: "https://sc02.alicdn.com/kf/A562e54d9420e4ba099761bc792858f25H.png",
    traits: { ego: 60, clutch: 40, toxic: 30, tactics: 50, resilience: 90 }
  },
  {
    id: "10",
    name: "Economic God",
    name_it: "Dio dell'Economia",
    slug: "economic-god",
    description: "You manage resources better than most CEOs. Efficiency is your only religion.",
    description_it: "Gestisci le risorse meglio di molti CEO. L'efficienza è la tua unica religione.",
    motivation: "Extreme mathematical optimization. You view the match as a balance sheet where every credit must yield maximum lethality return.",
    motivation_it: "Estrema ottimizzazione matematica. Vedi il match come un bilancio dove ogni credito deve produrre il massimo ritorno di letalità.",
    quote: "Don't buy. We win with what we have.",
    quote_it: "Non comprate. Vinciamo con quello che abbiamo.",
    rarity: 9,
    color: "#00b09b",
    image: "https://sc02.alicdn.com/kf/Aaba906fdff5043b291626f371d2b8712i.png",
    traits: { ego: 40, clutch: 30, toxic: 20, tactics: 95, resilience: 80 }
  },
  {
    id: "11",
    name: "The Gatekeeper",
    name_it: "Il Guardiano",
    slug: "gatekeeper",
    description: "You've been here since the beta. You hate everyone who hasn't.",
    description_it: "Sei qui dalla beta. Odi chiunque non lo sia.",
    motivation: "High toxicity based on seniority. Your neural pathways are rigid and established, leading to high skill floor but low tolerance for error.",
    motivation_it: "Alta tossicità basata sull'anzianità. I tuoi percorsi neurali sono rigidi e consolidati, portando a un'alta base di abilità ma bassa tolleranza per l'errore.",
    quote: "Go back to tutorial. This is my house.",
    quote_it: "Torna al tutorial. Questa è casa mia.",
    rarity: 6,
    color: "#667eea",
    image: "https://sc02.alicdn.com/kf/Aae18fe0c29fd45c2bf64bb57fd9436d2z.png",
    traits: { ego: 85, clutch: 50, toxic: 95, tactics: 70, resilience: 60 }
  },
  {
    id: "12",
    name: "The Specialist",
    name_it: "Lo Specialista",
    slug: "specialist",
    description: "You do one thing. You do it perfectly. If you are banned out, you are useless.",
    description_it: "Fai una cosa sola. La fai perfettamente. Se vieni bannato, sei inutile.",
    motivation: "Hyper-focused neural mapping. You've sacrificed versatility for absolute mastery of a specific niche, making you a surgical weapon.",
    motivation_it: "Mappatura neurale iper-focalizzata. Hai sacrificato la versatilità per la maestria assoluta di una nicchia specifica, rendendoti un'arma chirurgica.",
    quote: "I don't play the game. I play the character.",
    quote_it: "Non gioco al gioco. Gioco al personaggio.",
    rarity: 3,
    color: "#cfd9df",
    image: "https://sc02.alicdn.com/kf/Af6c086307c8f455080099fae28892bcaK.png",
    traits: { ego: 90, clutch: 70, toxic: 10, tactics: 20, resilience: 40 }
  }
];

export interface Question {
  id: string;
  text: string;
  text_it: string;
  options: {
    text: string;
    text_it: string;
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
    text: "Your team is losing 12-0. What do you type in chat?",
    text_it: "Il tuo team sta perdendo 12-0. Cosa scrivi in chat?",
    options: [
      { text: "/ff next please", text_it: "/ff next please", weights: { resilience: -20, toxic: 10 } },
      { text: "Mute all and try the ace", text_it: "Mute all e provo l'ace", weights: { ego: 20, clutch: 10 } },
      { text: "What can we change tactically?", text_it: "Cosa possiamo cambiare tatticamente?", weights: { tactics: 20, resilience: 10 } },
      { text: "Nothing, I'm already watching YouTube", text_it: "Niente, sto già guardando YouTube", weights: { toxic: 25, resilience: -30 } }
    ]
  },
  {
    id: "q2",
    text: "A teammate misses a decisive shot. Your reaction?",
    text_it: "Un compagno di squadra sbaglia un colpo decisivo. La tua reazione?",
    options: [
      { text: "Nice try, happens", text_it: "Nice try, capita", weights: { resilience: 15, toxic: -10 } },
      { text: "Loud sigh into the microphone", text_it: "Sospiro rumoroso nel microfono", weights: { toxic: 15, ego: 10 } },
      { text: "Analyze the error mathematically", text_it: "Analizzo l'errore matematicamente", weights: { tactics: 15 } },
      { text: "Exit the game immediately", text_it: "Esco dal gioco immediatamente", weights: { toxic: 30, resilience: -40 } }
    ]
  },
  {
    id: "q3",
    text: "You are in a 1v3. Do you feel the pressure?",
    text_it: "Sei in un 1v3. Senti la pressione?",
    options: [
      { text: "Heart racing, I'm ready", text_it: "Il cuore accelera, sono pronto", weights: { clutch: 20 } },
      { text: "Pure nerves, I'll probably miss", text_it: "Nervosismo puro, probabilmente sbaglierò", weights: { clutch: -20, resilience: -10 } },
      { text: "It's a puzzle to be solved", text_it: "È un puzzle da risolvere", weights: { tactics: 20, clutch: 10 } },
      { text: "I'm only doing it for the TikTok clips", text_it: "Lo faccio solo per le clip su TikTok", weights: { ego: 30 } }
    ]
  },
  {
    id: "q4",
    text: "You win a game thanks to a stroke of luck. What do you admit?",
    text_it: "Vinci una partita grazie a un colpo di fortuna. Cosa ammetti?",
    options: [
      { text: "Pure skill, all calculated", text_it: "Puro skill, tutto calcolato", weights: { ego: 25, toxic: 5 } },
      { text: "I got lucky, honestly", text_it: "Ho avuto fortuna, onesto", weights: { resilience: 15, ego: -10 } },
      { text: "GGEZ", text_it: "GGEZ", weights: { toxic: 25, ego: 10 } },
      { text: "Analyze how to replicate it", text_it: "Analizzo come replicarlo", weights: { tactics: 20 } }
    ]
  },
  {
    id: "q5",
    text: "An enemy provokes you (teabagging/trash talk). How do you react?",
    text_it: "Un nemico ti provoca (teabagging/trash talk). Come reagisci?",
    options: [
      { text: "Ignore them and destroy them in game", text_it: "Lo ignoro e lo distruggo in game", weights: { resilience: 20, tactics: 10 } },
      { text: "React with verbal violence", text_it: "Reagisco con violenza verbale", weights: { toxic: 30, resilience: -20 } },
      { text: "Find it funny, I laugh", text_it: "Lo trovo divertente, rido", weights: { resilience: 15 } },
      { text: "It becomes my sole mission to kill them", text_it: "Diventa la mia unica missione ucciderlo", weights: { ego: 20, tactics: -10 } }
    ]
  },
  {
    id: "q6",
    text: "Do you prefer winning while playing poorly or losing while playing like a god?",
    text_it: "Preferisci vincere giocando male o perdere giocando come un dio?",
    options: [
      { text: "Winning is the only thing that matters", text_it: "Vincere è l'unica cosa che conta", weights: { tactics: 10, ego: 10 } },
      { text: "Lose but shine, I want the clips", text_it: "Perdere ma splendere, voglio le clip", weights: { ego: 30, tactics: -10 } },
      { text: "Analyze why we lost", text_it: "Analizzo perché abbiamo perso", weights: { tactics: 25 } },
      { text: "I surrender immediately if the team is bad", text_it: "Mi arrendo subito se il team è scarso", weights: { toxic: 20, resilience: -20 } }
    ]
  },
  {
    id: "q7",
    text: "At the start of the match, where do you choose to drop/position?",
    text_it: "All'inizio della partita, dove scegli di scendere/posizionarti?",
    options: [
      { text: "In the center of the chaos (Hot drop)", text_it: "Nel centro del caos (Hot drop)", weights: { clutch: 15, ego: 10 } },
      { text: "Safe periphery to loot", text_it: "Periferia sicura per lootare", weights: { tactics: 15, resilience: 5 } },
      { text: "Where the leader says, without question", text_it: "Dove dice il leader, senza discutere", weights: { resilience: 10, ego: -15 } },
      { text: "I go alone wherever I want", text_it: "Vado da solo dove mi pare", weights: { ego: 25, toxic: 10 } }
    ]
  },
  {
    id: "q8",
    text: "You find a legendary item that a teammate also needs. What do you do?",
    text_it: "Trovi un oggetto leggendario che serve anche a un tuo compagno. Che fai?",
    options: [
      { text: "I take it, I'm the carry", text_it: "Lo prendo io, sono il carry", weights: { ego: 30, toxic: 5 } },
      { text: "I leave it to whoever needs it most", text_it: "Lo lascio a chi ne ha più bisogno", weights: { resilience: 15, ego: -20 } },
      { text: "I ask in chat who wants it", text_it: "Chiedo in chat chi lo vuole", weights: { tactics: 10, toxic: -10 } },
      { text: "I take it and then complain if we lose", text_it: "Lo prendo e poi mi lamento se perdiamo", weights: { toxic: 20, ego: 10 } }
    ]
  },
  {
    id: "q9",
    text: "What is your communication style during the match?",
    text_it: "Com'è il tuo stile di comunicazione durante il match?",
    options: [
      { text: "Precise and constant commands (IGL)", text_it: "Comandi precisi e costanti (IGL)", weights: { tactics: 25, ego: 10 } },
      { text: "Absolute silence, I speak with actions", text_it: "Silenzio assoluto, parlo con i fatti", weights: { clutch: 15, tactics: 5 } },
      { text: "Mainly complaints and criticism", text_it: "Principalmente lamentele e critiche", weights: { toxic: 30, ego: 10 } },
      { text: "Jokes and memes to keep morale high", text_it: "Battute e meme per tenere alto il morale", weights: { resilience: 20, toxic: -15 } }
    ]
  },
  {
    id: "q10",
    text: "A new patch comes out that nerfs your favorite character.",
    text_it: "Esce una nuova patch che depotenzia (nerf) il tuo personaggio preferito.",
    options: [
      { text: "I adapt and learn the new meta", text_it: "Mi adatto e imparo il nuovo meta", weights: { tactics: 20, resilience: 15 } },
      { text: "Keep using it and blame the devs", text_it: "Continuo a usarlo e do la colpa ai dev", weights: { ego: 20, toxic: 15 } },
      { text: "Uninstall the game for a week", text_it: "Disinstallo il gioco per una settimana", weights: { resilience: -30, toxic: 10 } },
      { text: "Find a new way to make it broken", text_it: "Trovo un nuovo modo per renderlo broken", weights: { tactics: 25, ego: 15 } }
    ]
  },
  {
    id: "q11",
    text: "How much time do you spend training (aim lab, custom maps)?",
    text_it: "Quanto tempo passi ad allenarti (aim lab, mappe custom)?",
    options: [
      { text: "Hours every day, I'm a pro", text_it: "Ore ogni giorno, sono un professionista", weights: { tactics: 20, resilience: 20, clutch: 10 } },
      { text: "Only 5 minutes before starting", text_it: "Solo 5 minuti prima di iniziare", weights: { tactics: 5, resilience: 5 } },
      { text: "Never, my talent is natural", text_it: "Mai, il mio talento è naturale", weights: { ego: 30, tactics: -15 } },
      { text: "Training is for those who can't improvise", text_it: "L'allenamento è per chi non sa improvvisare", weights: { ego: 15, clutch: 15 } }
    ]
  },
  {
    id: "q12",
    text: "You lose 5 games in a row. What happens in your room?",
    text_it: "Perdi 5 partite di fila. Cosa succede nella tua stanza?",
    options: [
      { text: "Deathly silence and replay analysis", text_it: "Silenzio tombale e analisi dei replay", weights: { tactics: 20, resilience: 25 } },
      { text: "Keyboard/Controller in life danger", text_it: "Tastiera/Controller in pericolo di vita", weights: { toxic: 40, resilience: -30 } },
      { text: "Start another immediately: 'I'll win for sure'", text_it: "Ne inizio un'altra subito: 'la vinco per forza'", weights: { ego: 20, resilience: -10 } },
      { text: "I go to sleep, it's not the day", text_it: "Vado a dormire, non è giornata", weights: { resilience: 15, tactics: 10 } }
    ]
  },
  {
    id: "q13",
    text: "You win the most important tournament of the year. Your first action?",
    text_it: "Vinci il torneo più importante dell'anno. La tua prima azione?",
    options: [
      { text: "Post the screenshot everywhere: 'I'm the King'", text_it: "Posto lo screen ovunque: 'Sono il Re'", weights: { ego: 35, toxic: 10 } },
      { text: "Thank the team, collective victory", text_it: "Ringrazio il team, vittoria collettiva", weights: { ego: -20, resilience: 20 } },
      { text: "Immediately look for weak points in my performance", text_it: "Cerco subito i punti deboli della mia performance", weights: { tactics: 30 } },
      { text: "Tell opponents how bad they are", text_it: "Dico agli avversari quanto sono scarsi", weights: { toxic: 45, ego: 15 } }
    ]
  },
  {
    id: "q14",
    text: "What is your relationship with skins and in-game aesthetics?",
    text_it: "Qual è il tuo rapporto con le skin e l'estetica in game?",
    options: [
      { text: "If I don't have the rare skin, I don't play well", text_it: "Se non ho la skin rara, non gioco bene", weights: { ego: 25 } },
      { text: "Useless, I only care about performance", text_it: "Inutili, bado solo alle prestazioni", weights: { tactics: 15, ego: -10 } },
      { text: "Buy everything to intimidate enemies", text_it: "Compro tutto per intimidire i nemici", weights: { ego: 20, toxic: 10 } },
      { text: "Use base ones to look like a smurf", text_it: "Uso quelle base per sembrare uno smurf", weights: { tactics: 10, ego: 20 } }
    ]
  },
  {
    id: "q15",
    text: "A new player asks you for advice. What do you do?",
    text_it: "Un giocatore nuovo ti chiede consigli. Cosa fai?",
    options: [
      { text: "Explain everything with patience", text_it: "Gli spiego tutto con pazienza", weights: { resilience: 20, ego: -10 } },
      { text: "'Watch my videos and learn'", text_it: "'Guarda i miei video e impara'", weights: { ego: 30 } },
      { text: "Ignore them, they waste my time", text_it: "Lo ignoro, mi fa perdere tempo", weights: { toxic: 20, tactics: 5 } },
      { text: "Give them wrong advice for a laugh", text_it: "Gli do consigli sbagliati per ridere", weights: { toxic: 40, ego: 5 } }
    ]
  },
  {
    id: "q16",
    text: "You have to play with a friend who is much worse than you.",
    text_it: "Devi giocare con un amico che è molto più scarso di te.",
    options: [
      { text: "Carry them and encourage them", text_it: "Lo carryo e lo incoraggio", weights: { resilience: 25, clutch: 15 } },
      { text: "Point out every mistake every 2 minutes", text_it: "Gli rinfaccio ogni errore ogni 2 minuti", weights: { toxic: 30, ego: 10 } },
      { text: "Use the match to test crazy tactics", text_it: "Uso la partita per testare tattiche folli", weights: { tactics: 15, clutch: 10 } },
      { text: "Play with 10% effort", text_it: "Gioco col 10% dell'impegno", weights: { ego: 10, resilience: -15 } }
    ]
  },
  {
    id: "q17",
    text: "You see two teams fighting each other. What do you do?",
    text_it: "Vedi due team che combattono tra loro. Cosa fai?",
    options: [
      { text: "Wait for them to finish and clean up (Third party)", text_it: "Aspetto che finiscano e pulisco (Third party)", weights: { tactics: 25, toxic: 10 } },
      { text: "Jump into the middle shooting everything", text_it: "Entro nel mezzo sparando a tutto", weights: { clutch: 20, ego: 15 } },
      { text: "Take the opportunity to escape/rotate", text_it: "Ne approfitto per scappare/ruotare", weights: { tactics: 20, resilience: 10 } },
      { text: "Watch and laugh as they die", text_it: "Guardo e rido mentre muoiono", weights: { toxic: 20 } }
    ]
  },
  {
    id: "q18",
    text: "You start having heavy lag during a critical moment.",
    text_it: "Inizi ad avere lag pesante durante un momento critico.",
    options: [
      { text: "Try to compensate and survive", text_it: "Cerco di compensare e sopravvivere", weights: { resilience: 30, clutch: 20 } },
      { text: "Scream at the internet provider in chat", text_it: "Urlo contro il provider internet in chat", weights: { toxic: 25, resilience: -20 } },
      { text: "I give up, impossible to play like this", text_it: "Mi arrendo, impossibile giocare così", weights: { resilience: -25 } },
      { text: "Use lag as an excuse for every mistake", text_it: "Uso il lag come scusa per ogni mio errore", weights: { ego: 20, toxic: 15 } }
    ]
  },
  {
    id: "q19",
    text: "Watching a Pro Player, what do you notice most?",
    text_it: "Guardando un Pro Player, cosa noti di più?",
    options: [
      { text: "Their movement and aim (Mechanics)", text_it: "I suoi movimenti e la mira (Meccaniche)", weights: { clutch: 20, tactics: 5 } },
      { text: "Their macro decisions and vision", text_it: "Le sue decisioni macro e la visione", weights: { tactics: 30 } },
      { text: "How many expensive skins they own", text_it: "Quante skin costose possiede", weights: { ego: 15 } },
      { text: "How arrogant they are with opponents", text_it: "Quanto è arrogante con gli avversari", weights: { toxic: 15, ego: 10 } }
    ]
  },
  {
    id: "q20",
    text: "You're the last one alive. The whole team is spectating you.",
    text_it: "Sei l'ultimo vivo. Tutto il team ti osserva in spettatore.",
    options: [
      { text: "I feel like a God, it's my moment", text_it: "Mi sento un Dio, è il mio momento", weights: { ego: 30, clutch: 25 } },
      { text: "I feel a paralyzing anxiety", text_it: "Sento un'ansia paralizzante", weights: { clutch: -30, resilience: -20 } },
      { text: "Ask them to be quiet and listen for footsteps", text_it: "Chiedo loro di stare zitti e ascolto i passi", weights: { tactics: 20, clutch: 15 } },
      { text: "Make a stupid play for a laugh", text_it: "Faccio una giocata stupida per ridere", weights: { toxic: 15, ego: 10 } }
    ]
  },
  {
    id: "q21",
    text: "Which role do you usually prefer?",
    text_it: "Quale ruolo preferisci solitamente?",
    options: [
      { text: "Entry Fragger (I go first)", text_it: "Entry Fragger (Vado avanti io)", weights: { ego: 20, clutch: 15 } },
      { text: "Support/Healer (Help the team)", text_it: "Support/Healer (Aiuto il team)", weights: { resilience: 25, ego: -20 } },
      { text: "Sniper/Lurker (I play alone)", text_it: "Sniper/Lurker (Gioco da solo)", weights: { tactics: 20, clutch: 10 } },
      { text: "The one that allows me to get most kills", text_it: "Quello che mi permette di fare più kill", weights: { ego: 30, toxic: 10 } }
    ]
  },
  {
    id: "q22",
    text: "How important is your Rank to you?",
    text_it: "Quanto è importante il tuo Rank (Grado) per te?",
    options: [
      { text: "It's my identity, I live to climb", text_it: "È la mia identità, vivo per salire", weights: { ego: 25, resilience: 10 } },
      { text: "Just a number, I play for fun", text_it: "Solo un numero, gioco per divertirmi", weights: { resilience: 20, ego: -20 } },
      { text: "A tool to find better challenges", text_it: "Uno strumento per trovare sfide migliori", weights: { tactics: 20 } },
      { text: "Hide it if low, brag if high", text_it: "Lo nascondo se sono basso, lo vanto se è alto", weights: { ego: 30, toxic: 15 } }
    ]
  },
  {
    id: "q23",
    text: "There's a 'Cheater' or a 'Smurf' on the enemy team.",
    text_it: "C'è un 'Cheater' o uno 'Smurf' nel team avversario.",
    options: [
      { text: "It's the ultimate challenge, I want to beat them", text_it: "È la sfida definitiva, voglio batterlo", weights: { resilience: 30, clutch: 25, ego: 15 } },
      { text: "Immediate report and stop trying", text_it: "Report immediato e smetto di provare", weights: { resilience: -20, toxic: 10 } },
      { text: "Study how they play to learn something", text_it: "Studio come gioca per imparare qualcosa", weights: { tactics: 25 } },
      { text: "Start insulting them in Global Chat", text_it: "Inizio a insultarlo in Global Chat", weights: { toxic: 40, ego: 5 } }
    ]
  },
  {
    id: "q24",
    text: "Matchmaking puts you with bad teammates. What do you think?",
    text_it: "Il matchmaking ti mette con compagni scarsi. Cosa pensi?",
    options: [
      { text: "I have to carry them (Carry mode)", text_it: "Devo caricarli sulle spalle (Carry mode)", weights: { ego: 20, clutch: 20 } },
      { text: "The system is rigged against me", text_it: "Il sistema è truccato contro di me", weights: { toxic: 30, resilience: -20 } },
      { text: "Try to coordinate them via voice", text_it: "Cerco di coordinarli via voce", weights: { tactics: 25, resilience: 10 } },
      { text: "Troll the match to finish it early", text_it: "Trollo la partita per finirla prima", weights: { toxic: 45, resilience: -40 } }
    ]
  },
  {
    id: "q25",
    text: "Why do you play competitive video games?",
    text_it: "Perché giochi ai videogiochi competitivi?",
    options: [
      { text: "For the adrenaline of decisive moments", text_it: "Per l'adrenalina dei momenti decisivi", weights: { clutch: 30 } },
      { text: "To prove superiority over others", text_it: "Per dimostrare di essere superiore agli altri", weights: { ego: 40, toxic: 10 } },
      { text: "For tactical depth", text_it: "Per la profondità strategica", weights: { tactics: 30 } },
      { text: "To disconnect from the real world", text_it: "Per staccare dal mondo reale", weights: { resilience: 20 } }
    ]
  }
];
