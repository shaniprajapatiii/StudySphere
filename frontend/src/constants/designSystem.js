/**
 * Unified Tailwind Design System for LearnStream
 * Centralizes all style constants for consistency across components
 */

// ============================================================================
// COLORS & PALETTES
// ============================================================================
export const COLORS = {
  primary: "indigo",
  secondary: "blue",
  success: "green",
  warning: "yellow",
  danger: "red",
  neutral: "gray",
  
  // Primary shades
  primaryLight: "indigo-100",
  primaryBase: "indigo-600",
  primaryDark: "indigo-700",
  primaryDarker: "indigo-900",
  
  // Secondary shades
  secondaryLight: "blue-100",
  secondaryBase: "blue-600",
  secondaryDark: "blue-700",
  
  // Neutral shades
  textPrimary: "gray-900",
  textSecondary: "gray-600",
  textTertiary: "gray-500",
  textLight: "gray-400",
  
  // Background
  bgPrimary: "white",
  bgSecondary: "gray-50",
  bgTertiary: "gray-100",
  bgHover: "gray-50",
};

// ============================================================================
// BUTTONS
// ============================================================================
export const BUTTON_STYLES = {
  // Primary button (most important actions)
  primary: "px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium",
  
  // Secondary button (alternative actions)
  secondary: "px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium",
  
  // Outline button (less emphasis)
  outline: "px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 active:bg-indigo-100 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium",
  
  // Ghost button (minimal emphasis)
  ghost: "px-6 py-2.5 text-indigo-600 rounded-lg hover:bg-indigo-50 active:bg-indigo-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium",
  
  // Danger button (destructive actions)
  danger: "px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium",
  
  // Success button (confirmation/positive actions)
  success: "px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium",
  
  // Sizes
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-2.5",
  lg: "px-8 py-3 text-lg",
  
  // Icon-only button
  icon: "p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200",
  iconPrimary: "p-2.5 rounded-lg text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200",
};

// ============================================================================
// CARDS
// ============================================================================
export const CARD_STYLES = {
  // Base card with shadow
  base: "bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200",
  
  // Elevated card (more prominent)
  elevated: "bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200",
  
  // Flat card (minimal shadow)
  flat: "bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors duration-200",
  
  // Interactive card (with hover effects)
  interactive: "bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer",
  
  // Contained card (with padding)
  contained: "bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200",
  
  // Bordered card with highlight on hover
  bordered: "bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-colors duration-200",
};

// ============================================================================
// INPUTS & FORMS
// ============================================================================
export const INPUT_STYLES = {
  // Base input field
  base: "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 bg-white",
  
  // Input with error
  error: "w-full px-4 py-2.5 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200 bg-white",
  
  // Input with success
  success: "w-full px-4 py-2.5 border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white",
  
  // Disabled input
  disabled: "w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed",
  
  // Textarea
  textarea: "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 bg-white resize-none",
  
  // Select/dropdown
  select: "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 bg-white appearance-none",
};

export const LABEL_STYLES = {
  base: "block font-semibold text-gray-900 mb-2",
  small: "block font-medium text-sm text-gray-700 mb-1",
  required: "block font-semibold text-gray-900 mb-2 after:content-['*'] after:ml-1 after:text-red-600",
};

// ============================================================================
// SPACING & LAYOUT
// ============================================================================
export const SPACING = {
  // Container widths
  containerSm: "max-w-sm",
  containerMd: "max-w-md",
  containerLg: "max-w-lg",
  containerXl: "max-w-xl",
  container2xl: "max-w-2xl",
  containerFull: "max-w-full",
  
  // Gaps
  gapXs: "gap-1",
  gapSm: "gap-2",
  gapMd: "gap-4",
  gapLg: "gap-6",
  gapXl: "gap-8",
  
  // Padding
  padXs: "p-2",
  padSm: "p-3",
  padMd: "p-4",
  padLg: "p-6",
  padXl: "p-8",
  
  // Margin
  marXs: "m-2",
  marSm: "m-3",
  marMd: "m-4",
  marLg: "m-6",
  marXl: "m-8",
};

// ============================================================================
// GRID LAYOUTS
// ============================================================================
export const GRID_STYLES = {
  // Responsive feed grid (video/playlist cards)
  feed: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4",
  
  // Responsive list grid
  list: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  
  // Two column grid
  twoCol: "grid grid-cols-1 md:grid-cols-2 gap-6",
  
  // Three column grid
  threeCol: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  
  // Container padding & max-width
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================
export const TYPOGRAPHY = {
  // Headings
  h1: "text-4xl font-bold text-gray-900",
  h2: "text-3xl font-bold text-gray-900",
  h3: "text-2xl font-bold text-gray-900",
  h4: "text-xl font-semibold text-gray-900",
  h5: "text-lg font-semibold text-gray-900",
  h6: "text-base font-semibold text-gray-900",
  
  // Body text
  bodyLg: "text-lg text-gray-700",
  body: "text-base text-gray-700",
  bodySm: "text-sm text-gray-600",
  bodyXs: "text-xs text-gray-500",
  
  // Special styles
  link: "text-indigo-600 hover:text-indigo-700 hover:underline transition-colors duration-200 cursor-pointer",
  linkInverse: "text-white hover:text-gray-100 hover:underline transition-colors duration-200 cursor-pointer",
  muted: "text-gray-500 text-sm",
};

// ============================================================================
// SHADOWS
// ============================================================================
export const SHADOWS = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  none: "shadow-none",
};

// ============================================================================
// BADGES & TAGS
// ============================================================================
export const BADGE_STYLES = {
  // Primary badge
  primary: "px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium",
  
  // Secondary badge
  secondary: "px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium",
  
  // Success badge
  success: "px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium",
  
  // Warning badge
  warning: "px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium",
  
  // Danger badge
  danger: "px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium",
  
  // Gray badge
  gray: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium",
  
  // Outlined badge
  outlined: "px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-xs font-medium",
};

// ============================================================================
// ANIMATIONS & TRANSITIONS
// ============================================================================
export const ANIMATIONS = {
  // Smooth transitions
  fadeIn: "transition-opacity duration-300",
  slideIn: "transition-transform duration-300",
  scaleIn: "transition-transform duration-200",
  
  // Hover effects
  hoverLift: "hover:-translate-y-1 transition-transform duration-300",
  hoverGlow: "hover:shadow-lg transition-shadow duration-200",
  hoverDarken: "hover:opacity-80 transition-opacity duration-200",
  
  // Loading animation
  pulse: "animate-pulse",
  spin: "animate-spin",
};

// ============================================================================
// ACCESSIBILITY
// ============================================================================
export const A11Y = {
  // Focus styles for keyboard navigation
  focusRing: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
  
  // Screen reader only text
  srOnly: "sr-only",
  
  // Skip to main content link
  skipLink: "absolute top-0 left-0 -translate-y-full px-4 py-2 bg-indigo-600 text-white rounded focus:translate-y-0",
};

// ============================================================================
// RESPONSIVE CLASSES
// ============================================================================
export const RESPONSIVE = {
  // Mobile-first responsive utility
  containerPadding: "px-4 sm:px-6 md:px-8 lg:px-12",
  
  // Text size responsive
  textResponsive: "text-sm sm:text-base md:text-lg",
  
  // Icon size responsive
  iconResponsive: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
};

// ============================================================================
// STATUS & STATE INDICATORS
// ============================================================================
export const STATUS_STYLES = {
  // Loading state
  loading: "opacity-50 cursor-wait",
  
  // Disabled state
  disabled: "opacity-50 cursor-not-allowed",
  
  // Error state
  error: "border-red-500 bg-red-50",
  
  // Success state
  success: "border-green-500 bg-green-50",
  
  // Warning state
  warning: "border-yellow-500 bg-yellow-50",
};

// ============================================================================
// CONSTANTS (Magic Numbers)
// ============================================================================
export const CONSTANTS = {
  // Debounce delays (milliseconds)
  debounceShort: 300,
  debounceNormal: 500,
  debounceLong: 1000,
  
  // Pagination
  itemsPerPage: 20,
  itemsPerPageSmall: 10,
  itemsPerPageLarge: 50,
  
  // Timeouts
  toastDuration: 3000,
  tooltipDelay: 500,
  transitionDuration: 300,
  
  // Image loading
  imageLQIP: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect fill='%23ddd' width='400' height='225'/%3E%3C/svg%3E",
  
  // Video/Playlist
  defaultThumbnailSize: "mqdefault", // small, medium, high quality
  videoMaxTitleLength: 60,
  descriptionMaxLength: 150,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Combine multiple style strings with proper spacing
 * Usage: combineStyles(BUTTON_STYLES.primary, ANIMATIONS.hoverGlow)
 */
export const combineStyles = (...styles) => {
  return styles.filter(Boolean).join(" ");
};

/**
 * Get responsive style class
 * Usage: getResponsiveClass({ base: 'text-sm', md: 'text-lg' })
 */
export const getResponsiveClass = (breakpoints) => {
  return Object.entries(breakpoints)
    .map(([bp, style]) => (bp === "base" ? style : `${bp}:${style}`))
    .join(" ");
};

/**
 * Get button style by variant
 * Usage: getButtonStyle('primary', 'lg')
 */
export const getButtonStyle = (variant = "primary", size = "md") => {
  const baseStyle = BUTTON_STYLES[variant] || BUTTON_STYLES.primary;
  const sizeClass = BUTTON_STYLES[size] || BUTTON_STYLES.md;
  return combineStyles(baseStyle, sizeClass);
};

/**
 * Get badge style by type
 * Usage: getBadgeStyle('success')
 */
export const getBadgeStyle = (type = "gray") => {
  return BADGE_STYLES[type] || BADGE_STYLES.gray;
};
