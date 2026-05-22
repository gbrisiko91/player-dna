import { Archetype, ARCHETYPES } from './data';

export function calculateDNA(scores: { [key: string]: number }): Archetype {
  // Trova l'archetipo che ha la minima distanza euclidea dai punteggi ottenuti
  let bestMatch = ARCHETYPES[0];
  let minDistance = Infinity;

  ARCHETYPES.forEach(archetype => {
    let distance = 0;
    const traits = ['ego', 'clutch', 'toxic', 'tactics', 'resilience'];
    
    traits.forEach(trait => {
      const userScore = scores[trait] || 0;
      const archetypeScore = (archetype.traits as any)[trait] || 0;
      distance += Math.pow(userScore - archetypeScore, 2);
    });

    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = archetype;
    }
  });

  return bestMatch;
}
