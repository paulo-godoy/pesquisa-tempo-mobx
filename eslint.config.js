import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Permite interfaces vazias que estendem outras (ex: DefaultTheme)
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
      // Desativa o erro para tipos vazios (causa falso positivo no seu caso)
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
])
