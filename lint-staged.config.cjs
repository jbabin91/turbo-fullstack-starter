module.exports = {
  // Type check TypeScript files
  '(apps|packages|tooling)/**/*.(ts|tsx)': () => 'pnpm typecheck',

  // Lint then format TypeScript and JavaScript files
  '(apps|packages|tooling)/**/*.(ts|tsx|js)': (filenames) => [
    `pnpm eslint --fix ${filenames.join(' ')}`,
    `pnpm prettier -uw ${filenames.join(' ')}`,
  ],
};
