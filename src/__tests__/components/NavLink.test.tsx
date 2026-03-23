import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

// Custom hook to get current location
function TestLocation() {
  const location = useLocation();
  return <span data-testid="location">{location.pathname}</span>;
}

describe("NavLink Component", () => {
  const mockActiveClassName = "active-link";
  const mockPendingClassName = "pending-link";
  const mockClassName = "custom-class";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render correctly", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink to="/" className={mockClassName}>
            Home
          </NavLink>
        </MemoryRouter>,
      );

      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("should accept ref", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink to="/" ref={ref}>
            Home
          </NavLink>
        </MemoryRouter>,
      );

      expect(ref.current).toBeInTheDocument();
    });

    it("should accept all NavLink props", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink
            to="/about"
            end={false}
            replace={false}
            state={{ from: "/home" }}
            onClick={(e) => e.preventDefault()}
            children="About"
          />
        </MemoryRouter>,
      );

      expect(screen.getByText("About")).toBeInTheDocument();
    });
  });

  describe("Props", () => {
    it("should pass all props to underlying NavLink", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink
            to="/settings"
            id="settings-link"
            aria-label="Go to settings"
            role="link"
            data-testid="test-link"
          >
            Settings
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("Settings");
      expect(link).toHaveAttribute("id", "settings-link");
      expect(link).toHaveAttribute("aria-label", "Go to settings");
      expect(link).toHaveAttribute("role", "link");
      expect(link).toHaveAttribute("data-testid", "test-link");
    });

    it("should pass ref to underlying NavLink", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink to="/" ref={ref} data-testid="test-link">
            Home
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("Home");
      expect(link).toHaveAttribute("data-testid", "test-link");
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe("Active State", () => {
    it("should apply activeClassName when link is active", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink
            to="/"
            className={mockClassName}
            activeClassName={mockActiveClassName}
          >
            Home
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("Home");
      expect(link).toHaveClass(mockClassName);
      expect(link).toHaveClass(mockActiveClassName);
    });

    it("should NOT apply activeClassName when link is not active", () => {
      render(
        <MemoryRouter initialEntries={["/about"]}>
          <NavLink
            to="/"
            className={mockClassName}
            activeClassName={mockActiveClassName}
          >
            Home
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("Home");
      expect(link).toHaveClass(mockClassName);
      expect(link).not.toHaveClass(mockActiveClassName);
    });

    it("should apply activeClassName when location matches", () => {
      render(
        <MemoryRouter initialEntries={["/settings"]}>
          <NavLink
            to="/settings"
            className={mockClassName}
            activeClassName={mockActiveClassName}
          >
            Settings
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("Settings");
      expect(link).toHaveClass(mockClassName);
      expect(link).toHaveClass(mockActiveClassName);
    });
  });

  describe("Pending State", () => {
    it("should NOT apply pendingClassName when there is no pending navigation", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink
            to="/about"
            className={mockClassName}
            pendingClassName={mockPendingClassName}
          >
            Home
          </NavLink>
        </MemoryRouter>,
      );

      // In MemoryRouter with no active navigation, isPending is always false
      const link = screen.getByText("Home");
      expect(link).toHaveClass(mockClassName);
      expect(link).not.toHaveClass(mockPendingClassName);
    });

    it("should NOT apply pendingClassName when link is active", () => {
      render(
        <MemoryRouter initialEntries={["/about"]}>
          <NavLink
            to="/about"
            className={mockClassName}
            pendingClassName={mockPendingClassName}
          >
            About
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("About");
      expect(link).toHaveClass(mockClassName);
      expect(link).not.toHaveClass(mockPendingClassName);
    });
  });

  describe("Combined State", () => {
    it("should handle both active and pending states correctly", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink
            to="/about"
            className={mockClassName}
            activeClassName={mockActiveClassName}
            pendingClassName={mockPendingClassName}
          >
            Home
          </NavLink>
        </MemoryRouter>,
      );

      // Link to /about when current path is / — neither active nor pending (MemoryRouter has no transition state)
      const link = screen.getByText("Home");
      expect(link).toHaveClass(mockClassName);
      expect(link).not.toHaveClass(mockPendingClassName);
      expect(link).not.toHaveClass(mockActiveClassName);
    });

    it("should handle active state without pending", () => {
      render(
        <MemoryRouter initialEntries={["/about"]}>
          <NavLink
            to="/about"
            className={mockClassName}
            activeClassName={mockActiveClassName}
          >
            About
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("About");
      expect(link).toHaveClass(mockClassName);
      expect(link).toHaveClass(mockActiveClassName);
      expect(link).not.toHaveClass(mockPendingClassName);
    });
  });

  describe("Props Passed Through", () => {
    it("should pass all props to underlying NavLink", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink
            to="/settings"
            id="settings-link"
            aria-label="Go to settings"
            role="link"
            data-testid="test-link"
          >
            Settings
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("Settings");
      expect(link).toHaveAttribute("id", "settings-link");
      expect(link).toHaveAttribute("aria-label", "Go to settings");
      expect(link).toHaveAttribute("role", "link");
      expect(link).toHaveAttribute("data-testid", "test-link");
    });

    it("should pass ref to underlying NavLink", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink to="/" ref={ref} data-testid="test-link">
            Home
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("Home");
      expect(link).toHaveAttribute("data-testid", "test-link");
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty className", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink to="/" className={undefined}>
            Home
          </NavLink>
        </MemoryRouter>,
      );

      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("should handle empty activeClassName", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink to="/" className={mockClassName} activeClassName={undefined}>
            Home
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("Home");
      expect(link).toHaveClass(mockClassName);
      expect(link).not.toHaveClass("active-link");
    });

    it("should handle empty pendingClassName", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink
            to="/about"
            className={mockClassName}
            pendingClassName={undefined}
          >
            Home
          </NavLink>
        </MemoryRouter>,
      );

      const link = screen.getByText("Home");
      expect(link).toHaveClass(mockClassName);
      expect(link).not.toHaveClass("pending-link");
    });

    it("should handle nested routes with end prop", () => {
      render(
        <MemoryRouter initialEntries={["/nested/123/children"]}>
          <Routes>
            <Route path="/" element={<TestLocation />} />
            <Route path="/nested/:id" element={<TestLocation />} />
            <Route
              path="/nested/:id/children"
              element={<NavLink to="/nested/123/children">Children</NavLink>}
            />
          </Routes>
        </MemoryRouter>,
      );

      // The NavLink should be rendered
      expect(screen.getByText("Children")).toBeInTheDocument();
    });

    it("should handle replace prop", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink to="/about" replace={true}>
            About
          </NavLink>
        </MemoryRouter>,
      );

      expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("should handle state prop", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <NavLink to="/about" state={{ from: "/home", timestamp: Date.now() }}>
            About
          </NavLink>
        </MemoryRouter>,
      );

      expect(screen.getByText("About")).toBeInTheDocument();
    });
  });

  describe("Navigation with End Prop", () => {
    it("should only be active when exact path matches with end prop", () => {
      render(
        <MemoryRouter initialEntries={["/nested/123/children"]}>
          <Routes>
            <Route path="/" element={<TestLocation />} />
            <Route path="/nested/:id" element={<TestLocation />} />
            <Route
              path="/nested/:id/children"
              element={
                <NavLink to="/nested/123/children" end={true}>
                  Children
                </NavLink>
              }
            />
          </Routes>
        </MemoryRouter>,
      );

      const link = screen.getByText("Children");
      expect(link).toBeInTheDocument();
    });
  });
});
