# Swift Template Gallery - Quality Checklist

このドキュメントは、Swift Template Galleryのコードベース品質を継続的に監視するための標準化されたチェックリストです。

## 📊 品質検査項目 (7項目)

### 🔥 CRITICAL レベル (4項目)

#### 1. ビルドエラー・警告確認

```bash
npm run build 2>&1 | grep -E "(Error|Warning|Failed|error|warning|failed)" | wc -l
```

**期待値**: 0件
**説明**: 本番ビルドでエラーや警告が発生していないか確認

#### 2. TypeScriptコンパイルエラー確認

```bash
npm run typecheck 2>&1 | grep "error TS" | wc -l
```

**期待値**: 0件
**説明**: TypeScriptの型エラーが完全に解決されているか確認

#### 3. セキュリティ脆弱性確認

```bash
find src -name "*.ts" -o -name "*.tsx" | xargs grep -E "(password|secret|key).*=" | grep -v "PASSWORD|SECRET|API_KEY" | wc -l
```

**期待値**: ハードコードされた秘密情報なし
**説明**: パスワード、APIキー、秘密情報のハードコードがないか確認

#### 4. 動的ルート設定確認

```bash
grep -r "export const dynamic" src --include="*.ts" | wc -l
```

**期待値**: Next.js App Routerでは通常0件（認証が必要なルートのみ例外）
**説明**: Next.js動的レンダリング設定が適切か確認

### ⚡ HIGH レベル (3項目)

#### 5. デバッグログ残存確認

```bash
find src -name "*.ts" -o -name "*.tsx" | xargs grep -E "console\.(log|debug|info)" | wc -l
```

**期待値**: 0件 (console.errorは除く)
**説明**: 本番環境に不適切なデバッグログが残っていないか確認

#### 6. 問題コメント確認

```bash
find src -name "*.ts" -o -name "*.tsx" | xargs grep -E "TODO|FIXME|XXX|HACK" | wc -l
```

**期待値**: 0件 (適切なNOTEコメントは可)
**説明**: 未解決のタスクや問題コメントが残っていないか確認

#### 7. 関数重複確認

```bash
find src -name "*.ts" | xargs grep -l "function.*Pagination" | wc -l
```

**期待値**: 1件 (Pagination.tsx のみ)
**説明**: 重複したレンダリングロジックがないか確認

---

## 🎯 品質スコア計算

### スコア基準

- **CRITICAL**: 各4点 (最大16点)
- **HIGH**: 各3点 (最大9点)

**満点**: 25点
**合格基準**: 22点以上 (88%以上)

### 品質レベル判定

- **25点**: 🏆 Perfect - 企業レベル品質
- **22-24点**: ✅ Excellent - 本番デプロイ可能
- **19-21点**: ⚠️ Good - 軽微な改善推奨
- **16-18点**: 🔧 Fair - 改善必要
- **15点以下**: ❌ Poor - 大幅な修正必要

---

## 📋 検査実行例

```bash
#!/bin/bash
echo "🔍 Swift Template Gallery品質検査開始..."

# CRITICAL
echo "1. ビルドエラー:"
npm run build 2>&1 | grep -E "(Error|Warning|Failed|error|warning|failed)" | wc -l

echo "2. TypeScriptエラー:"
npm run typecheck 2>&1 | grep "error TS" | wc -l

echo "3. セキュリティ脆弱性:"
find src -name "*.ts" -o -name "*.tsx" | xargs grep -E "(password|secret|key).*=" | grep -v "PASSWORD|SECRET|API_KEY" | wc -l

echo "4. 動的ルート設定:"
grep -r "export const dynamic" src --include="*.ts" | wc -l

# HIGH
echo "5. デバッグログ:"
find src -name "*.ts" -o -name "*.tsx" | xargs grep -E "console\.(log|debug|info)" | wc -l

echo "6. 問題コメント:"
find src -name "*.ts" -o -name "*.tsx" | xargs grep -E "TODO|FIXME|XXX|HACK" | wc -l

echo "7. 関数重複:"
find src -name "*.ts" | xargs grep -l "function.*Pagination" | wc -l

echo "✅ 検査完了"

# スコア計算
BUILD_ERRORS=$(npm run build 2>&1 | grep -E "(Error|Warning|Failed|error|warning|failed)" | wc -l | tr -d ' ')
TS_ERRORS=$(npm run typecheck 2>&1 | grep "error TS" | wc -l | tr -d ' ')
SECURITY=$(find src -name "*.ts" -o -name "*.tsx" | xargs grep -E "(password|secret|key).*=" | grep -v "PASSWORD|SECRET|API_KEY" | wc -l | tr -d ' ')
DYNAMIC=$(grep -r "export const dynamic" src --include="*.ts" | wc -l | tr -d ' ')
LOGS=$(find src -name "*.ts" -o -name "*.tsx" | xargs grep -E "console\.(log|debug|info)" | wc -l | tr -d ' ')
TODO=$(find src -name "*.ts" -o -name "*.tsx" | xargs grep -E "TODO|FIXME|XXX|HACK" | wc -l | tr -d ' ')
DUPLICATES=$(find src -name "*.ts" | xargs grep -l "function.*Pagination" | wc -l | tr -d ' ')

CRITICAL_SCORE=$((4 - BUILD_ERRORS - TS_ERRORS - SECURITY - DYNAMIC))
HIGH_SCORE=$((3 - LOGS - TODO - DUPLICATES))
TOTAL_SCORE=$((CRITICAL_SCORE + HIGH_SCORE))

echo ""
echo "📊 品質スコア: $TOTAL_SCORE / 25"

if [ $TOTAL_SCORE -ge 22 ]; then
    echo "✅ Excellent - 本番デプロイ可能"
elif [ $TOTAL_SCORE -ge 19 ]; then
    echo "⚠️ Good - 軽微な改善推奨"
else
    echo "🔧 Fair - 改善必要"
fi
```

---

## 📝 使用方法

1. **定期検査**: リリース前、PR作成時に実行
2. **CI/CD連携**: GitHub ActionsやGitLab CIに組み込む
3. **継続的改善**: 開発フローに組み込んで品質維持

## 🔄 更新履歴

- **v1.0 (2026-03-24)**: 初版作成
  - Swift Template Gallery専用の品質チェックリスト策定
  - Next.js App Router対応
  - シェルスクリプトでの自動化

---

**💡 Tips**: このチェックリストを使用して「本当に大丈夫？」の問いに対し、客観的な数値と根拠に基づいた回答を提供できます。
