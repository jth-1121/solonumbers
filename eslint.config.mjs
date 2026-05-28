import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Marketing copy uses natural punctuation heavily. Keeping this off avoids noisy failures for normal apostrophes and quotes in JSX text.
      "react/no-unescaped-entities": "off",
    },
  },
  // Ov