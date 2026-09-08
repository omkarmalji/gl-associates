import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "docs", "Projects");
const outputRoot = path.join(root, "public", "media");

const selections = {
  preschool: [
    ["aerial-west", "Institutional/Preschool, Latur/Photos/ext-01_Aerial view west side @ Studio Lumos.media.JPG"],
    ["west-elevation", "Institutional/Preschool, Latur/Photos/ext-02_Elevational view west side @ Studio Lumos.media.jpg"],
    ["street-view", "Institutional/Preschool, Latur/Photos/ext-06_Street View west side @ Studio Lumos.media.JPG"],
    ["library", "Institutional/Preschool, Latur/Photos/int-03_Library @ Studio Lumos.media.jpg"],
    ["passage", "Institutional/Preschool, Latur/Photos/int-04_Passage first floor @ Studio Lumos.media.JPG"],
    ["classroom", "Institutional/Preschool, Latur/Photos/int-08_first floor flexible classroom @ Studio Lumos.media.JPG"],
    ["axonometric", "Institutional/Preschool, Latur/03.Drawings/02_exploded axonometric.jpg"],
  ],
  goldcrest: [
    ["daycare", "Institutional/Goldcrest High,Vashi/1st floor daycare/02.jpg"],
    ["daycare-detail", "Institutional/Goldcrest High,Vashi/1st floor daycare/05.jpg"],
    ["cafeteria", "Institutional/Goldcrest High,Vashi/2nd floor cafeteria/Cafe-01-1.jpg"],
    ["art-room", "Institutional/Goldcrest High,Vashi/7th floor/7th floor -art room-1.jpg"],
    ["music-room", "Institutional/Goldcrest High,Vashi/7th floor/7th floor -music room-2.png"],
    ["plan", "Institutional/Goldcrest High,Vashi/Drawing/2nd floor -cafeteria.jpg"],
    ["drawing-motion", "Institutional/Goldcrest High,Vashi/Drawing/7th floor MPH.gif", true],
  ],
  "jj-museum": [
    ["garden", "Institutional/JJ archival and art museum/01.png"],
    ["courtyard", "Institutional/JJ archival and art museum/03.png"],
    ["gallery", "Institutional/JJ archival and art museum/05.png"],
    ["threshold", "Institutional/JJ archival and art museum/12.png"],
    ["campus", "Institutional/JJ archival and art museum/19.png"],
    ["site-iso", "Institutional/JJ archival and art museum/Drawing/0 - 3D View - Site ISO-01.jpg"],
    ["level-one", "Institutional/JJ archival and art museum/Drawing/0 - Floor Plan - L1 - Architectural.jpg"],
    ["section", "Institutional/JJ archival and art museum/Drawing/0 - Section - AA.jpg"],
  ],
  "aundh-museum": [
    ["aerial", "Museums and public spaces/Aundh Museum/02.png"],
    ["approach", "Museums and public spaces/Aundh Museum/05.png"],
    ["gallery", "Museums and public spaces/Aundh Museum/08.png"],
    ["court", "Museums and public spaces/Aundh Museum/12.png"],
    ["landscape", "Museums and public spaces/Aundh Museum/16 with trees.png"],
    ["interior", "Museums and public spaces/Aundh Museum/17.png"],
  ],
  "aundha-nagnath": [
    ["aerial", "Museums and public spaces/Aundha Nagnath/02.png"],
    ["temple-axis", "Museums and public spaces/Aundha Nagnath/04.png"],
    ["arrival", "Museums and public spaces/Aundha Nagnath/07 (1).png"],
    ["court", "Museums and public spaces/Aundha Nagnath/12.png"],
    ["mandap", "Museums and public spaces/Aundha Nagnath/15_Semi cover.png"],
    ["landscape", "Museums and public spaces/Aundha Nagnath/Revised landscape view-1.jpg"],
  ],
  pocra: [
    ["aerial", "Museums and public spaces/PoCRA museum/PoCRA Museum_20260727-aerial view.jpg"],
    ["exterior-one", "Museums and public spaces/PoCRA museum/EXT-1-R1.png"],
    ["exterior-three", "Museums and public spaces/PoCRA museum/EXT-3-R1.png"],
    ["gallery", "Museums and public spaces/PoCRA museum/R1-02.png"],
    ["exhibition", "Museums and public spaces/PoCRA museum/R1-05.png"],
    ["sketch-plan", "Museums and public spaces/PoCRA museum/00-sketch plan.png"],
  ],
  "brick-abode": [
    ["form-study", "Residential/Brick Abode/00-gif.gif", true],
    ["model-one", "Residential/Brick Abode/00-model- (1).jpg"],
    ["model-three", "Residential/Brick Abode/00-model- (3).jpg"],
    ["section-study", "Residential/Brick Abode/01-cropped square-dark.jpg"],
    ["exterior", "Residential/Brick Abode/Render-01.jpg"],
    ["court", "Residential/Brick Abode/Render-02.jpg"],
    ["ground-floor", "Residential/Brick Abode/01-ground floor.jpg"],
  ],
  "wabi-sabi": [
    ["brick-form", "Residential/Wabi sabi/01.png"],
    ["section", "Residential/Wabi sabi/02.png"],
    ["living", "Residential/Wabi sabi/20250820-_01.png"],
    ["court", "Residential/Wabi sabi/20250820-_03.png"],
    ["stair", "Residential/Wabi sabi/20250820-_05.png"],
    ["bedroom", "Residential/Wabi sabi/20250820-_08.png"],
  ],
  prabhadevi: [
    ["axonometric", "Interior/3bhk _Prabhadevi,Mumbai/Picture1.jpg"],
    ["living", "Interior/3bhk _Prabhadevi,Mumbai/Picture2.jpg"],
    ["kitchen", "Interior/3bhk _Prabhadevi,Mumbai/Picture4.jpg"],
    ["bedroom", "Interior/3bhk _Prabhadevi,Mumbai/Picture5.jpg"],
    ["material", "Interior/3bhk _Prabhadevi,Mumbai/Picture7.jpg"],
  ],
  "congress-bhavan": [
    ["workplace", "Interior/Congress Bhavan, Latur/01.png"],
    ["threshold", "Interior/Congress Bhavan, Latur/03.png"],
    ["meeting", "Interior/Congress Bhavan, Latur/04.png"],
    ["detail", "Interior/Congress Bhavan, Latur/06.png"],
  ],
  "vilas-bank": [
    ["banking-hall", "Interior/Vilas Bank, Latur/R1-_Scene 1.effectsResult.png"],
    ["customer-zone", "Interior/Vilas Bank, Latur/R1-_Scene 3.effectsResult.png"],
    ["counter", "Interior/Vilas Bank, Latur/RENDER-3.png"],
    ["meeting", "Interior/Vilas Bank, Latur/RENDER-5.png"],
  ],
};

await rm(outputRoot, { recursive: true, force: true });

for (const [slug, images] of Object.entries(selections)) {
  const projectOutput = path.join(outputRoot, slug);
  await mkdir(projectOutput, { recursive: true });

  for (const [name, relativeSource, animated = false] of images) {
    const source = path.join(sourceRoot, ...relativeSource.split("/"));
    const widths = animated ? [1200] : [960, 1920];

    for (const width of widths) {
      const output = path.join(projectOutput, `${name}-${width}.webp`);
      const pipeline = sharp(source, { animated, limitInputPixels: false }).rotate();
      await pipeline
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: animated ? 72 : 82, effort: 5 })
        .toFile(output);
      console.log(path.relative(root, output));
    }
  }
}
