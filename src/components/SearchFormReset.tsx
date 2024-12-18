"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const SearchFormReset = () => {
	const reset = () => {
		const form = document.querySelector(".search-form") as HTMLFormElement;

		if (form) {
			form.reset();
		}
	};

	return (
		<button type="reset" onClick={reset} aria-label="Reset Button">
			<Link href="/" className="search-btn text-white">
				<X className="size-6" />
			</Link>
		</button>
	);
};

export default SearchFormReset;