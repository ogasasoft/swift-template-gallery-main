import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TagEditorModal from "@/components/TagEditorModal";
import type { Template } from "@/lib/types";

// Mock alert
const mockAlert = jest.fn();
global.alert = mockAlert;

const mockTemplate: Template = {
  id: "1",
  title: "Test Template",
  tags: ["tag1", "tag2", "tag3"],
  industry: "Technology",
  tone: "Professional",
  style: "Modern",
  thumb: "/thumb.jpg",
  preview_path: "/preview.html",
  rating: 4.5,
  reviewCount: 12,
};

describe("TagEditorModal Component", () => {
  beforeEach(() => {
    mockAlert.mockClear();
  });

  describe("Rendering", () => {
    it("should render the modal with template title", () => {
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={jest.fn()}
        />,
      );
      expect(screen.getByText("タグの編集")).toBeInTheDocument();
      expect(screen.getByText(/Template/)).toBeInTheDocument();
    });

    it("should not render when isOpen is false", () => {
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={false}
          onClose={() => {}}
          onTagsUpdated={jest.fn()}
        />,
      );
      expect(screen.queryByText("タグの編集")).not.toBeInTheDocument();
    });

    it("should display the existing tags", () => {
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={jest.fn()}
        />,
      );
      expect(screen.getByText(/tag1/)).toBeInTheDocument();
      expect(screen.getByText(/tag2/)).toBeInTheDocument();
      expect(screen.getByText(/tag3/)).toBeInTheDocument();
    });

    it("should show tag count", () => {
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={jest.fn()}
        />,
      );
      const countText = screen.getByText(/3\/10/);
      expect(countText).toBeInTheDocument();
    });
  });

  describe("Tag Addition", () => {
    it("should add a new tag when Enter key is pressed", () => {
      const onTagsUpdated = jest.fn();
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={onTagsUpdated}
        />,
      );

      const input =
        screen.getByPlaceholderText("新しいタグを入力（Enterで追加）");
      fireEvent.change(input, { target: { value: "newTag" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(screen.getByText("newTag")).toBeInTheDocument();
      expect(onTagsUpdated).not.toHaveBeenCalled(); // Should wait for save
    });

    it("should add a new tag when button is clicked", () => {
      const onTagsUpdated = jest.fn();
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={onTagsUpdated}
        />,
      );

      const input =
        screen.getByPlaceholderText("新しいタグを入力（Enterで追加）");
      fireEvent.change(input, { target: { value: "newTag" } });
      const addButton = screen.getByRole("button", { name: "" });
      fireEvent.click(addButton);

      expect(screen.getByText("newTag")).toBeInTheDocument();
      expect(onTagsUpdated).not.toHaveBeenCalled(); // Should wait for save
    });

    it("should not add empty tag", () => {
      const onTagsUpdated = jest.fn();
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={onTagsUpdated}
        />,
      );

      const input =
        screen.getByPlaceholderText("新しいタグを入力（Enterで追加）");
      fireEvent.change(input, { target: { value: "   " } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(screen.queryByText("   ")).not.toBeInTheDocument();
      expect(onTagsUpdated).not.toHaveBeenCalled();
    });

    it("should not add duplicate tag", () => {
      const onTagsUpdated = jest.fn();
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={onTagsUpdated}
        />,
      );

      const input =
        screen.getByPlaceholderText("新しいタグを入力（Enterで追加）");
      fireEvent.change(input, { target: { value: "tag1" } });
      fireEvent.keyDown(input, { key: "Enter" });

      // Alert should have been called
      expect(mockAlert).toHaveBeenCalledWith("そのタグは既に存在します。");

      // Tags should remain unchanged
      expect(screen.getByText(/tag1/)).toBeInTheDocument();
      expect(screen.getByText(/tag2/)).toBeInTheDocument();
      expect(screen.getByText(/tag3/)).toBeInTheDocument();
    });

    it("should not add more than MAX_TAGS", () => {
      const onTagsUpdated = jest.fn();
      const manyTagsTemplate: Template = {
        ...mockTemplate,
        tags: Array.from({ length: 10 }, (_, i) => `tag${i + 1}`),
      };

      render(
        <TagEditorModal
          template={manyTagsTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={onTagsUpdated}
        />,
      );

      const input =
        screen.getByPlaceholderText("新しいタグを入力（Enterで追加）");
      fireEvent.change(input, { target: { value: "tag11" } });
      fireEvent.keyDown(input, { key: "Enter" });

      // Alert should have been called
      expect(mockAlert).toHaveBeenCalledWith("タグは最大10個までです。");

      // Tag should not be added
      expect(screen.queryByText("tag11")).not.toBeInTheDocument();
      expect(onTagsUpdated).not.toHaveBeenCalled();
    });
  });

  describe("Tag Removal", () => {
    it("should remove a tag when delete button is clicked", async () => {
      const onTagsUpdated = jest.fn();
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={onTagsUpdated}
        />,
      );

      const deleteButton = screen.getAllByRole("button", {
        name: "タグを削除",
      })[0];
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.queryByText(/tag1/)).not.toBeInTheDocument();
        expect(screen.getByText(/tag2/)).toBeInTheDocument();
        expect(screen.getByText(/tag3/)).toBeInTheDocument();
      });

      expect(onTagsUpdated).not.toHaveBeenCalled(); // Should wait for save
    });
  });

  describe("Saving Tags", () => {
    it("should call onTagsUpdated when save button is clicked", async () => {
      const onTagsUpdated = jest.fn().mockResolvedValue(undefined);

      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={onTagsUpdated}
        />,
      );

      // Add a new tag
      const input =
        screen.getByPlaceholderText("新しいタグを入力（Enterで追加）");
      fireEvent.change(input, { target: { value: "newTag" } });
      fireEvent.keyDown(input, { key: "Enter" });

      // Remove a tag
      const deleteButton = screen.getAllByRole("button", {
        name: "タグを削除",
      })[0];
      fireEvent.click(deleteButton);

      // Click save
      const saveButton = screen.getByRole("button", { name: "保存" });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(onTagsUpdated).toHaveBeenCalledWith(["tag2", "tag3", "newTag"]);
      });
    });

    it("should close modal when cancel button is clicked", () => {
      const onClose = jest.fn();
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={onClose}
          onTagsUpdated={jest.fn()}
        />,
      );

      const cancelButton = screen.getByRole("button", { name: "キャンセル" });
      fireEvent.click(cancelButton);

      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("Tag Limit Display", () => {
    it("should show correct tag count", () => {
      const { container } = render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={jest.fn()}
        />,
      );

      // Find the label that contains the count (Dialog renders in portal, use screen)
      void container;
      const countLabel = screen.getByText(/3\/10/);
      expect(countLabel).toBeInTheDocument();
    });

    it("should update count when tags are added", () => {
      const onTagsUpdated = jest.fn();
      const { rerender } = render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={onTagsUpdated}
        />,
      );

      // Add a tag
      const input =
        screen.getByPlaceholderText("新しいタグを入力（Enterで追加）");
      fireEvent.change(input, { target: { value: "newTag" } });
      fireEvent.keyDown(input, { key: "Enter" });

      // Re-render and check for count
      rerender(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={onTagsUpdated}
        />,
      );

      // The count might be in the label, so we look for it in the text content
      const countLabel = screen.getByText(/4\/10/);
      expect(countLabel).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should show empty state message when no tags exist", () => {
      const emptyTemplate: Template = {
        ...mockTemplate,
        tags: [],
      };

      render(
        <TagEditorModal
          template={emptyTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={jest.fn()}
        />,
      );

      expect(
        screen.getByText(
          "タグがありません。上のフォームから追加してください。",
        ),
      ).toBeInTheDocument();
    });

    it("should not show empty state when tags exist", () => {
      render(
        <TagEditorModal
          template={mockTemplate}
          isOpen={true}
          onClose={() => {}}
          onTagsUpdated={jest.fn()}
        />,
      );

      expect(
        screen.queryByText(
          "タグがありません。上のフォームから追加してください。",
        ),
      ).not.toBeInTheDocument();
    });
  });
});
