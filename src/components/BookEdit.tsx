import React, { ChangeEvent, useState } from 'react';
import useBookContext from '../hooks/use-books-context';

interface Props {
	id: string;
	oldTitle: string;
	onSubmit: () => void;
}

function BookEdit({ oldTitle, id, onSubmit }: Props) {
	const [title, setTitle] = useState(oldTitle);
	const { updateBookById, raiseEditError, setRaiseEditError } = useBookContext();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	// It removes the error message after 5 seconds
	const removeErrorMsg = async () => {
		setTimeout(setRaiseEditError, 5000, false);
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (title.trim().length >= 3) {
			onSubmit();
			setRaiseEditError(false);
			updateBookById(id, title);
			setTitle('');
		} else {
			setRaiseEditError(true);
			removeErrorMsg();
		}
	};

	return (
		<form className='book-edit' onSubmit={handleSubmit}>
			<label>Title</label>
			<input value={title} className='input' onChange={handleChange} />
			{raiseEditError && (
				<label className='error-message'>
					The title must have more than 2 characters and must not be spaces.
				</label>
			)}
			<button className='button is-primary'>Save</button>
		</form>
	);
}

export default BookEdit;
