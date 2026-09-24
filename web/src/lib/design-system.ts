// Design System Centralizado — Resguardo Inga Kamentsá de Mocoa
// Paleta Ancestral-Moderna: selva profunda, ocre dorado, arcilla, niebla

export const ingaTokens = {
  colors: {
    selva: {
      50: "#eef4ee",
      100: "#d6e7d6",
      200: "#aec9ad",
      300: "#84ab83",
      500: "#1a3a2a", // primary deep
      700: "#14301e",
      900: "#0f241a",
      950: "#0a160f",
    },
    ocre: {
      100: "#fdf3d7",
      300: "#ecd18a",
      400: "#d4a24e", // ceremonial gold
      500: "#c08c2e",
      600: "#9e7428",
      700: "#7a5a1f",
    },
    arcilla: {
      100: "#f7e6dc",
      300: "#d8b4a0",
      500: "#b0704a", // tierra
      600: "#8f5740",
      700: "#7a3f2a",
    },
    niebla: {
      50: "#fdfcf8",
      100: "#f5f1e8",
      200: "#ebe5d5",
    },
    // semantic
    background: "var(--background)",
    foreground: "var(--foreground)",
  },
  font: {
    display: "var(--font-fraunces)", // títulos con presencia
    body: "var(--font-jakarta)", // cuerpo legible
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
  },
  shadow: {
    selva: "0 8px 32px rgba(15,36,26,0.18)",
    ocreGlow: "0 0 20px rgba(212,162,78,0.35)",
    soft: "0 4px 24px rgba(15,36,26,0.08)",
  },
} as const;

export const motion = {
  easeOrganic: [0.25, 0.1, 0.25, 1] as const,
  duration: { fast: 0.3, base: 0.6, slow: 0.9 },
  stagger: 0.08,
};

// Métricas territoriales mock para Recharts/Tremor
export const territoryMetrics = [
  { name: "Familias", value: 187, change: "+12" },
  { name: "Eventos año", value: 24, change: "+4" },
  { name: "Usuarios", value: 642, change: "+38" },
  { name: "Territorio ha", value: 1280, change: "estable" },
];

export const culturalPillars = [
  {
    title: "Lengua Inga",
    desc: "Nukanchipa Iuiaí — revitalización y transmisión a nuevas generaciones.",
    icon: "Languages",
    color: "selva",
  },
  {
    title: "Medicina Ancestral",
    desc: "Yagé, plantas sagradas y saberes de los mayores taitas.",
    icon: "Leaf",
    color: "ocre",
  },
  {
    title: "Territorio y Armonía",
    desc: "Cuidado de la selva del Putumayo, agua y biodiversidad.",
    icon: "Mountain",
    color: "arcilla",
  },
  {
    title: "Tejido y Artesanía",
    desc: "Simbolos, colores y tejidos que narran la memoria.",
    icon: "Sparkles",
    color: "ocre",
  },
];
