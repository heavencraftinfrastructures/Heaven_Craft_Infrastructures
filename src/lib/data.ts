// Central content + dummy HD media source for the Heaven Craft site.
// Swap these Unsplash URLs / local /media paths with real project photography when available.

export const IMG = {
  heroBg:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
  heroMid:
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80",

  interior1:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  interior2:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  interior3:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
  interior4:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",

  exterior1:
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",
  exterior2:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
  exterior3:
    "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=1400&q=80",
  exterior4:
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",

  building1:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
  building2:
    "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1400&q=80",
  building3:
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
  building4:
    "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=1400&q=80",

  kitchen1:
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80",
  hall1:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",

  blueprint1:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
  blueprint2:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
  blueprint3:
    "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1400&q=80",

  simInterior1:
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
  simInterior2:
    "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1400&q=80",
  simExterior1:
    "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1400&q=80",
  simExterior2:
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",

  siteProgress1:
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1400&q=80",
  siteProgress2:
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80",

  officeInterior:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
  nightSkyline:
    "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1600&q=80",
};

// Real Heaven Craft project photography, stored locally in /public/media.
export const REAL = {
  interior: [
    "/media/services/interior-1.jpg",
    "/media/services/interior-2.jpg",
    "/media/services/interior-3.jpg",
    "/media/services/interior-4.jpg",
    "/media/services/interior-5.jpg",
  ],
  furniture: ["/media/services/furniture-1.jpg", "/media/services/furniture-2.jpg"],
  kitchen: [
    "/media/services/kitchen-1.jpg",
    "/media/services/kitchen-2.jpg",
    "/media/services/kitchen-3.jpg",
  ],
  hall: [
    "/media/services/hall-1.jpg",
    "/media/services/hall-2.jpg",
    "/media/services/hall-3.jpg",
    "/media/services/hall-4.jpg",
    "/media/services/hall-5.jpg",
  ],
  villa: [
    "/media/services/villa-1.jpg",
    "/media/services/villa-2.jpg",
    "/media/services/villa-4.jpg",
    "/media/services/villa-5.jpg",
    "/media/services/villa-6.jpg",
    "/media/services/villa-7.jpg",
    "/media/services/villa-8.jpg",
    "/media/services/villa-9.jpg",
  ],
  residential: ["/media/services/residential-1.jpg"],
  facade: ["/media/services/facade-1.jpg", "/media/planning/structural-plan-1.jpg"],
  structural: ["/media/services/structural-1.jpg"],
  // Live on-site construction photography — foundation, RCC framing,
  // scaffolding, and formwork from active project sites.
  construction: Array.from(
    { length: 24 },
    (_, i) => `/media/services/construction-${i + 1}.jpg`
  ),
  // Architecture & design detail sheets — each page pairs the photoreal
  // 3D render with its CAD elevation/plan drawing, so the gallery shows
  // both the finished-look visualization and the underlying technical
  // design.
  architecture: Array.from(
    { length: 21 },
    (_, i) => `/media/services/architecture-${i + 1}.jpg`
  ),
  structuralPlans: [
    "/media/planning/structural-plan-1.jpg",
    "/media/planning/structural-plan-2.jpg",
    "/media/planning/structural-plan-3.jpg",
  ],
  before: "/media/planning/before-1.jpg",
  after: "/media/planning/after-1.jpg",
  // Client-supplied aerial site photo for the Planning section's story image.
  planningSite: "/media/planning/planning-site-1.jpg",
};

// Real preview clips — compressed, muted, hover-to-play (see VideoCard).
export const VIDEO = {
  walkthroughSimulation: "/media/planning/video-walkthrough-v3.mp4",
  constructionTimelapse: "/media/planning/video-render.mp4",
  droneFlythrough: "/media/planning/video-drone.mp4",
};

// WebM (VP9) companions — smaller, and playable even without an H.264 license.
export const VIDEO_WEBM = {
  walkthroughSimulation: "/media/planning/video-walkthrough-v3.webm",
  constructionTimelapse: "/media/planning/video-render.webm",
  droneFlythrough: "/media/planning/video-drone.webm",
};

export const VIDEO_POSTER = {
  walkthroughSimulation: "/media/planning/poster-walkthrough-v3.jpg",
  constructionTimelapse: "/media/planning/poster-render.jpg",
  droneFlythrough: "/media/planning/poster-drone.jpg",
};

export const stats = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Completed", value: 120, suffix: "+" },
  { label: "Happy Clients", value: 120, suffix: "+" },
  { label: "Expert Professionals", value: 40, suffix: "+" },
];

export const advantageCards = [
  {
    title: "Our Mission",
    body:
      "To build spaces our clients are genuinely proud of — designed with care, built to last, and delivered the way we promised, every single time.",
    points: [
      "One team for design and building, so nothing gets lost in translation",
      "Timelines we actually stick to",
      "Work that's still standing strong decades from now",
    ],
  },
  {
    title: "Our Roles",
    body:
      "Think of us as the people who show up at every stage — not just the ones who hand you a blueprint and disappear.",
    points: [
      "Designing spaces you'll love living or working in",
      "Building it right, on-site, with our own hands and eyes",
      "Showing you what it'll look like before it's real",
      "Staying with you from the first sketch to the last coat of paint",
    ],
  },
  {
    title: "Why Choose Us",
    body:
      "Because you deserve to see what you're paying for before it's poured in concrete — not after.",
    points: [
      "One point of contact, start to finish — no passing you around",
      "You see it before we build it",
      "Engineers and designers who've done this for years",
      "Comfortable with both a family home and a government project",
    ],
  },
];

export type ServiceCategory = "Interior" | "Construction" | "Architecture & Designs";

export const serviceCategories: ServiceCategory[] = [
  "Interior",
  "Construction",
  "Architecture & Designs",
];

// Exactly one card per category — every Interior-tagged photo lives in the
// Interior gallery, every Construction-tagged photo lives in the
// Construction gallery. `interior-3.jpg` (REAL.interior[2]) is pulled out
// of the interior set and into construction per the client's instruction.
const interiorGallery = [
  ...REAL.furniture,
  ...REAL.kitchen,
  ...REAL.hall,
  REAL.interior[0],
  REAL.interior[1],
  REAL.interior[3],
  REAL.interior[4],
];

const constructionGallery = [
  ...REAL.residential,
  IMG.building1,
  ...REAL.structural,
  ...REAL.facade,
  ...REAL.villa,
  ...REAL.construction,
  REAL.interior[2],
];

export const services = [
  {
    category: "Interior" as ServiceCategory,
    title: "Interior Design & Execution",
    tag: "Living / Kitchens / Furniture / Halls",
    description:
      "Modular interiors, kitchens, custom furniture, and living & hall spaces — layout, lighting, storage, and finish built around how you actually live.",
    image: interiorGallery[0],
    gallery: interiorGallery,
  },
  {
    category: "Construction" as ServiceCategory,
    title: "Construction & Site Execution",
    tag: "Civil / Structural / RCC",
    description:
      "Foundations, structural RCC and steel work, façades, villa and site construction, and complete building execution for homes and commercial complexes.",
    image: constructionGallery[0],
    gallery: constructionGallery,
  },
  {
    category: "Architecture & Designs" as ServiceCategory,
    title: "Architecture & Design Concepts",
    tag: "Full Concept Detailing",
    description:
      "Complete architectural detailing for one of our residential projects — photoreal room renders paired with their CAD floor plans and elevation drawings, room by room.",
    image: REAL.architecture[2],
    gallery: REAL.architecture,
  },
];

export const planningSteps = [
  {
    number: "01",
    title: "Client Discovery",
    description:
      "We start with goals, budget, lifestyle or business needs, and a full site study before a single line is drawn.",
  },
  {
    number: "02",
    title: "Concept Planning",
    description:
      "Bubble diagrams, zoning, and circulation planning establish how the space will actually be used and moved through.",
  },
  {
    number: "03",
    title: "2D Layout Development",
    description:
      "Floor plans, furniture layouts, and working drawings translate the concept into build-ready documentation.",
  },
  {
    number: "04",
    title: "3D Simulation & Visualization",
    description:
      "Photoreal interior and exterior renders, walkthrough-style previews, and daylight simulation before construction starts.",
  },
  {
    number: "05",
    title: "Technical Coordination",
    description:
      "Structural, electrical, plumbing, and finishing details are coordinated across every engineering discipline.",
  },
  {
    number: "06",
    title: "Costing & Phased Execution Plan",
    description:
      "A detailed BOQ, procurement schedule, and phased construction timeline keep budget and delivery transparent.",
  },
  {
    number: "07",
    title: "On-Site Translation",
    description:
      "Marking, quality checks, and progress monitoring keep the build measured against the original plan at every stage.",
  },
];

export const videoShowcase = [
  {
    title: "3D Walkthrough Simulation",
    description: "A photoreal walkthrough preview before the first wall goes up.",
    poster: VIDEO_POSTER.walkthroughSimulation,
    src: VIDEO.walkthroughSimulation,
    webmSrc: VIDEO_WEBM.walkthroughSimulation,
  },
  {
    title: "High-End 3D Rendering & Animation",
    description:
      "Full architectural animation modeled and rendered in high-end 3D software — every material, light, and surface simulated in cinematic detail before construction begins.",
    poster: VIDEO_POSTER.constructionTimelapse,
    src: VIDEO.constructionTimelapse,
    webmSrc: VIDEO_WEBM.constructionTimelapse,
  },
];

export const scrubCaptions = [
  { label: "Site marking & foundation", range: [0, 0.25] as [number, number] },
  { label: "Structural framing", range: [0.25, 0.5] as [number, number] },
  { label: "Façade & finishing", range: [0.5, 0.75] as [number, number] },
  { label: "Final handover", range: [0.75, 1] as [number, number] },
];

export const showcaseItems = [
  { caption: "Luxury Living Interior", image: REAL.interior[0], span: "row-span-2" },
  { caption: "Modern Kitchen Design", image: REAL.kitchen[0], span: "" },
  { caption: "Custom Furniture Detail", image: REAL.furniture[0], span: "" },
  { caption: "Living Hall Interior", image: REAL.hall[0], span: "" },
  { caption: "Villa Exterior", image: REAL.villa[7], span: "" },
  {
    caption: "Structural Layout Planning",
    image: REAL.structuralPlans[0],
    span: "row-span-2",
  },
  { caption: "Interior Concept Simulation", image: IMG.simInterior1, span: "" },
  { caption: "On-Site Execution", image: REAL.villa[3], span: "" },
  { caption: "RCC Structural Framework", image: REAL.villa[5], span: "" },
  { caption: "Foundation & Site Execution", image: REAL.structural[0], span: "row-span-2" },
  { caption: "Bedroom Interior Design", image: REAL.hall[4], span: "" },
  { caption: "Living Room Marble Finish", image: REAL.interior[4], span: "" },
  { caption: "Building Elevation Detailing", image: REAL.facade[0], span: "" },
];

export const brand = {
  logo: "/media/brand/logo.png",
  name: "Heaven",
  nameAccent: "Craft",
  subheading: "Infrastructures and Interiors",
};

export const studioAddress =
  "Heaven Craft Infrastructure & Interiors, Ground Floor, 24/2, BM Rd, Vidhya Nagar, Hassan, Karnataka 573201";

export const teamContacts = [
  {
    name: "Chethan Gowda",
    role: "Chief Head of Heavencraft",
    phone: "+91 98801 02797",
    phone2: "08172-258777",
    image: "/media/team/chetan-kumar.jpg",
  },
];

export const projectTypes = [
  "Interior",
  "Exterior",
  "Building Construction",
  "Road Construction",
  "Government Project",
  "Planning / Simulation",
];

// Full design portfolio extracted from the printed/PDF company brochure —
// every unique interior photo in it that isn't already shown elsewhere on
// the site (a handful of duplicates against the Construction Work gallery
// were filtered out). `thumb` is a compressed small version for the grid,
// `full` is the higher-res version opened in the lightbox.
export const brochureGallery: { thumb: string; full: string }[] = [
  { thumb: "/media/brochure/thumb/design-001.jpg", full: "/media/brochure/full/design-001.jpg" },
  { thumb: "/media/brochure/thumb/design-002.jpg", full: "/media/brochure/full/design-002.jpg" },
  { thumb: "/media/brochure/thumb/design-003.jpg", full: "/media/brochure/full/design-003.jpg" },
  { thumb: "/media/brochure/thumb/design-004.jpg", full: "/media/brochure/full/design-004.jpg" },
  { thumb: "/media/brochure/thumb/design-005.jpg", full: "/media/brochure/full/design-005.jpg" },
  { thumb: "/media/brochure/thumb/design-006.jpg", full: "/media/brochure/full/design-006.jpg" },
  { thumb: "/media/brochure/thumb/design-007.jpg", full: "/media/brochure/full/design-007.jpg" },
  { thumb: "/media/brochure/thumb/design-008.jpg", full: "/media/brochure/full/design-008.jpg" },
  { thumb: "/media/brochure/thumb/design-009.jpg", full: "/media/brochure/full/design-009.jpg" },
  { thumb: "/media/brochure/thumb/design-010.jpg", full: "/media/brochure/full/design-010.jpg" },
  { thumb: "/media/brochure/thumb/design-011.jpg", full: "/media/brochure/full/design-011.jpg" },
  { thumb: "/media/brochure/thumb/design-012.jpg", full: "/media/brochure/full/design-012.jpg" },
  { thumb: "/media/brochure/thumb/design-013.jpg", full: "/media/brochure/full/design-013.jpg" },
  { thumb: "/media/brochure/thumb/design-014.jpg", full: "/media/brochure/full/design-014.jpg" },
  { thumb: "/media/brochure/thumb/design-015.jpg", full: "/media/brochure/full/design-015.jpg" },
  { thumb: "/media/brochure/thumb/design-016.jpg", full: "/media/brochure/full/design-016.jpg" },
  { thumb: "/media/brochure/thumb/design-017.jpg", full: "/media/brochure/full/design-017.jpg" },
  { thumb: "/media/brochure/thumb/design-018.jpg", full: "/media/brochure/full/design-018.jpg" },
  { thumb: "/media/brochure/thumb/design-019.jpg", full: "/media/brochure/full/design-019.jpg" },
  { thumb: "/media/brochure/thumb/design-020.jpg", full: "/media/brochure/full/design-020.jpg" },
  { thumb: "/media/brochure/thumb/design-021.jpg", full: "/media/brochure/full/design-021.jpg" },
  { thumb: "/media/brochure/thumb/design-022.jpg", full: "/media/brochure/full/design-022.jpg" },
  { thumb: "/media/brochure/thumb/design-023.jpg", full: "/media/brochure/full/design-023.jpg" },
  { thumb: "/media/brochure/thumb/design-024.jpg", full: "/media/brochure/full/design-024.jpg" },
  { thumb: "/media/brochure/thumb/design-025.jpg", full: "/media/brochure/full/design-025.jpg" },
  { thumb: "/media/brochure/thumb/design-026.jpg", full: "/media/brochure/full/design-026.jpg" },
  { thumb: "/media/brochure/thumb/design-027.jpg", full: "/media/brochure/full/design-027.jpg" },
  { thumb: "/media/brochure/thumb/design-028.jpg", full: "/media/brochure/full/design-028.jpg" },
  { thumb: "/media/brochure/thumb/design-029.jpg", full: "/media/brochure/full/design-029.jpg" },
  { thumb: "/media/brochure/thumb/design-030.jpg", full: "/media/brochure/full/design-030.jpg" },
  { thumb: "/media/brochure/thumb/design-031.jpg", full: "/media/brochure/full/design-031.jpg" },
  { thumb: "/media/brochure/thumb/design-032.jpg", full: "/media/brochure/full/design-032.jpg" },
  { thumb: "/media/brochure/thumb/design-033.jpg", full: "/media/brochure/full/design-033.jpg" },
  { thumb: "/media/brochure/thumb/design-034.jpg", full: "/media/brochure/full/design-034.jpg" },
  { thumb: "/media/brochure/thumb/design-035.jpg", full: "/media/brochure/full/design-035.jpg" },
  { thumb: "/media/brochure/thumb/design-036.jpg", full: "/media/brochure/full/design-036.jpg" },
  { thumb: "/media/brochure/thumb/design-037.jpg", full: "/media/brochure/full/design-037.jpg" },
  { thumb: "/media/brochure/thumb/design-038.jpg", full: "/media/brochure/full/design-038.jpg" },
  { thumb: "/media/brochure/thumb/design-039.jpg", full: "/media/brochure/full/design-039.jpg" },
  { thumb: "/media/brochure/thumb/design-040.jpg", full: "/media/brochure/full/design-040.jpg" },
  { thumb: "/media/brochure/thumb/design-041.jpg", full: "/media/brochure/full/design-041.jpg" },
  { thumb: "/media/brochure/thumb/design-042.jpg", full: "/media/brochure/full/design-042.jpg" },
  { thumb: "/media/brochure/thumb/design-043.jpg", full: "/media/brochure/full/design-043.jpg" },
  { thumb: "/media/brochure/thumb/design-044.jpg", full: "/media/brochure/full/design-044.jpg" },
  { thumb: "/media/brochure/thumb/design-045.jpg", full: "/media/brochure/full/design-045.jpg" },
  { thumb: "/media/brochure/thumb/design-046.jpg", full: "/media/brochure/full/design-046.jpg" },
  { thumb: "/media/brochure/thumb/design-047.jpg", full: "/media/brochure/full/design-047.jpg" },
  { thumb: "/media/brochure/thumb/design-048.jpg", full: "/media/brochure/full/design-048.jpg" },
  { thumb: "/media/brochure/thumb/design-049.jpg", full: "/media/brochure/full/design-049.jpg" },
  { thumb: "/media/brochure/thumb/design-050.jpg", full: "/media/brochure/full/design-050.jpg" },
  { thumb: "/media/brochure/thumb/design-051.jpg", full: "/media/brochure/full/design-051.jpg" },
  { thumb: "/media/brochure/thumb/design-052.jpg", full: "/media/brochure/full/design-052.jpg" },
  { thumb: "/media/brochure/thumb/design-053.jpg", full: "/media/brochure/full/design-053.jpg" },
  { thumb: "/media/brochure/thumb/design-054.jpg", full: "/media/brochure/full/design-054.jpg" },
];

export const brochurePdfUrl = "/brochure/heaven-craft-design-brochure.pdf";
