import { render } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer Component", () => {
	it("renders copyright notice", () => {
		render(<Footer />);

		expect(screen.getByText(/© 2024 TemplateLab/)).toBeInTheDocument();
		expect(
			screen.getByText(/All templates are commercial-use ready/),
		).toBeInTheDocument();
	});

	it("renders Terms of Service link", () => {
		render(<Footer />);

		const tosLink = screen.getByText("Terms of Service");
		expect(tosLink).toBeInTheDocument();
		expect(tosLink).toHaveClass("text-muted-foreground");
		expect(tosLink).toHaveClass("hover:text-foreground");
	});

	it("renders Privacy Policy link", () => {
		render(<Footer />);

		const privacyLink = screen.getByText("Privacy Policy");
		expect(privacyLink).toBeInTheDocument();
		expect(privacyLink).toHaveClass("text-muted-foreground");
		expect(privacyLink).toHaveClass("hover:text-foreground");
	});

	it("has correct styling", () => {
		render(<Footer />);

		const footer = screen.getByRole("contentinfo");
		expect(footer).toHaveClass("bg-card");
		expect(footer).toHaveClass("border-t");
		expect(footer).toHaveClass("border-border");
		expect(footer).toHaveClass("py-12");
	});

	it("has responsive container", () => {
		render(<Footer />);

		const container = footerElement().firstElementChild;
		expect(container).toHaveClass("container");
		expect(container).toHaveClass("mx-auto");
		expect(container).toHaveClass("px-4");
	});

	it("has centered content", () => {
		render(<Footer />);

		const content = footerElement().querySelector("div");
		expect(content).toHaveClass("text-center");
	});

	it("links are anchor tags with correct styling", () => {
		render(<Footer />);

		const links = screen.getAllByRole("link");
		expect(links.length).toBe(2);
		expect(links[0]).toHaveTextContent("Terms of Service");
		expect(links[1]).toHaveTextContent("Privacy Policy");
	});
});

function footerElement() {
	return screen.getByRole("contentinfo");
}
