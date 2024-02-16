/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-packagejson").PluginOptions} Packagejson */

/** @type {PrettierConfig | Packagejson } */
const prettierConfig = {
  singleQuote: true,
  plugins: ['prettier-plugin-packagejson'],
};

export default prettierConfig;
