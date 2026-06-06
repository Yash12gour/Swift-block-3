import { StandardBlockSize, TechnicalSpec, Differentiator, InstallationStep, ToolItem, GroupCompany } from "./types";

export const STANDARD_SIZES: StandardBlockSize[] = [
  { id: "s1", l: 600, h: 200, w: 75 },
  { id: "s2", l: 600, h: 200, w: 100 },
  { id: "s3", l: 600, h: 200, w: 150 },
  { id: "s4", l: 600, h: 200, w: 200 },
  { id: "s5", l: 600, h: 200, w: 225 },
  { id: "s6", l: 600, h: 200, w: 250 },
  { id: "s7", l: 600, h: 250, w: 100 },
  { id: "s8", l: 600, h: 250, w: 150 },
  { id: "s9", l: 600, h: 250, w: 200 },
  { id: "s10", l: 600, h: 250, w: 250 },
  { id: "s11", l: 600, h: 250, w: 300 }
];

export const TECHNICAL_SPECS: TechnicalSpec[] = [
  { characteristic: "Compressive Strength", unit: "N/mm²", value: "4.0 to 5.0" },
  { characteristic: "Density (Oven Dry Condition)", unit: "kg/m³", value: "551 to 700" },
  { characteristic: "Thermal Expansion Coefficient", unit: "/K", value: "8 x 10⁻⁶" },
  { characteristic: "Thermal Conductivity", unit: "W/m·K", value: "0.12 - 0.16 (Highly Insulating)" },
  { characteristic: "Fire Resistance Rate", unit: "Hours", value: "Up to 4 Hours (UL Classified)" },
  { characteristic: "Sound Transmission Class (STC)", unit: "dB", value: "38 to 44" },
  { characteristic: "Dampness & Moisture Absorption", unit: "%", value: "< 10% (Low Water Absorption)" },
  { characteristic: "Dimensional Tolerance", unit: "mm", value: "± 1.5 (Extremely Accurate)" }
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    num: "01",
    title: "Fully Automatic Plant",
    description: "Cutting-edge machinery ensuring zero defects and absolute precision in every block.",
    points: ["Computerized dosing & mixing", "Zero-contact precision cutting line", "Fully automated autoclave steam curing"]
  },
  {
    num: "02",
    title: "Eco-Friendly Footprint",
    description: "Certified sustainable materials that prevent high carbon release and direct environmental degradation.",
    points: ["Utilizes fly ash waste byproduct", "Zero-wastage recycling loop", "Saves fertile agricultural topsoil"]
  },
  {
    num: "03",
    title: "Lightweight Architecture",
    description: "Engineered with millions of microscopic air pockets to reduce total structural weight.",
    points: ["Up to 3x lighter than clay bricks", "Decreases structural loading by 30%+", "Saves steel & foundation concrete costs"]
  },
  {
    num: "04",
    title: "Speed & Uniformity",
    description: "Uniform block sizes cut with automated wire slicers for speedier construction.",
    points: ["Length 600mm for swift tile-up", "3x faster laying speed than bricks", "Requires 70% less jointing mortar"]
  },
  {
    num: "05",
    title: "Rigorous Strength Standards",
    description: "Complies completely with standard BIS (Bureau of Indian Standards) regulations under ISI standards.",
    points: ["Consistent 4.0 - 5.0 N/mm² strength", "Highly robust microstructural core", "Saves earthquake seismic stress lines"]
  },
  {
    num: "06",
    title: "Microclimatic Insulation",
    description: "Maintains optimal indoor environments by restricting heat and sound ingress effectively.",
    points: ["Cuts hot air conduction drastically", "Substantial air conditioner power savings", "Acoustic control up to 44 decibels"]
  }
];

export const TOOL_KIT: ToolItem[] = [
  {
    name: "Plastic Bucket",
    description: "Specially designed heavy-duty bucket to prepare and transport thin-bed mortar efficiently.",
    iconName: "Bucket",
    useCase: "PMC mortar mixing and on-site mortar transportation"
  },
  {
    name: "Joint Finishing Blade",
    description: "Fills remaining microscopic mortar gaps and smooths jointer lines cleanly.",
    iconName: "PenTool",
    useCase: "Seals vertical and horizontal joint gaps beautifully"
  },

  {
    name: "Angle Grinder",
    description: "Allows clean and swift routing of channels for running electric pipes and plumbing pipes.",
    iconName: "Hammer",
    useCase: "Routing wire shafts and pipe recesses"
  },
  {
    name: "Block Cleaning Brush",
    description: "Thick bristly wire brush to remove loose cement granules and dust prior to applying adhesive.",
    iconName: "Brush",
    useCase: "Maximizes mortar bond strength via complete dust clearance"
  },
  {
    name: "Rubber Mallet",
    description: "Absorbs harsh impact to align AAC blocks without cracking edges or surfaces.",
    iconName: "Hammer",
    useCase: "Tapping blocks during course alignment"
  },
  {
    name: "Notched Trowel",
    description: "Sleek steel comb to layer a uniform film of 2-4mm polymer-modified mortar along the block width.",
    iconName: "Grid",
    useCase: "Applying even thin bed adhesive films"
  },
  {
    name: "Mortar Mixer",
    description: "Manual mechanical drill mixer attachment to achieve a smooth lump-free paste texture.",
    iconName: "Cpu",
    useCase: "Stirs mortar particles into highly stable, dense paste"
  },
  {
    name: "Hand Saw",
    description: "Equipped with specialized carbide teeth that glide effortlessly through aerated concrete matrix.",
    iconName: "Scissors",
    useCase: "Custom length adjustments and angle slicing"
  }
];

export const INSTALLATION_STEPS: InstallationStep[] = [
  {
    step: 1,
    title: "Surface Preparation",
    description: "Mark structural layout lines rigidly on the concrete slab. Ensure surfaces are clear, free from rubble, and dampened with refreshing mist."
  },
  {
    step: 2,
    title: "Base Leveling Course",
    description: "Lay a highly supportive 1:6 ratio sand-cement leveling mortar (max 1\" thickness). Check alignment perfectly and allow 7 days basic cure."
  },
  {
    step: 3,
    title: "Mortar Preparation",
    description: "Mix PMC (Polymer Modified Cement) at a 3:1 powder-to-water ratio. Whip with a mixer until smooth and trowel a uniform 2-3mm layer."
  },
  {
    step: 4,
    title: "First Course Laying",
    description: "Dust and moisten each block. Place firmly using light taps with a rubber mallet. Hack columns to create anchor slots where blocks merge."
  },
  {
    step: 5,
    title: "Corner Setting Check",
    description: "Establish highly exact level checkpoints at all leading corners. Double check layout angles with a standard professional right-angle square."
  },
  {
    step: 6,
    title: "Layer Level Controls",
    description: "Constantly leverage a high-accuracy spirit bubble level or laser level on every course. Correct alignment immediately with micro taps."
  },
  {
    step: 7,
    title: "Staggered Stacking",
    description: "Place blocks in a staggered layout ensuring a constant minimum 8\" (200mm) overlap to lock joints. Absolutely avoid continuous straight vertical joints."
  },
  {
    step: 8,
    title: "Joint Crack Prevention",
    description: "Lay supportive high-strength fiber glass mesh or galvanized chicken mesh at all structural interfaces (such as concrete column-to-block gaps)."
  },
  {
    step: 9,
    title: "Clean Alignment & Final Gaps",
    description: "Immediately scrape off excess adhesive that squeezes out of seams. Fill any leftover surface holes using specialized joint fillers for curing."
  }
];

export const GROUP_COMPANIES: GroupCompany[] = [
  {
    name: "Swift Construction",
    sub: "Construction & Infrastructure Projects",
    address: "E-91 Patel Nagar, Raisen Road, Bhopal, MP. Pin: 462022",
    phone: "+91 90748 09981"
  },
  {
    name: "Swift Associates",
    sub: "Architecture & Interior Design Services",
    address: "FF 39, First Floor, Rishi Business Park, Bhopal, MP. Pin: 462026",
    phone: "+91 78696 60964"
  },
  {
    name: "Swift Enterprises",
    sub: "Precision Fabrication Company",
    address: "Sector - F, 56, Bagroda Industrial Area, Bhopal, MP. Pin: 462026",
    phone: "+91 98262 89079"
  }
];
