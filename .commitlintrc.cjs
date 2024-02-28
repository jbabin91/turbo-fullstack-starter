const scopes = [
  { value: 'repo', name: 'repo: anything related to managing the repo itself' },
  { value: 'frontend', name: 'frontend: anything related to the frontend app' },
  { value: 'backend', name: 'backend: anything related to the backend app' },
  { value: 'packages', name: 'packages: anything related to packages' },
  { value: 'tooling', name: 'tooling: anything related to the tooling' },
];

/** @type {import("cz-git").UserConfig} */
const config = {
  alias: {
    b: 'chore(repo): bump dependencies',
  },
  scopesSearchValue: true,
  maxSubjectLength: 100,
  allowCustomScopes: false,
  allowEmptyScopes: false,
  allowCustomIssuePrefix: false,
  allowEmptyIssuePrefix: false,
  prompt: {
    scopes,
    useEmoji: true,
  },
  skipQuestions: ['footer'],
};

module.exports = config;
