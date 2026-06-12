module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [1, 'always', 140],
    'type-enum': [
      2,
      'always',
      [
        'break', // use break: instead of feat!: or BREAKING CHANGE footer
        'feat',
        'fix',
        // 'docs', // prefer fix(docs): instead of docs
        'chore',
        'revert',
        'cont', // continue progress within a p
      ],
    ],
    // forbid ! prefix (use break: instead)
    'subject-exclamation-mark': [2, 'never'],
  },
};
