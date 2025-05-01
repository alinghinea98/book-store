export type Book = {
	id: number;
	title: string;
	author: string;
	image: string;
	price: number;
};

export const getBooks = (): Book[] => [
	{
		id: 1,
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
		image: "/assets/book1.jpg",
		price: 10.99
	},
	{
		id: 2,
		title: "To Kill a Mockingbird",
		author: "Harper Lee",
		image: "/assets/book2.jpg",
		price: 12.99
	},
	{
		id: 3,
		title: "1984",
		author: "George Orwell",
		image: "/assets/book3.jpg",
		price: 15.99
	},
	{
		id: 4,
		title: "Pride and Prejudice",
		author: "Jane Austen",
		image: "/assets/book4.jpg",
		price: 8.99
	},
	{
		id: 5,
		title: "The 48 Laws of Power",
		author: "Robert Greene",
		image: "/assets/book5.jpg",
		price: 20.99
	}
];
