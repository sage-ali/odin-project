/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order'],
  rules: {
    'color-named': 'never',

    // 1. ALLOW HEX COLORS
    // Changed from `true` to `null` to allow hex codes like #ffffff
    'color-no-hex': null,

    // 2. ALLOW RGB (Optional, but good practice if you allowed Hex)
    'function-disallowed-list': ['hwb', 'lch'],

    'selector-max-id': 0,

    // 3. ADD REQUIRED UNITS
    // Added 'vh', 'vw', 'fr' (for grid), and 's' (for animations)
    'unit-allowed-list': ['%', 'deg', 'px', 'rem', 'ms', 'vh', 'vw', 'fr', 's'],

    'declaration-property-unit-allowed-list': {
      '/^border/': ['px'],
      '/^padding|^gap/': ['rem'],
    },
    'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'rules', 'at-rules'],

    // 4. FIX BEM NAMING SUPPORT
    // Updated Regex to allow double underscores (__) and double hyphens (--)
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+)?$',
      {
        message: 'Expected class selector to follow BEM format (block__element--modifier)',
      },
    ],

    'keyframes-name-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      {
        message: 'The animation name must use the camelCase naming convention.',
      },
    ],
    'max-nesting-depth': 3,
    'no-duplicate-selectors': true,
    'no-descending-specificity': true,
    'property-no-unknown': true,
  },
  ignoreFiles: ['node_modules/**'],
};
