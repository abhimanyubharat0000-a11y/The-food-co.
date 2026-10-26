export interface AssemblyStep {
  id: number;
  name: string;
  subhead: string;
  description: string;
  scrollStart: number;
  scrollEnd: number;
  color: string;
  tag: string;
}

export interface IngredientLayer {
  id: string;
  name: string;
  category: 'bun' | 'patty' | 'cheese' | 'vegetable' | 'sauce';
  restY: number;
  spawnY: number;
  startProgress: number;
  settleProgress: number;
  color: string;
  roughness: number;
  metalness: number;
  description: string;
  isVegetarian: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Rolls' | 'Chowmein' | 'Sides';
  tagline: string;
  description: string;
  ingredients: string[];
  spiceLevel: 1 | 2 | 3;
  chefSpecial?: boolean;
  image: string;
  badge: string;
}
