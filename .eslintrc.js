module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react-native/no-inline-styles': 0,
    // curly: 0,
    // quotes: 0,
    // 'dot-notation': 0,
    // 'react/self-closing-comp': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
