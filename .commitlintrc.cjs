const scopes = [
  { value: "repo", name: "repo: anything related to managing the repo itself" },
  { value: "eslint", name: "eslint: anything global eslint specific" },
  { value: "github", name: "github: anything github workflows specific" },
  { value: "prettier", name: "prettier: anything global prettier specific" },
  { value: "tailwind", name: "tailwind: anything global tailwind specific" },
  {
    value: "typescript",
    name: "typescript: anything global tsconfig specific",
  },
];

/** @type {import("cz-git").UserConfig} */
const config = {
  alias: {
    b: "chore(repo): bump dependencies",
  },
  scopesSearchValue: true,
  maxSubjectLength: 100,
  allowCustomScopes: false,
  allowEmptyScopes: false,
  allowCustomIssuePrefix: false,
  allowEmptyIssuePrefix: false,
  prompt: {
    scopes,
    enableMultipleScopes: true,
    scopeEnumSeparator: ",",
    useEmoji: true,
  },
};

module.exports = config;
