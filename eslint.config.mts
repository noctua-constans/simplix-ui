import * as importPlugin from "eslint-plugin-import";
import * as prettier from "eslint-plugin-prettier";
import * as react from "eslint-plugin-react";
import ts from "typescript-eslint";

export default [
    {
        files: ["**/*.{js,cjs,mjs,jsx}"],
        rules: {
            "no-restricted-syntax": [
                "error",
                {
                    selector: "Program",
                    message: "JavaScript is not allowed in this repository. Use TypeScript only.",
                },
            ],
        },
    },

    ...ts.configs.recommended,

    {
        plugins: {
            react,
            prettier,
            import: importPlugin,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            parser: ts.parser,
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-empty": "warn",

            "import/no-duplicates": "warn",
            "import/order": [
                "warn",
                {
                    groups: ["builtin", "external", "internal", ["parent", "sibling"], "index"],
                    alphabetize: { order: "asc", caseInsensitive: true },
                    "newlines-between": "always",
                },
            ],

            "@typescript-eslint/consistent-type-imports": "warn",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/ban-ts-comment": "error",

            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-vars": "error",

            "prettier/prettier": "warn",
        },
    },

    {
        files: ["**/*.{ts,tsx,js,jsx}"],
    },

    {
        ignores: ["dist", "node_modules", "*.d.ts", "apps/docs/.vitepress"],
    },
];
