export default {
  "src/**/*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css,scss}": ["prettier --write"],
  // Ignore built and generated directories
  "storybook-static/**/*.{ts,tsx,js,jsx}": [],
  "dist/**/*.{ts,tsx,js,jsx}": [],
  "coverage/**/*.{ts,tsx,js,jsx}": [],
};
