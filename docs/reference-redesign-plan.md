# Gayatri Lokesh Architects: reference-led redesign plan

## Objective

Evolve the current site into a quieter, more architectural portfolio without losing its warmth, logo, official imagery, routes, contact form, or editorial personality.

Recommended direction: **cinematic editorial restraint**.

The new system should feel approximately:

- 40% Daniel Boddam: asymmetric project index, clean metadata, confident white space
- 25% SPASM: full-bleed Indian architecture, atmosphere, place-led storytelling
- 20% Norm Architects and Mersi: precise art direction, project sequencing, tactile overlays
- 15% Telha Clarke and Minale + Mann: process clarity, service narrative, direct calls to action

This is a synthesis, not a visual copy.

## Reference audit

### 1. Norm Architects

Useful:

- Full-bleed, tonal hero photography
- Very small project metadata paired with large images
- Sparse editorial compositions with one clear focal point
- Navigation stays visually quiet over imagery
- Strong rhythm between cinematic frames and large areas of calm

Avoid:

- Excessive empty space without a narrative purpose
- Tiny body copy at accessibility-risk sizes

### 2. Mersi Architecture

Useful:

- Tactile branded intro
- Art-directed project title card layered over photography
- Compact display of project name, location, discipline, and year
- Subtle grain and material-led color

Avoid:

- A long mandatory splash screen
- Heavy branded overlays on every project

### 3. Daniel Boddam

Useful:

- Best reference for the project index
- Asymmetric images on a disciplined grid
- Metadata placed outside images for reliable readability
- Simple fixed navigation and almost no decorative UI
- Project photography controls the visual hierarchy

Avoid:

- Making the site so sparse that the studio story disappears

### 4. SPASM Design

Useful:

- Best contextual reference for an Indian practice
- Full-screen real project media with a subtle dark tint
- Place and project name used as the primary hero metadata
- Black-and-white project grid creates visual consistency across mixed photography
- Direct, human studio language

Avoid:

- Dense top navigation at smaller widths
- Over-reliance on full-screen slide behavior

### 5. Minale + Mann

Useful:

- Clear service-led storytelling
- Strong text contrast over moving project media
- Direct project enquiry call to action
- Simple mobile-friendly overlay navigation

Avoid:

- A fully snap-based homepage
- Repeating service cards that make the practice feel commercial rather than authored

### 6. Telha Clarke

Useful:

- Strong studio proposition before the project index
- Clear separation of Work, Process, Studio, and Contact
- Selected work, vision, and method form a convincing narrative sequence
- End-to-end service language builds client confidence

Note: the live preloader remained stuck at 0% during this audit. The underlying page structure and content were available, but its final motion was not used as a reference.

## Proposed design system

### Visual language

- Warm off-white canvas, near-black type, one muted earth accent derived from the logo or photography
- One serif display face for project names and expressive moments
- One neutral grotesk for navigation, metadata, and body copy
- Square or nearly square image corners. Rounded UI is reserved for small utility controls
- Fine rules, small uppercase labels, generous but purposeful spacing
- Photography remains natural. Use a consistent color grade only where mixed sources need cohesion
- One marquee maximum on the homepage, used only for the Interior service backdrop

### Navigation

- Keep existing labels: Studio, Projects, Journal, Team, Contact
- Transparent over the hero, solid warm surface after leaving it
- Logo plus full company name on desktop
- Full-screen mobile menu with large links, address, email, and social links
- Contact remains a clear button, but not visually louder than the work

### Motion

- 600 to 800 ms image crossfades for hero projects
- Soft image-mask reveals when project cards enter the viewport
- Metadata moves 8 to 16 px at most
- Page transition uses one restrained opacity and clip reveal
- No custom cursor, no perpetual decorative motion, no mandatory intro delay
- All motion respects `prefers-reduced-motion`

## Homepage structure

### 1. Cinematic project hero

- Full viewport project image or short muted film
- Dark tint that adapts by image for guaranteed text contrast
- Top navigation remains simple and visible
- Bottom left: project, location, year
- Bottom center: one short description
- Bottom right: previous and next controls plus slide count
- Auto-advance pauses on interaction and is disabled for reduced motion

### 2. Studio statement

- Large, readable sentence using the existing mixed serif and sans voice
- First sentence near-black, second sentence muted
- Small logo and full company name integrated at the start
- No glass object or decorative capsule

### 3. Selected projects

- Asymmetric two-column editorial grid inspired by Daniel Boddam
- Project metadata always outside the image
- Alternate portrait and landscape proportions create rhythm
- Desktop hover can reveal a second official project image
- Mobile uses one column and preserves every label
- Keep the pale `Our Projects` backdrop only if it never competes with titles

### 4. Architecture, Interior, Creative

- Three large editorial rows, not three generic cards
- Each row has a title, small image, short capability statement, and one arrow control
- Interior backdrop runs full viewport width as the single marquee
- On mobile, the Interior image and arrow sit left so the title stays unobstructed

### 5. Studio and process

- Sticky project or studio image on one side
- Short sections for approach, collaboration, scope, and locations
- `Our Story` sits lower and centered within the section, as in the current approved direction
- Add tangible process stages without turning the page into a corporate timeline

### 6. Journal

- Three restrained editorial stories with date, category, image, and title
- No carousel on mobile

### 7. Contact invitation and footer

- Large, plain-language project enquiry prompt
- Keep the full contact form on the Contact page
- Footer uses `Gayatri Lokesh Architects` in full, with readable utility text and compact spacing

## Page system

### Projects index

- Filters: All, Architecture, Interior
- Asymmetric grid with location, year, and typology outside images
- URL preserves the active filter
- Mobile filters become a horizontal, keyboard-accessible row

### Project detail

- Opening image, project title, location, year, typology, status, and scope
- Short design intent before the main gallery
- Mixed full-width and paired images with captions when useful
- Credits and press near the end
- Previous and next project navigation
- Enquiry call to action

### Studio

- Practice statement, approach, process, locations, and selected recognition
- Photography of people, work in progress, models, and built work
- Avoid a generic values-card grid

### Team

- Clear portraits, roles, short biographies, and collaborators
- Optional list view for extended team

### Journal

- Editorial index and detail layout
- Categories, dates, and strong image crops

### Contact

- Required fields: name, email, phone, project type, location, budget range, message
- Human confirmation and clear validation
- Email, phone, Mumbai and Pune information remain visible outside the form
- Static GitHub Pages version uses a hosted form endpoint or mail service because it cannot run a server route

### Utility

- Privacy, Terms, and a composed 404 page
- All route changes start at the top

## Responsive rules

- 1440 px and above: 12-column grid, intentionally asymmetrical compositions
- 768 to 1439 px: 8-column grid, reduced hero metadata density
- Below 768 px: one-column project flow, 16 to 20 px page gutters
- Hero metadata becomes a two-row block and never overlaps controls
- Minimum 16 px body copy, minimum 44 px touch targets
- No interaction depends only on hover
- Large display text uses `clamp()` and is capped before it collides with imagery

## Performance and accessibility

- Preload only the first hero asset
- Responsive AVIF/WebP sources and accurate image dimensions
- Lazy-load project images below the fold
- Avoid full-resolution video on mobile and constrained connections
- Contrast-tested image tints, keyboard controls, visible focus states, labelled buttons
- Preserve semantic headings and descriptive alternative text
- Test reduced motion, 320 px width, keyboard-only use, and route scroll restoration

## Preserve from the current site

- Logo and full Gayatri Lokesh Architects name
- Existing content architecture and all current routes
- Existing official imagery and project data
- Contact form requirement
- Warm editorial tone
- Hero project navigation and metadata concept
- Mixed-font studio statement
- Current footer information

## Change from the current site

- Make project photography the dominant design material
- Reduce repeated oversized display treatments
- Convert selected work to an asymmetric, metadata-led index
- Make spacing deliberate instead of uniformly generous
- Use smaller, calmer transitions
- Improve contrast with per-image tints
- Make Studio and Process more persuasive for prospective clients

## Implementation sequence

1. Content and asset audit: confirm hero projects, official images, project metadata, team, awards, and enquiry destination.
2. Foundation: tokens, typography, responsive grid, navigation, footer, motion utilities, and route scroll behavior.
3. Homepage prototype: hero, statement, selected projects, services, studio teaser, journal, contact invitation.
4. Project system: filtered index plus reusable project-detail template.
5. Secondary pages: Studio, Team, Journal, Contact, Legal, and 404.
6. Quality pass: mobile visual audit, accessibility, performance, reduced motion, browser QA, and GitHub Pages verification.

## Approval checkpoint

Before rebuilding all pages, create one high-fidelity homepage and one project-detail page using real Gayatri Lokesh Architects content. Approve type scale, grid, image treatment, and motion there, then extend the system across the remaining routes.
