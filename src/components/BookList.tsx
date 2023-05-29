import useBookContext from '../hooks/use-books-context';
import BookShow from './BookShow';

function BookList() {
	const { books } = useBookContext();
	const renderedBooks = books.map((book) => {
		return <BookShow key={book.id} id={book.id} title={book.title} />;
	});

	return <div className='book-list'>{renderedBooks}</div>;
}

export default BookList;
