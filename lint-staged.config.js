export default {
  "*.{ts,tsx,js,jsx}": ["oxlint --fix", "prettier --write"],
  "*.{json,md,css,scss}": ["prettier --write"],
};
