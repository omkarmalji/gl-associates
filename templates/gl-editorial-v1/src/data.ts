export type ProjectType = "Architecture" | "Interior";

export type Project = {
  slug: string;
  title: string;
  type: ProjectType;
  year: string;
  location: string;
  cover: string;
  heroPosition?: string;
  gallery: string[];
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "spirit-of-the-place",
    title: "Spirit of the Place",
    type: "Architecture",
    year: "2021",
    location: "Pune",
    cover: "images/spirit-front.jpg",
    gallery: [
      "images/spirit-garden.jpg",
      "images/spirit-oculus.jpg",
      "images/spirit-stairs.jpg",
      "images/spirit-site.jpg",
      "images/original/projects-03.jpg",
    ],
    summary: "A residential study in climate, material, landscape and the slow formation of place.",
  },
  {
    slug: "liberation",
    title: "Liberation",
    type: "Architecture",
    year: "2023",
    location: "Senegal",
    cover: "images/hero-liberation.jpg",
    heroPosition: "center",
    gallery: [
      "images/liberation-courtyard.jpg",
      "images/liberation-life.jpg",
      "images/liberation-earth.jpg",
      "images/liberation-structure.jpg",
      "images/original/projects-05.jpg",
    ],
    summary: "Local material, shaded thresholds and an open courtyard establish a generous communal rhythm.",
  },
  {
    slug: "do-little-space",
    title: "Do Little Space",
    type: "Interior",
    year: "2023",
    location: "Pune",
    cover: "images/dolittle-wide.jpg",
    gallery: [
      "images/dolittle-entry.jpg",
      "images/dolittle-stair.jpg",
      "images/dolittle-storage.jpg",
      "images/original/projects-01.jpg",
    ],
    summary: "A compact home shaped through light, purposeful storage and carefully retained breathing room.",
  },
  {
    slug: "a-tidy-space",
    title: "A Tidy Space",
    type: "Interior",
    year: "2024",
    location: "Pune",
    cover: "images/original/tidy-14.jpg",
    gallery: [
      "images/original/tidy-16.jpg",
      "images/original/tidy-17.jpg",
      "images/original/tidy-18.jpg",
      "images/original/tidy-13.jpg",
      "images/original/tidy-05.jpg",
      "images/original/tidy-10.jpg",
    ],
    summary: "An interior organised around useful details, warm timber and an uncluttered everyday life.",
  },
  {
    slug: "respace",
    title: "Re:Space",
    type: "Interior",
    year: "2025",
    location: "Pune",
    cover: "images/original/respace-01.jpg",
    gallery: [
      "images/original/respace-03.jpg",
      "images/original/projects-07.jpg",
      "images/original/projects-02.jpg",
    ],
    summary: "A measured reworking of an existing interior with a calm, functional material language.",
  },
  {
    slug: "shivshashtra-shaurya-gatha",
    title: "Shivshashtra Shaurya Gatha",
    type: "Interior",
    year: "2025",
    location: "Nagpur",
    cover: "images/shivshastra.jpg",
    gallery: [
      "images/original/projects-13.jpg",
      "images/shivshastra.jpg",
      "images/original/projects-06.jpg",
    ],
    summary: "An exhibition environment formed to hold objects, memory and a carefully paced visitor journey.",
  },
];

export const practiceCopy = {
  intent:
    "Curiosity drives our process of thinking and questioning the program and our understanding of it. Often, we find ourselves at the extremity of thoughts.",
  philosophy:
    "We believe in the relationships of mind, senses and curiosity. Each project explores the core aspects of program, economy and belonging.",
};
