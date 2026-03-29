# Storybook ガイド

このドキュメントでは、swift-template-gallery プロジェクトにおける Storybook の使い方、ストーリーの書き方、ベストプラクティスについて説明します。

## 目次

- [概要](#概要)
- [セットアップと設定](#セットアップと設定)
- [ストーリーの種類](#ストーリーの種類)
  - [Component Stories](#component-stories)
  - [Page Stories](#page-stories)
  - [Interaction Testing Stories](#interaction-testing-stories)
- [MDX ドキュメント](#mdx-ドキュメント)
- [Controls と Args](#controls-と-args)
- [アクション (Actions)](#アクション-actions)
- [ベストプラクティス](#ベストプラクティス)
- [プロジェクト固有の考慮事項](#プロジェクト固有の考慮事項)

---

## 概要

このプロジェクトでは **Storybook v10** を使用しています。ストーリーファイルは `src/stories/` に置かれており、実際のコンポーネントに対応するストーリーを記述します。

**起動コマンド:**

```bash
npm run storybook        # 開発サーバー起動 (ポート 6006)
npm run build-storybook  # 静的ビルド
```

**ストーリーファイルの配置場所:**

```
src/
  stories/
    Button.stories.ts       # シンプルなコンポーネントストーリー
    Header.stories.ts       # 複数バリアントのストーリー
    Page.stories.ts         # インタラクションテストを含むページストーリー
    Pagination.stories.tsx  # 複雑なコンポーネントの包括的ストーリー
    Configure.mdx           # MDX ドキュメント
```

---

## セットアップと設定

### `.storybook/main.ts`

プロジェクトのストーリーパターンとアドオンを設定します。

```typescript
// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: ["@storybook/addon-docs", "@storybook/addon-onboarding"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	viteFinal: async (config) => {
		// パスエイリアスの設定
		config.resolve!.alias = {
			"@": path.resolve(__dirname, "../src"),
		};
		return config;
	},
};

export default config;
```

**ポイント:**

- `@storybook/react-vite` フレームワークを使用（Vite との統合）
- `@` エイリアスは `src/` ディレクトリにマッピング済み — `@/components/...` で src 配下のコンポーネントをインポートできる

### `.storybook/preview.ts`

グローバルなスタイルとコントロールの設定を行います。

```typescript
// .storybook/preview.ts
import type { Preview } from "@storybook/react";
import "../src/index.css"; // Tailwind CSS などグローバルスタイルを読み込む

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			options: {
				light: { name: "Light", value: "#ffffff" },
				dark: { name: "Dark", value: "#1a1f2e" },
			},
		},
	},
};

export default preview;
```

**ポイント:**

- `index.css` をここでインポートすることで、すべてのストーリーに Tailwind スタイルが適用される
- `backgrounds` に `light` / `dark` を定義しているため、ダークモード確認が可能

---

## ストーリーの種類

### Component Stories

単一コンポーネントの各バリアント（状態）を示す最も基本的なストーリーです。

#### 基本構造

```typescript
// src/stories/Button.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";

// Meta: コンポーネント全体の設定
const meta = {
	title: "Example/Button", // Storybook サイドバーのパス
	component: Button,
	parameters: {
		layout: "centered", // "centered" | "fullscreen" | "padded"
	},
	tags: ["autodocs"], // 自動ドキュメント生成を有効化
	argTypes: {
		backgroundColor: { control: "color" }, // カラーピッカーを使用
	},
	args: {
		onClick: fn(), // アクションスパイ（全ストーリーで共有）
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 各ストーリー = コンポーネントの1つのバリアント
export const Primary: Story = {
	args: {
		primary: true,
		label: "Button",
	},
};

export const Secondary: Story = {
	args: {
		label: "Button",
	},
};

export const Large: Story = {
	args: {
		size: "large",
		label: "Button",
	},
};
```

#### レイアウト設定

| `layout` 値    | 用途                                 |
| -------------- | ------------------------------------ |
| `"centered"`   | ボタンなど小さいコンポーネント       |
| `"fullscreen"` | ヘッダー・ページ全体のコンポーネント |
| `"padded"`     | デフォルト。余白付きで表示           |

#### タイトル命名規則

```
"Example/Button"      → Storybook で Example > Button として表示
"Components/Pagination" → Components > Pagination として表示
```

このプロジェクトでは:

- Storybook 付属のサンプルコンポーネント: `"Example/..."`
- プロジェクト固有のコンポーネント: `"Components/..."`

---

### Page Stories

内部状態を持つ、より複雑なページレベルのコンポーネントを扱うストーリーです。

```typescript
// src/stories/Page.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./Page";

const meta = {
	title: "Example/Page",
	component: Page,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// 初期状態（ログアウト）
export const LoggedOut: Story = {};

// 別の状態（ログイン済み）をインタラクションで表現
export const LoggedIn: Story = {
	play: async ({ canvasElement }) => {
		// ← play 関数でインタラクションテストを記述
	},
};
```

**ポイント:**

- Page コンポーネントは内部状態 (`useState`) を持つため、外部からの `args` で制御できない
- `play` 関数を使って UI 操作でその状態に誘導する（後述）

---

### Interaction Testing Stories

`play` 関数を使ったインタラクションテストストーリーは、ユーザー操作のシミュレーションと UI の検証を同時に行います。

#### 基本構造

```typescript
// src/stories/Page.stories.ts
import { expect, userEvent, within } from "@storybook/test";

export const LoggedIn: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// 1. 特定の要素を取得
		const loginButton = canvas.getByRole("button", { name: /Log in/i });

		// 2. ユーザー操作をシミュレート
		await userEvent.click(loginButton);

		// 3. 結果を検証（アサーション）
		await expect(
			canvas.queryByRole("button", { name: /Log in/i }),
		).not.toBeInTheDocument();

		await expect(
			canvas.getByRole("button", { name: /Log out/i }),
		).toBeInTheDocument();
	},
};
```

#### インタラクションテストの主要 API

| 操作           | コード例                              |
| -------------- | ------------------------------------- |
| クリック       | `await userEvent.click(element)`      |
| テキスト入力   | `await userEvent.type(input, "text")` |
| キーボード操作 | `await userEvent.keyboard("{Enter}")` |
| ホバー         | `await userEvent.hover(element)`      |

#### 要素の取得（クエリ優先順位）

アクセシビリティを考慮した Testing Library のクエリ優先順位:

1. `getByRole` — 最優先。ARIA ロールで取得
2. `getByLabelText` — フォームラベルで取得
3. `getByPlaceholderText` — プレースホルダーで取得
4. `getByText` — テキスト内容で取得
5. `getByTestId` — `data-testid` 属性で取得（最終手段）

```typescript
// 良い例: ロールとアクセシブルな名前で取得
const button = canvas.getByRole("button", { name: /送信/i });

// 避けるべき例: テスト専用属性に依存
const button = canvas.getByTestId("submit-button");
```

---

### 複雑なコンポーネントの包括的ストーリー

`Pagination.stories.tsx` は、複雑なコンポーネントのストーリーの模範例です。

#### 複数の境界状態を網羅する

```typescript
// src/stories/Pagination.stories.tsx
const meta = {
	title: "Components/Pagination",
	component: Pagination,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	argTypes: {
		currentPage: { control: { type: "number", min: 1 } },
		totalPages: { control: { type: "number", min: 1 } },
		onPageChange: { action: "onPageChange" },
	},
} satisfies Meta<typeof Pagination>;

// デフォルト（操作可能な状態）
export const Default: Story = {
	args: { currentPage: 3, totalPages: 7 },
};

// 境界値: 先頭ページ（Previous ボタンが無効）
export const Page1Of5: Story = {
	args: { currentPage: 1, totalPages: 5 },
};

// 境界値: 末尾ページ（Next ボタンが無効）
export const Page5Of5: Story = {
	args: { currentPage: 5, totalPages: 5 },
};

// 省略記号 (ellipsis) なしの最大ページ数
export const SevenPages: Story = {
	args: { currentPage: 4, totalPages: 7 },
};

// 省略記号のテスト
export const TenPagesNearStart: Story = {
	args: { currentPage: 2, totalPages: 10 },
};

export const TenPagesMiddle: Story = {
	args: { currentPage: 5, totalPages: 10 },
};
```

#### インタラクティブなデモ用の Wrapper コンポーネント

コンポーネントが内部状態を持たない（純粋な props 制御）場合でも、Storybook 上でインタラクティブなデモを提供するには、`useState` を持つラッパーコンポーネントを作成します。

```tsx
// src/stories/Pagination.stories.tsx

// ラッパーコンポーネント（ストーリー専用）
const PaginationDemo = ({ totalPages = 10 }: { totalPages?: number }) => {
	const [currentPage, setCurrentPage] = useState(1);
	return (
		<Pagination
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={setCurrentPage}
		/>
	);
};

// インタラクティブなストーリー
export const Interactive: Story = {
	render: () => <PaginationDemo totalPages={10} />,
};
```

`render` 関数を使うことで、デフォルトのレンダリングを完全に置き換えられます。

---

## MDX ドキュメント

`.mdx` ファイルを使うことで、コンポーネントの説明文やデザインガイドラインを Storybook 内に記述できます。

```mdx
{/* src/stories/Configure.mdx */}
import { Meta } from "@storybook/blocks";

<Meta title="Configure your project" />

# Storybook の設定

このプロジェクトのコンポーネントライブラリへようこそ。

## コンポーネント一覧

<div
	style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
>
	<div>**Button** — 基本的なアクションボタン</div>
	<div>**Pagination** — ページネーションコンポーネント</div>
</div>
```

**MDX が有効なケース:**

- コンポーネントのデザイン仕様や使用ガイドラインを記述したい場合
- 複数コンポーネントをまとめたカタログページを作りたい場合
- トップレベルの「はじめに」ページを作りたい場合

---

## Controls と Args

Controls パネルで props をリアルタイムに変更できます。

### `argTypes` による Control の定義

```typescript
argTypes: {
  // カラーピッカー
  backgroundColor: { control: "color" },

  // 数値スライダー
  size: {
    control: { type: "range", min: 1, max: 100, step: 1 },
  },

  // セレクトボックス
  variant: {
    control: "select",
    options: ["primary", "secondary", "destructive"],
  },

  // ラジオボタン
  align: {
    control: "radio",
    options: ["left", "center", "right"],
  },

  // テキスト入力
  label: { control: "text" },

  // チェックボックス
  disabled: { control: "boolean" },

  // アクション（関数を記録）
  onClick: { action: "clicked" },
}
```

### `args` の継承

```typescript
const meta = {
	args: {
		// Meta レベルで定義した args は全ストーリーで共有される
		disabled: false,
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

export const Primary: Story = {
	args: {
		// ストーリーレベルの args は Meta を上書き・マージする
		primary: true,
		label: "Primary Button",
	},
};
```

---

## アクション (Actions)

ユーザー操作（クリック、変更など）のコールバックを Storybook の Actions パネルに記録します。

### `fn()` を使った方法（推奨）

```typescript
import { fn } from "@storybook/test";

const meta = {
	args: {
		onClick: fn(), // クリックを記録
		onLogin: fn(), // ログインアクションを記録
		onLogout: fn(), // ログアウトアクションを記録
	},
} satisfies Meta<typeof Header>;
```

### `argTypes` に `action` を指定する方法

```typescript
argTypes: {
  onPageChange: { action: "onPageChange" },
}
```

**使い分け:**

- `fn()` — `@storybook/test` の spy 関数。インタラクションテストでも検証できる（推奨）
- `{ action: "name" }` — シンプルにアクションを記録するだけでよい場合

---

## ベストプラクティス

### 1. 境界状態を網羅する

コンポーネントの重要な境界状態をすべてストーリーとして定義してください。

```typescript
// Pagination コンポーネントの例
export const FirstPage: Story = { args: { currentPage: 1, totalPages: 5 } };
export const LastPage: Story = { args: { currentPage: 5, totalPages: 5 } };
export const MiddlePage: Story = { args: { currentPage: 3, totalPages: 5 } };
export const WithEllipsis: Story = { args: { currentPage: 5, totalPages: 10 } };
```

### 2. `autodocs` タグを活用する

```typescript
const meta = {
	tags: ["autodocs"], // Props テーブルとドキュメントを自動生成
};
```

`autodocs` を有効にすると、コンポーネントの props 一覧が自動生成されます。TypeScript の型定義に JSDoc コメントを書いておくと、説明文も自動で表示されます。

```typescript
interface PaginationProps {
	/** 現在表示しているページ番号 (1 始まり) */
	currentPage: number;
	/** 総ページ数 */
	totalPages: number;
	/** ページ変更時のコールバック */
	onPageChange: (page: number) => void;
}
```

### 3. ストーリー名は状態を明確に表す

```typescript
// 良い例: 状態が一目でわかる
export const LoggedIn: Story = { ... };
export const LoggedOut: Story = { ... };
export const Page1Of5: Story = { ... };
export const TenPagesMiddle: Story = { ... };

// 避けるべき例: 意味が不明瞭
export const Story1: Story = { ... };
export const Test: Story = { ... };
```

### 4. `play` 関数には必ず `await` を付ける

```typescript
// 良い例
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: /Log in/i }));
  await expect(canvas.getByRole("button", { name: /Log out/i })).toBeInTheDocument();
},

// 悪い例: await なしだと順序が保証されない
play: ({ canvasElement }) => {
  userEvent.click(...);  // 非同期処理が完了する前に次行が実行される可能性がある
},
```

### 5. インタラクティブなデモには `render` 関数を使う

state を持つデモが必要な場合は、ストーリーファイル内にラッパーコンポーネントを定義し、`render` 関数で使用します。

```typescript
const InteractiveWrapper = () => {
  const [value, setValue] = useState(0);
  return <Counter value={value} onChange={setValue} />;
};

export const Interactive: Story = {
  render: () => <InteractiveWrapper />,
};
```

### 6. コンポーネントごとにファイルを分ける

```
src/stories/
  Button.stories.ts        # Button コンポーネントのみ
  Pagination.stories.tsx   # Pagination コンポーネントのみ
```

1 ファイルに複数コンポーネントのストーリーをまとめないでください。

### 7. `.ts` と `.tsx` の使い分け

| 拡張子         | 使用場面                                                            |
| -------------- | ------------------------------------------------------------------- |
| `.stories.ts`  | JSX を含まないストーリー（args のみで制御できる場合）               |
| `.stories.tsx` | JSX を含むストーリー（`render` 関数でカスタムレンダリングする場合） |

---

## プロジェクト固有の考慮事項

### Tailwind CSS の適用

`preview.ts` で `index.css` をインポートしているため、Tailwind CSS のクラスはすべてのストーリーで自動的に有効です。

```typescript
// .storybook/preview.ts
import "../src/index.css"; // これで Tailwind が全ストーリーに適用される
```

### `@` エイリアスの使用

プロジェクト固有のコンポーネントは `@/` エイリアスでインポートします。

```typescript
// src/stories 配下のサンプルコンポーネント
import { Button } from "./Button";

// src/components 配下のプロジェクトコンポーネント
import { Pagination } from "@/components/Pagination";
import { Card } from "@/components/ui/card";
```

### shadcn/ui コンポーネントのストーリー

`src/components/ui/` に配置された shadcn/ui の Primitive コンポーネントを組み合わせた高レベルコンポーネントは、高レベルコンポーネント側のストーリーを書いてください。

```typescript
// Pagination コンポーネントは ui/pagination の Primitives を使っている
// → src/stories/Pagination.stories.tsx でストーリーを作成済み
// → ui/pagination.tsx の各 Primitive 単体のストーリーは不要
```

### ダークモード対応の確認

`preview.ts` に dark バックグラウンドを定義しているので、ストーリーのツールバーから背景色を切り替えて確認できます。

Tailwind のダークモードクラス (`dark:bg-...` など) が意図通り動作するかを各ストーリーで確認してください。

### 日本語コンテンツのアクセシビリティ

Pagination コンポーネントでは、日本語の ARIA ラベルを使用しています。

```typescript
// src/components/Pagination.tsx
<PaginationPrevious
  aria-label="前のページへ"
  onClick={() => onPageChange(currentPage - 1)}
/>
```

ストーリーのインタラクションテストでも日本語ラベルを使用します。

```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const prevButton = canvas.getByRole("link", { name: /前のページへ/i });
  await expect(prevButton).toHaveAttribute("aria-disabled", "true");
},
```

### Storybook と Jest の共存

このプロジェクトでは Storybook のインタラクションテストと Jest の単体テストを併用しています。

| テストの種類    | ファイル          | 目的                            |
| --------------- | ----------------- | ------------------------------- |
| Jest 単体テスト | `*.test.ts(x)`    | コンポーネントのロジック検証    |
| Storybook play  | `*.stories.ts(x)` | UI の状態・インタラクション検証 |

- **Jest**: コンポーネントのロジック、ユーティリティ関数のテストに使用
- **Storybook play**: 実際のブラウザ環境での UI の振る舞いを確認するのに使用

---

## 参考リソース

- [Storybook 公式ドキュメント](https://storybook.js.org/docs)
- [Storybook Testing Library](https://storybook.js.org/docs/writing-tests/component-testing)
- [shadcn/ui コンポーネント一覧](https://ui.shadcn.com/docs/components)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
