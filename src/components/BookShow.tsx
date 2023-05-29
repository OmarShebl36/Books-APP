import { useState } from 'react';
import { Book } from '../Book.types';
import BookEdit from './BookEdit';
import useBookContext from '../hooks/use-books-context';

function BookShow({ id, title }: Book) {
	const [showEdit, setShowEdit] = useState(false);
	const { deleteBookById } = useBookContext();

	const handleDeleteClick = () => {
		deleteBookById(id);
	};

	const handleEditClick = () => {
		setShowEdit(!showEdit);
	};

	const content = showEdit ? (
		<BookEdit oldTitle={title} id={id} onSubmit={handleEditClick} />
	) : (
		<h3>{title}</h3>
	);

	return (
		<div className='book-show'>
			<img src={`https://picsum.photos/seed/${id}/300/200`} alt={title} />
			{content}
			<div className='actions'>
				<button className='edit' onClick={handleEditClick}>
					Edit
				</button>
				<button className='delete' onClick={handleDeleteClick}>
					Delete
				</button>
			</div>
		</div>
	);
}

export default BookShow;
