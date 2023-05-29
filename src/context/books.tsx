import axios from 'axios';
import { createContext, useCallback, useState } from 'react';
import Book from '../Book.types';

interface ValuesType {
	books: Book[];
	createBook: (title: string) => void;
	updateBookById: (id: string, title: string) => void;
	deleteBookById: (id: string) => void;
	getBooks: () => void;
	setRaiseEditError: (state: boolean) => void;
	setRaiseCreateError: (state: boolean) => void;
	raiseCreateError: boolean;
	raiseEditError: boolean;
}

type ProviderProps = {
	children: React.ReactNode;
};

const BooksContext = createContext({} as ValuesType);

function Provider({ children }: ProviderProps) {
	const [books, setBooks] = useState<Book[]>([]);
	const [raiseCreateError, setRaiseCreateError] = useState<boolean>(false);
	const [raiseEditError, setRaiseEditError] = useState<boolean>(false);

	const createBook = async (title: string) => {
		const response = await axios.post('http://localhost:3001/books', {
			title,
		});
		const updatedBooks: Book[] = [...books, response.data];

		setBooks(updatedBooks);
	};

	const getBooks = useCallback(async () => {
		const response = await axios.get('http://localhost:3001/books');

		setBooks(response.data);
	}, []);

	const deleteBookById = async (id: string) => {
		await axios.delete('http://localhost:3001/books/' + id);

		const updatedBooks: Book[] = books.filter((book) => book.id !== id);

		setBooks(updatedBooks);
	};

	const updateBookById = async (id: string, newTitle: string) => {
		if (newTitle.length >= 3) {
			const response = await axios.put('http://localhost:3001/books/' + id, {
				title: newTitle,
			});

			const updatedBooks: Book[] = books.map((book) => {
				if (id === book.id) return { ...response.data };

				return book;
			});

			setBooks(updatedBooks);
		}
	};

	const valueToShare = {
		books,
		createBook,
		updateBookById,
		deleteBookById,
		getBooks,
		setRaiseEditError,
		setRaiseCreateError,
		raiseCreateError,
		raiseEditError,
	};

	return <BooksContext.Provider value={valueToShare}>{children}</BooksContext.Provider>;
}

export { Provider };
export default BooksContext;
