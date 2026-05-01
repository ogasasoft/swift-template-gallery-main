# Performance Monitoring Scripts

This directory contains scripts for monitoring and optimizing application performance.

## Performance Check Script

The `performance-check.sh` script analyzes the application for performance issues and provides optimization recommendations.

### Features

- **Bundle Size Analysis**: Checks production bundle size and gzipped size
- **Unused Dependencies**: Identifies unused packages that can be removed
- **Build Time**: Measures build time and provides optimization suggestions
- **Test Performance**: Analyzes test suite execution time
- **Code Complexity**: Estimates average functions per file and complexity level

### How to Use

```bash
# Run performance check
npm run performance

# Run all quality and performance checks
npm run all-checks
```

### Performance Score Breakdown

The script provides a score out of 40 points:

- **Bundle Size Analysis** (10 points): Checks if bundle size is optimal
- **Unused Dependencies** (8 points): Identifies unused packages
- **Build Time** (8 points): Measures and evaluates build performance
- **Test Performance** (7 points): Analyzes test suite speed
- **Code Complexity** (7 points): Estimates code complexity level

### Score Categories

- **Excellent** (32-40): Application performs well
- **Good** (24-31): Application performs acceptably
- **Fair** (16-23): Some performance optimizations recommended
- **Poor** (0-15): Major performance improvements needed

### Recommendations

Based on the score, the script provides specific recommendations:

- If bundle size is large: Consider dynamic imports and code splitting
- If unused dependencies exist: Remove them using `npx depcheck`
- If build time is slow: Consider caching strategies
- If tests are slow: Consider parallel execution or test caching

### Dependencies

The script uses `depcheck` for unused dependency detection. If you want to run it standalone:

```bash
npx depcheck --ignores='*test*,react-router-dom'
```

### Example Output

```
⚡ Swift Template Gallery - パフォーマンスモニタリング開始...

📦 Bundle Size Analysis (10 points)
  Minified Size: 401.44 kB
  Gzipped Size: 125.90 kB
  ✅ PASS - Bundle size is optimal

🔍 Unused Dependencies Analysis (8 points)
  Results: 0 unused dependencies detected
  ✅ PASS - All dependencies are being used

📊 Performance Score: 38 / 40
✅ Excellent - Application performs well!
```
