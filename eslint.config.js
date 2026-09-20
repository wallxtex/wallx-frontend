import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import sonarjs from 'eslint-plugin-sonarjs'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      sonarjs
    },
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "no-unused-vars": "warn",
      "react-refresh/only-export-components": "off",
      ...sonarjs.configs.recommended.rules
    },
  },
])
