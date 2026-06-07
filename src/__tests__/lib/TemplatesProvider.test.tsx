import { render, screen, renderHook } from "@testing-library/react";
import { TemplatesProvider, useTemplates } from "@/lib/TemplatesProvider";

// Mock templates.json to return our mock data
jest.mock("@/lib/templates.json", () => [
  {
    id: "test-001",
    title: "Test Template 1",
    tags: ["Test", "Sample"],
    industry: "Test Industry",
    tone: "Test Tone",
    style: "Test Style",
    thumb: "https://example.com/thumb1.jpg",
    preview_path: "/templates/test-001/index.html",
  },
  {
    id: "test-002",
    title: "Test Template 2",
    tags: ["Test2"],
    industry: "Test Industry 2",
    tone: "Test Tone 2",
    style: "Test Style 2",
    thumb: "https://example.com/thumb2.jpg",
    preview_path: "/templates/test-002/index.html",
  },
]);

describe("TemplatesProvider", () => {
  it("provides templates context with correct structure", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TemplatesProvider>{children}</TemplatesProvider>
    );

    const { result } = renderHook(() => useTemplates(), { wrapper });

    // Check that templates array is initialized
    expect(result.current.templates).toHaveLength(2);
    expect(result.current.templates[0].id).toBe("test-001");
    expect(result.current.templates[1].id).toBe("test-002");

    // Check that getTemplateById function is provided
    expect(typeof result.current.getTemplateById).toBe("function");

    // Check that downloadTemplate function is provided
    expect(typeof result.current.downloadTemplate).toBe("function");
  });

  it("provides getTemplateById function that returns correct template", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TemplatesProvider>{children}</TemplatesProvider>
    );

    const { result } = renderHook(() => useTemplates(), { wrapper });

    const template = result.current.getTemplateById("test-001");
    expect(template).toBeDefined();
    expect(template?.id).toBe("test-001");
    expect(template?.title).toBe("Test Template 1");
  });

  it("provides getTemplateById function that returns undefined for non-existent ID", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TemplatesProvider>{children}</TemplatesProvider>
    );

    const { result } = renderHook(() => useTemplates(), { wrapper });

    const template = result.current.getTemplateById("non-existent");
    expect(template).toBeUndefined();
  });

  it("calls downloadTemplate with correct template", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TemplatesProvider>{children}</TemplatesProvider>
    );

    const { result } = renderHook(() => useTemplates(), { wrapper });

    // Spy on document methods
    const createElementSpy = jest.spyOn(document, "createElement");
    const appendChildSpy = jest.spyOn(document.body, "appendChild");
    const removeChildSpy = jest.spyOn(document.body, "removeChild");

    // Mock a proper anchor element
    const mockLink = document.createElement("a");
    mockLink.click = jest.fn();
    mockLink.setAttribute = jest.fn();

    createElementSpy.mockReturnValue(mockLink);

    const testTemplate = [
      {
        id: "test-001",
        title: "Test Template 1",
        tags: ["Test", "Sample"],
        industry: "Test Industry",
        tone: "Test Tone",
        style: "Test Style",
        thumb: "https://example.com/thumb1.jpg",
        preview_path: "/templates/test-001/index.html",
      },
    ][0];

    result.current.downloadTemplate(testTemplate);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      "download",
      `${testTemplate.id}.html`,
    );
    expect(mockLink.setAttribute).toHaveBeenCalledWith("target", "_blank");
    expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
    expect(mockLink.click).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalledWith(mockLink);
  });
});
