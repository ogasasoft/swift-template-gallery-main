import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import Pagination from "@/components/Pagination";

/**
 * `Pagination` コンポーネントは、ページ一覧のナビゲーションを提供します。
 *
 * - 総ページ数が7以下の場合、全ページ番号を表示
 * - 総ページ数が8以上の場合、省略記号（…）を使ったスマートな表示
 * - 先頭・末尾ページへのナビゲーションを常に表示
 * - 前後のページへの矢印ボタン付き
 */
const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ページネーションコンポーネント。7ページ以下では全ページ表示、8ページ以上では省略記号による動的表示を行います。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "現在のページ番号",
    },
    totalPages: {
      control: { type: "number", min: 2 },
      description: "総ページ数",
    },
    onPageChange: {
      action: "onPageChange",
      description: "ページ変更時のコールバック関数",
    },
  },
  args: {
    onPageChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// --- 基本ストーリー（インタラクティブ）---

/**
 * インタラクティブな操作が可能なデフォルトストーリー。
 * Controls パネルから `currentPage` と `totalPages` を変更できます。
 */
export const Default: Story = {
  args: {
    currentPage: 3,
    totalPages: 7,
  },
};

// --- ページ数バリエーション ---

/**
 * 1ページ目 / 全5ページ
 * 先頭ページでは「前へ」ボタンが無効化されます。
 */
export const Page1Of5: Story = {
  name: "1/5ページ（先頭）",
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "先頭ページ。「前へ」ボタンが無効化（半透明）で表示されます。",
      },
    },
  },
};

/**
 * 3ページ目 / 全5ページ
 */
export const Page3Of5: Story = {
  name: "3/5ページ（中間）",
  args: {
    currentPage: 3,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "中間ページ。現在ページがハイライト表示されます。",
      },
    },
  },
};

/**
 * 5ページ目 / 全5ページ
 * 最終ページでは「次へ」ボタンが無効化されます。
 */
export const Page5Of5: Story = {
  name: "5/5ページ（末尾）",
  args: {
    currentPage: 5,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "末尾ページ。「次へ」ボタンが無効化（半透明）で表示されます。",
      },
    },
  },
};

/**
 * 全7ページ（省略記号なしの最大表示）
 * 7ページ以下では全ページ番号が表示されます。
 */
export const SevenPages: Story = {
  name: "全7ページ（省略なし上限）",
  args: {
    currentPage: 4,
    totalPages: 7,
  },
  parameters: {
    docs: {
      description: {
        story: "7ページ以下の場合、全ページ番号を省略なしで表示します。",
      },
    },
  },
};

/**
 * 全10ページ / 先頭付近
 * 8ページ以上では省略記号が表示されます。
 */
export const TenPagesNearStart: Story = {
  name: "10ページ / 先頭付近（2ページ目）",
  args: {
    currentPage: 2,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          "8ページ以上で省略記号が有効。先頭付近では右側にのみ「…」が表示されます。",
      },
    },
  },
};

/**
 * 全10ページ / 中間
 */
export const TenPagesMiddle: Story = {
  name: "10ページ / 中間（5ページ目）",
  args: {
    currentPage: 5,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "中間ページでは両側に「…」が表示されます。",
      },
    },
  },
};

/**
 * 全10ページ / 末尾付近
 */
export const TenPagesNearEnd: Story = {
  name: "10ページ / 末尾付近（9ページ目）",
  args: {
    currentPage: 9,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "末尾付近では左側にのみ「…」が表示されます。",
      },
    },
  },
};

/**
 * 全15ページ / 中間
 * 多ページの場合でも常に先頭・末尾は表示されます。
 */
export const FifteenPagesMiddle: Story = {
  name: "15ページ / 中間（8ページ目）",
  args: {
    currentPage: 8,
    totalPages: 15,
  },
  parameters: {
    docs: {
      description: {
        story:
          "15ページの中間。両側に「…」が表示され、現在ページ ±2 の範囲が表示されます。",
      },
    },
  },
};

// --- インタラクティブストーリー（内部 state 管理）---

/**
 * 実際のページ遷移をシミュレートするインタラクティブなデモ。
 * ページをクリックすると表示が更新されます。
 */
export const Interactive: Story = {
  name: "インタラクティブデモ（10ページ）",
  parameters: {
    docs: {
      description: {
        story:
          "ページをクリックして実際の遷移をシミュレートします。内部 state でページ番号を管理しています。",
      },
    },
  },
  render: () => <PaginationDemo />,
};

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        現在のページ: <strong>{page}</strong> / 10
      </p>
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
}
