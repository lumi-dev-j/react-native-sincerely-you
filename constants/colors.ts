// Mirrors the Tailwind color tokens in global.css.
// Use this for the Style Exception Rules cases (StatusBar, native props,
// icon `color` props, etc.) where a NativeWind className isn't an option.

export const colors = {
  burgundy: "#7D3540",
  burgundyDark: "#59252D",
  roseDust: "#C79A9B",

  ink: "#24201E",
  inkMuted: "#6F6862",
  paper: "#F4EDE2",
  paperLight: "#FAF6EF",
  border: "#DDD3C7",

  sage: "#858574",
  slate: "#817C82",
} as const;
