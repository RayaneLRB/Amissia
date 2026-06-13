export interface Fragrance {
  id: string;
  name: string;
  subtitle: string;
  signature: string;
  description: string;
  story: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  color: string;
  colorAccent: string;
  gradient: string;
  image: string;
  bgImage: string;
  price: string;
  volume: string;
}

export const fragrances: Fragrance[] = [
  {
    id: 'soft-aura',
    name: 'Soft Aura',
    subtitle: 'L\'essence de la douceur',
    signature: 'Doux, frais, élégant naturel',
    description: 'Une brume qui enveloppe la peau d\'un voile de douceur infinie. Soft Aura capture la fraîcheur d\'un matin de printemps, où les premiers rayons du soleil caressent les pétales encore humides de rosée.',
    story: 'Inspirée par la lumière dorée qui filtre à travers les voilages de soie au petit matin, Soft Aura est née du désir de capturer cet instant suspendu entre le rêve et l\'éveil.',
    notes: {
      top: ['Bergamote', 'Poire blanche', 'Rosée'],
      heart: ['Pivoine', 'Magnolia', 'Muguet'],
      base: ['Muscs blancs', 'Bois de cèdre', 'Cachemire']
    },
    color: '#F5E1E1',
    colorAccent: '#E8C4C4',
    gradient: 'linear-gradient(135deg, #FFFEF7 0%, #F5E1E1 50%, #F2DEDE 100%)',
    image: 'https://images.pexels.com/photos/38085502/pexels-photo-38085502.png',
    bgImage: 'https://images.pexels.com/photos/16233548/pexels-photo-16233548.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    price: '550 DA',
    volume: '100ml'
  },
  {
    id: 'infinite-touch',
    name: 'Infinite Touch',
    subtitle: 'L\'élégance florale',
    signature: 'Douceur florale, élégance naturelle',
    description: 'Un bouquet floral d\'une élégance rare, Infinite Touch est l\'incarnation de la grâce féminine. Chaque vaporisation déploie un jardin secret sur la peau, laissant un sillage aussi délicat qu\'inoubliable.',
    story: 'Née d\'une promenade dans les jardins de roses anciennes, Infinite Touch raconte l\'histoire d\'une élégance intemporelle qui se transmet de femme en femme, comme un secret murmuré.',
    notes: {
      top: ['Rose de Damas', 'Litchi', 'Pamplemousse rose'],
      heart: ['Jasmin sambac', 'Iris', 'Fleur d\'oranger'],
      base: ['Santal', 'Vanille', 'Ambre gris']
    },
    color: '#E8D5C4',
    colorAccent: '#D4B5A0',
    gradient: 'linear-gradient(135deg, #FFFEF7 0%, #E8D5C4 50%, #D4B5A0 100%)',
    image: 'https://images.pexels.com/photos/38085497/pexels-photo-38085497.png',
    bgImage: 'https://images.pexels.com/photos/37109648/pexels-photo-37109648.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    price: '550 DA',
    volume: '100ml'
  },
  {
    id: 'addict',
    name: 'Addict',
    subtitle: 'L\'appel irrésistible',
    signature: 'Captivante, sensuelle, addictive',
    description: 'Une fragrance magnétique qui ne laisse personne indifférent. Addict est la plus audacieuse des créations Amissia, un tourbillon de sensualité qui marque les esprits et conquiert les cœurs.',
    story: 'Il existe des fragrances qu\'on porte et des fragrances qui nous portent. Addict appartient à cette seconde catégorie — elle est l\'affirmation d\'une féminité assumée, puissante et résolument moderne.',
    notes: {
      top: ['Poivre rose', 'Mandarine', 'Absolu de rose'],
      heart: ['Tubéreuse', 'Ylang-ylang', 'Osmanthus'],
      base: ['Oud', 'Vanille noire', 'Musc ambré']
    },
    color: '#D4A574',
    colorAccent: '#B8874E',
    gradient: 'linear-gradient(135deg, #FFFEF7 0%, #D4A574 50%, #B8874E 100%)',
    image: 'https://images.pexels.com/photos/38085501/pexels-photo-38085501.png',
    bgImage: 'https://images.pexels.com/photos/1878095/pexels-photo-1878095.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    price: '550 DA',
    volume: '100ml'
  },
  {
    id: 'fresh-soap-mist',
    name: 'Fresh Soap Mist',
    subtitle: 'La pureté absolue',
    signature: 'Pure clean scent',
    description: 'La fraîcheur à l\'état pur. Fresh Soap Mist est un hommage à la propreté immaculée, une brume cristalline qui évoque le linge blanc séchant au soleil et la pureté de l\'eau de source.',
    story: 'Dans un monde de complexité, Fresh Soap Mist célèbre la beauté de la simplicité. C\'est le luxe du propre, l\'élégance de l\'essentiel, la sophistication de la pureté.',
    notes: {
      top: ['Aldéhydes', 'Citron de Sicile', 'Feuille de figuier'],
      heart: ['Muguet', 'Coton', 'Thé blanc'],
      base: ['Muscs blancs', 'Bois flotté', 'Peau propre']
    },
    color: '#E0E8F0',
    colorAccent: '#B8C8D8',
    gradient: 'linear-gradient(135deg, #FFFEF7 0%, #E0E8F0 50%, #D0DCE8 100%)',
    image: 'https://images.pexels.com/photos/38085500/pexels-photo-38085500.png',
    bgImage: 'https://images.pexels.com/photos/4194857/pexels-photo-4194857.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    price: '550 DA',
    volume: '100ml'
  }
];

export const journalEntries = [
  {
    id: 1,
    title: 'L\'art de la brume : un rituel de beauté quotidien',
    excerpt: 'Découvrez comment intégrer la brume corporelle dans votre routine beauté pour une sensation de fraîcheur qui dure toute la journée.',
    category: 'Rituel Beauté',
    date: '15 Mai 2025',
    image: 'https://images.pexels.com/photos/6633526/pexels-photo-6633526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600'
  },
  {
    id: 2,
    title: 'Les secrets d\'un sillage inoubliable',
    excerpt: 'Nos experts partagent les techniques des grandes maisons pour un sillage élégant et durable qui vous accompagne du matin au soir.',
    category: 'Savoir-Faire',
    date: '28 Avril 2025',
    image: 'https://images.pexels.com/photos/6793197/pexels-photo-6793197.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600'
  },
  {
    id: 3,
    title: 'Fleurs et sens : l\'inspiration botanique d\'Amissia',
    excerpt: 'Plongez dans l\'univers botanique qui inspire chacune de nos créations, de la cueillette à la formulation finale.',
    category: 'Inspiration',
    date: '10 Avril 2025',
    image: 'https://images.pexels.com/photos/25811335/pexels-photo-25811335.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600'
  }
];

export const images = {
  hero: 'https://images.pexels.com/photos/32244636/pexels-photo-32244636.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  lifestyle1: 'https://images.pexels.com/photos/31699395/pexels-photo-31699395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  lifestyle2: 'https://images.pexels.com/photos/9788538/pexels-photo-9788538.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  lifestyle3: 'https://images.pexels.com/photos/5240260/pexels-photo-5240260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  lifestyle4: 'https://images.pexels.com/photos/32264810/pexels-photo-32264810.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  garden: 'https://images.pexels.com/photos/19726513/pexels-photo-19726513.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  roses: 'https://images.pexels.com/photos/17984457/pexels-photo-17984457.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  products: 'https://images.pexels.com/photos/13516790/pexels-photo-13516790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  droplets: 'https://images.pexels.com/photos/11126099/pexels-photo-11126099.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  lavender: 'https://images.pexels.com/photos/8669165/pexels-photo-8669165.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  field: 'https://images.pexels.com/photos/33829193/pexels-photo-33829193.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
};
