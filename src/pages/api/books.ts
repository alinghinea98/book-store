import type { APIRoute } from "astro";
import { getBooks } from '../../services/BooksService';

export const GET: APIRoute = async () => {
	const books = getBooks();
	
	return new Response(JSON.stringify(books), {
		headers: { "Content-Type": "application/json" }
	});
};
