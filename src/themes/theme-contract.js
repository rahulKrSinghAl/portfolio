/**
 * @typedef {Object} AestheticTheme
 *
 * Every theme registered in the theme registry must conform to this shape.
 *
 * @property {string}   id                - Unique slug, e.g. "japanese"
 * @property {string}   name              - Human-readable name, e.g. "Japanese"
 * @property {string}   description       - One-liner shown in the gallery
 * @property {string}   icon              - Single character / emoji for the gallery card
 *
 * --- Design tokens ---
 * @property {Object}   colors            - Raw color tokens (primary / secondary / neutrals)
 * @property {Object}   typographyConfig  - Font families, weights, letter-spacing map
 * @property {Object}   tokens            - { spacing, glassEffect, animations }
 *
 * --- Factories (called with "dark" | "light") ---
 * @property {function(string): Object}  palette       - Returns MUI-compatible palette object
 * @property {function(string): Object}  glowColors    - Returns { primaryGlow(alpha), secondaryGlow(alpha) }
 * @property {function(string): Object}  muiOverrides  - Returns MUI component overrides
 *
 * --- Decorative components (React) ---
 * @property {Object|null} decorativeComponents
 *   { Background, DecorativeElements, SectionDivider }
 *   May be null initially and resolved lazily via the components.js barrel.
 */

export {};
