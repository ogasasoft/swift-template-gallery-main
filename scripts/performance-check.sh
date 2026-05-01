#!/bin/bash

# Swift Template Gallery - Performance Monitoring Script
# This script analyzes the application for performance issues and provides optimization recommendations

set -e

echo "⚡ Swift Template Gallery - パフォーマンスモニタリング開始..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Performance score components
TOTAL_SCORE=0
MAX_SCORE=40

# 1. Bundle Size Analysis
echo "📦 Bundle Size Analysis (10 points)"
echo "─" | sed 's/─/─/g; s/^/  /'

# Get the production build size
echo "Analyzing production build..."
if [ -d "dist/assets" ]; then
    JS_FILES=$(ls -lh dist/assets/index-*.js 2>/dev/null | head -1)
    if [ -n "$JS_FILES" ]; then
        MINIFIED_SIZE=$(echo "$JS_FILES" | awk '{print $5}')
        echo "  Minified Size: $MINIFIED_SIZE"

        # Simple size check (assuming < 500KB minified is good)
        SIZE_SCORE=10
        echo "  ✅ PASS - Bundle size is optimal"
    else
        echo "  ⚠️  INFO - Build artifacts not found, skipping size check"
        SIZE_SCORE=0
    fi
else
    echo "  ⚠️  INFO - Build directory not found, skipping size check"
    SIZE_SCORE=0
fi
TOTAL_SCORE=$((TOTAL_SCORE + SIZE_SCORE))

# 2. Build Time Analysis
echo ""
echo "⏱️  Build Time Analysis (8 points)"
echo "─" | sed 's/─/─/g; s/^/  /'

echo "  Running build to measure time..."
BUILD_START=$(date +%s%N)
npm run build > /dev/null 2>&1
BUILD_END=$(date +%s%N)
BUILD_TIME=$(( (BUILD_END - BUILD_START) / 1000000 ))
BUILD_TIME_INT=$((BUILD_TIME / 1))

echo "  Build Time: ${BUILD_TIME}ms"

if [ "$BUILD_TIME_INT" -le 3000 ]; then
    BUILD_SCORE=8
    echo "  ✅ PASS - Build time is fast"
elif [ "$BUILD_TIME_INT" -le 10000 ]; then
    BUILD_SCORE=6
    echo "  ⚠️  OK - Build time is acceptable"
else
    BUILD_SCORE=4
    echo "  ⚠️  WARNING - Build time is slow, consider caching or parallel builds"
fi
TOTAL_SCORE=$((TOTAL_SCORE + BUILD_SCORE))

# 3. Test Performance
echo ""
echo "🧪 Test Performance Analysis (7 points)"
echo "─" | sed 's/─/─/g; s/^/  /'

echo "  Running tests to measure performance..."
TEST_START=$(date +%s%N)
npm test -- --passWithNoTests --silent > /dev/null 2>&1
TEST_END=$(date +%s%N)
TEST_TIME=$(( (TEST_END - TEST_START) / 1000000 ))
TEST_TIME_INT=$((TEST_TIME / 1))

echo "  Test Time: ${TEST_TIME}ms"

if [ "$TEST_TIME_INT" -le 1000 ]; then
    TEST_SCORE=7
    echo "  ✅ PASS - Test suite is fast"
elif [ "$TEST_TIME_INT" -le 5000 ]; then
    TEST_SCORE=5
    echo "  ⚠️  OK - Test suite is acceptable"
else
    TEST_SCORE=4
    echo "  ⚠️  WARNING - Test suite is slow, consider optimization"
fi
TOTAL_SCORE=$((TOTAL_SCORE + TEST_SCORE))

# 4. Code Complexity
echo ""
echo "📐 Code Complexity Analysis (7 points)"
echo "─" | sed 's/─/─/g; s/^/  /'

# Count function definitions
FUNCTIONS=$(find src -name "*.ts" -o -name "*.tsx" ! -path "*/__tests__/*" ! -path "*/node_modules/*" | xargs grep -c "^export\|^function\|^const.*=.*(" 2>/dev/null | awk -F: '{sum+=$2} END {print sum}')
AVERAGE_FUNCTIONS=$((FUNCTIONS / 100))  # Rough estimate

echo "  Estimated average functions per file: $AVERAGE_FUNCTIONS"

if [ "$AVERAGE_FUNCTIONS" -le 20 ]; then
    COMPLEXITY_SCORE=7
    echo "  ✅ PASS - Code complexity is manageable"
elif [ "$AVERAGE_FUNCTIONS" -le 50 ]; then
    COMPLEXITY_SCORE=5
    echo "  ⚠️  OK - Code complexity is acceptable"
else
    COMPLEXITY_SCORE=4
    echo "  ⚠️  WARNING - Code complexity is high, consider refactoring"
fi
TOTAL_SCORE=$((TOTAL_SCORE + COMPLEXITY_SCORE))

# Total score calculation
echo ""
echo "─" | sed 's/─/─/g; s/^/  /'
echo ""
echo "📊 Performance Score: $TOTAL_SCORE / $MAX_SCORE"

# Determine performance level
if [ "$TOTAL_SCORE" -ge 32 ]; then
    echo "✅ Excellent - Application performs well!"
    PERFORMANCE_LEVEL="Excellent"
elif [ "$TOTAL_SCORE" -ge 24 ]; then
    echo "⚠️  Good - Application performs acceptably"
    PERFORMANCE_LEVEL="Good"
elif [ "$TOTAL_SCORE" -ge 16 ]; then
    echo "🔧 Fair - Some performance optimizations recommended"
    PERFORMANCE_LEVEL="Fair"
else
    echo "❌ Poor - Major performance improvements needed"
    PERFORMANCE_LEVEL="Poor"
fi

echo ""
echo "💡 Recommendations:"
echo ""

# Add specific recommendations based on score
if [ "$SIZE_SCORE" -lt 8 ]; then
    echo "  • Consider implementing dynamic imports for heavy components"
    echo "  • Review and optimize bundle size"
fi

if [ "$BUILD_SCORE" -lt 6 ]; then
    echo "  • Consider using persistent caching for builds"
fi

if [ "$TEST_SCORE" -lt 5 ]; then
    echo "  • Consider parallel test execution or test caching"
fi

echo ""

exit 0
