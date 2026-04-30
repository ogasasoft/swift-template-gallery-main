declare global {
	var scrollTo: (options: {
		behavior: "smooth" | "auto";
		block: "start" | "end" | "center";
	}) => void;
	var scrollIntoView: (
		options:
			| { behavior: "smooth" | "auto"; block: "start" | "end" | "center" }
			| string,
	) => void;
}

export {};
