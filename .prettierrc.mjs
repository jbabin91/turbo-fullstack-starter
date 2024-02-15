/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-packagejson").PluginOptions} Packagejson */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} Tailwindcss */

/** @type {PrettierConfig | Packagejson | Tailwindcss} */
const prettierConfig = {
  singleQuote: true,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
};

export default prettierConfig;
