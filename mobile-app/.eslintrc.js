module.exports = {
  env: {
    browser: true,
    'react-native/react-native': true,
  },
  extends: 'react-app',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
    'react-hooks',
    'unused-imports',
    'simple-import-sort',
  ],
  rules: {
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react/display-name': 'off',
    'react/style-prop-object': 0,
    'react/prop-types': 0,
    'unused-imports/no-unused-imports-ts': 'error',
    'unused-imports/no-unused-vars-ts': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native-gesture-handler',
            importNames: ['TouchableOpacity'],
            message:
              'It may cause issues with nested views on Android. Import TouchableOpacity from react-native instead.',
          },
          {
            name: 'react-native',
            importNames: ['SafeAreaView'],
            message:
              'It may not work correctly. Import SafeAreaView from react-native-safe-area-context instead.',
          },
        ],
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: false,
        reservedFirst: true,
      },
    ],
    'react/sort-prop-types': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: false,
        requiredFirst: true,
      },
    ],
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
}
