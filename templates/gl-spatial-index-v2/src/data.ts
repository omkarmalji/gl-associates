export type ProjectCategory = "Residential" | "Institutional" | "Culture" | "Interior";

export type ProjectImage = {
  src: string;
  srcSet?: string;
  alt: string;
  position?: string;
  contain?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  location: string;
  status: string;
  area?: string;
  accent: string;
  ink: "light" | "dark";
  summary: string;
  statement: string;
  images: ProjectImage[];
};

const still = (project: string, name: string, alt: string, position?: string, contain = false): ProjectImage => ({
  src: `media/${project}/${name}-1920.webp`,
  srcSet: `media/${project}/${name}-960.webp 960w, media/${project}/${name}-1920.webp 1920w`,
  alt,
  position,
  contain,
});

const motion = (project: string, name: string, alt: string): ProjectImage => ({
  src: `media/${project}/${name}-1200.webp`,
  alt,
});

export const projects: Project[] = [
  {
    slug: "preschool-latur",
    title: "Goldcrest Elementary School",
    shortTitle: "Preschool Latur",
    category: "Institutional",
    location: "Latur, Maharashtra",
    status: "Completed",
    accent: "#c55235",
    ink: "light",
    summary: "A school formed as a small city of shaded passages, playful thresholds and rooms that support many ways of learning.",
    statement: "Learning moves beyond the classroom into courts, alcoves and circulation that children can make their own.",
    images: [
      still("preschool", "aerial-west", "Aerial view of Goldcrest Elementary School in Latur", "center 40%"),
      still("preschool", "west-elevation", "West elevation of the red school building"),
      still("preschool", "street-view", "Street view of the school facade", "center 60%"),
      still("preschool", "library", "Children's library with colourful reading niches"),
      still("preschool", "passage", "Daylit passage connecting classrooms"),
      still("preschool", "classroom", "Flexible classroom interior"),
      still("preschool", "axonometric", "Exploded axonometric drawing of the school", "center", true),
    ],
  },
  {
    slug: "jj-archival-museum",
    title: "JJ Archival and Art Museum",
    shortTitle: "JJ Museum",
    category: "Institutional",
    location: "Mumbai, Maharashtra",
    status: "Ongoing",
    accent: "#a7ad9a",
    ink: "dark",
    summary: "A new archival and exhibition layer within a historic arts campus, planned around gardens, existing buildings and public movement.",
    statement: "The extension stays close to the ground, allowing landscape and the inherited campus to remain the primary architecture.",
    images: [
      still("jj-museum", "garden", "Garden and low museum extension at the JJ arts campus"),
      still("jj-museum", "courtyard", "Museum courtyard and shaded colonnade"),
      still("jj-museum", "gallery", "Interior gallery proposal for the archival museum"),
      still("jj-museum", "threshold", "Covered threshold between museum and garden"),
      still("jj-museum", "campus", "Museum extension within the existing campus"),
      still("jj-museum", "site-iso", "Axonometric site study for the museum", "center", true),
      still("jj-museum", "level-one", "Level one architectural plan", "center", true),
      still("jj-museum", "section", "Architectural section through the museum", "center", true),
    ],
  },
  {
    slug: "aundh-museum",
    title: "Aundh Art Museum Extension",
    shortTitle: "Aundh Museum",
    category: "Culture",
    location: "Aundh, Satara",
    status: "Ongoing",
    area: "3,688 sq ft",
    accent: "#c9b99e",
    ink: "dark",
    summary: "An extension that works with the scale, collection and landscape of the existing museum rather than standing apart from it.",
    statement: "A sequence of courts and galleries makes the new wing feel discovered through the garden.",
    images: [
      still("aundh-museum", "aerial", "Aerial proposal for the Aundh Art Museum extension"),
      still("aundh-museum", "approach", "Approach through the landscaped museum grounds"),
      still("aundh-museum", "gallery", "Gallery interior in the museum extension"),
      still("aundh-museum", "court", "Courtyard between the existing and new museum buildings"),
      still("aundh-museum", "landscape", "Museum extension framed by mature trees"),
      still("aundh-museum", "interior", "Daylit interior exhibition space"),
    ],
  },
  {
    slug: "pocra-museum",
    title: "Nanaji Deshmukh PoCRA Museum",
    shortTitle: "PoCRA Museum",
    category: "Culture",
    location: "Hingoli, Maharashtra",
    status: "Ongoing",
    area: "126,968 sq ft",
    accent: "#78865d",
    ink: "light",
    summary: "A public museum and learning landscape focused on climate-resilient agriculture, water and the working life of rural Maharashtra.",
    statement: "The museum is conceived as terrain: roofs, courtyards and exhibits continue the agricultural landscape around them.",
    images: [
      still("pocra", "aerial", "Aerial view of the PoCRA museum and landscape"),
      still("pocra", "exterior-one", "Earth-toned exterior and water court at the museum"),
      still("pocra", "exterior-three", "Museum volumes embedded in the landscape"),
      still("pocra", "gallery", "Immersive agricultural exhibition space"),
      still("pocra", "exhibition", "Interactive museum gallery proposal"),
      still("pocra", "sketch-plan", "Conceptual sketch plan for the PoCRA museum", "center", true),
    ],
  },
  {
    slug: "aundha-nagnath",
    title: "Aundha Nagnath Temple Precinct",
    shortTitle: "Aundha Nagnath",
    category: "Culture",
    location: "Hingoli, Maharashtra",
    status: "Ongoing",
    accent: "#b56743",
    ink: "light",
    summary: "A precinct strategy for a living temple landscape, balancing pilgrimage, public movement, ritual and everyday commerce.",
    statement: "New paths, mandaps and shaded edges clarify movement while keeping the historic temple at the centre of experience.",
    images: [
      still("aundha-nagnath", "aerial", "Aerial proposal for the Aundha Nagnath temple precinct"),
      still("aundha-nagnath", "temple-axis", "Main pedestrian axis toward the historic temple"),
      still("aundha-nagnath", "arrival", "Arrival court and visitor movement"),
      still("aundha-nagnath", "court", "Shaded public court within the precinct"),
      still("aundha-nagnath", "mandap", "Semi-covered public mandap"),
      still("aundha-nagnath", "landscape", "Landscape and circulation proposal around the temple"),
    ],
  },
  {
    slug: "brick-abode",
    title: "Brick Abode",
    shortTitle: "Brick Abode",
    category: "Residential",
    location: "Hadapsar, Pune",
    status: "Ongoing",
    area: "3,800 sq ft",
    accent: "#95472f",
    ink: "light",
    summary: "A brick home organised around shade, privacy and an inward court, with mass carefully carved by light.",
    statement: "The house uses brick as structure, screen and atmosphere, giving weight to the outside and softness to the rooms within.",
    images: [
      motion("brick-abode", "form-study", "Animated massing study for Brick Abode"),
      still("brick-abode", "model-one", "Physical massing model of Brick Abode"),
      still("brick-abode", "model-three", "Physical model showing the house and courtyard"),
      still("brick-abode", "section-study", "Dark sectional study through the brick house"),
      still("brick-abode", "exterior", "Exterior proposal for Brick Abode"),
      still("brick-abode", "court", "Internal court within Brick Abode"),
      still("brick-abode", "ground-floor", "Ground floor plan of Brick Abode", "center", true),
    ],
  },
  {
    slug: "wabi-sabi-house",
    title: "Wabi Sabi House",
    shortTitle: "Wabi Sabi",
    category: "Residential",
    location: "Ichalkaranji, Kolhapur",
    status: "Ongoing",
    area: "3,200 sq ft",
    accent: "#86654f",
    ink: "light",
    summary: "A renovation and extension shaped by existing structure, quiet material changes and the uneven character of time.",
    statement: "Old and new are allowed to remain legible, joined by brick, timber, filtered light and a calm internal court.",
    images: [
      still("wabi-sabi", "brick-form", "Brick exterior proposal for Wabi Sabi House"),
      still("wabi-sabi", "section", "Sectional perspective through the renovated home", "center", true),
      still("wabi-sabi", "living", "Living room with brick and timber surfaces"),
      still("wabi-sabi", "court", "Internal court and living space"),
      still("wabi-sabi", "stair", "Stair and textured brick wall"),
      still("wabi-sabi", "bedroom", "Quiet bedroom interior"),
    ],
  },
  {
    slug: "goldcrest-vashi",
    title: "Goldcrest High Interactive Spaces",
    shortTitle: "Goldcrest Vashi",
    category: "Institutional",
    location: "Vashi, Mumbai",
    status: "Ongoing",
    accent: "#7088a1",
    ink: "light",
    summary: "Daycare, cafeteria, art, music and performance spaces designed as distinct environments within an active school.",
    statement: "Each floor has its own identity, while colour, movement and durable details hold the learning spaces together.",
    images: [
      still("goldcrest", "daycare", "Playful daycare interior at Goldcrest High"),
      still("goldcrest", "daycare-detail", "Daycare activity area with built-in play elements"),
      still("goldcrest", "cafeteria", "School cafeteria with colourful ceiling elements"),
      still("goldcrest", "art-room", "Art room proposal at Goldcrest High"),
      still("goldcrest", "music-room", "Music room proposal at Goldcrest High"),
      still("goldcrest", "plan", "Cafeteria plan and design study", "center", true),
      motion("goldcrest", "drawing-motion", "Animated drawing study for the multipurpose hall"),
    ],
  },
  {
    slug: "modern-space-prabhadevi",
    title: "Modern Space",
    shortTitle: "Prabhadevi Home",
    category: "Interior",
    location: "Prabhadevi, Mumbai",
    status: "Ongoing",
    accent: "#9a9086",
    ink: "dark",
    summary: "A Mumbai apartment tuned for daily rituals through precise storage, soft materials and a continuous social space.",
    statement: "A restrained palette allows joinery, daylight and the family's objects to give the home its character.",
    images: [
      still("prabhadevi", "axonometric", "Axonometric view of the Prabhadevi apartment"),
      still("prabhadevi", "living", "Living and dining space in the apartment"),
      still("prabhadevi", "kitchen", "Open kitchen with warm neutral finishes"),
      still("prabhadevi", "bedroom", "Bedroom with integrated joinery"),
      still("prabhadevi", "material", "Material detail and furniture composition"),
    ],
  },
  {
    slug: "congress-bhavan",
    title: "Congress Bhavan Workplace",
    shortTitle: "Congress Bhavan",
    category: "Interior",
    location: "Latur, Maharashtra",
    status: "Ongoing",
    accent: "#783934",
    ink: "light",
    summary: "A workplace interior that uses deep colour, framed thresholds and controlled light to give shared rooms a civic presence.",
    statement: "The project turns a compact office into a sequence of public, collaborative and focused spaces.",
    images: [
      still("congress-bhavan", "workplace", "Workplace interior at Congress Bhavan"),
      still("congress-bhavan", "threshold", "Deep red framed threshold within the office"),
      still("congress-bhavan", "meeting", "Meeting space and integrated wall display"),
      still("congress-bhavan", "detail", "Material and lighting detail within the workplace"),
    ],
  },
  {
    slug: "vilas-bank",
    title: "Vilas Bank",
    shortTitle: "Vilas Bank",
    category: "Interior",
    location: "Latur, Maharashtra",
    status: "Ongoing",
    accent: "#7c817a",
    ink: "light",
    summary: "A commercial interior that makes banking spaces calmer, clearer and more welcoming through timber, light and direct circulation.",
    statement: "Counters, customer zones and meeting rooms share one measured material language without losing their individual functions.",
    images: [
      still("vilas-bank", "banking-hall", "Main banking hall at Vilas Bank"),
      still("vilas-bank", "customer-zone", "Customer consultation zone"),
      still("vilas-bank", "counter", "Service counter and circulation"),
      still("vilas-bank", "meeting", "Meeting room proposal"),
    ],
  },
];

export const featuredProjects = projects.slice(0, 7);

export const practice = {
  lead: "A Mumbai and Pune based practice shaped by curiosity, context and belonging.",
  continuation: "We learn, unlearn and relearn to create architecture with economy, sensibility and visual intelligence.",
  philosophy:
    "We believe in the relationships of mind, senses and curiosity. Each project explores the core aspects of program, economy and belonging.",
};

export function getProject(slug?: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
