import { ChangeEvent, useState } from 'react';
import useBookContext from '../hooks/use-books-context';

function BookCreate() {
	const [title, setTitle] = useState('');
	const { createBook, raiseCreateError, setRaiseCreateError } = useBookContext();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};
	
	// It removes the error message after 5 seconds
	const removeErrorMsg = async () => {
		setTimeout(setRaiseCreateError, 5000, false);
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (title.trim().length >= 3) {
			createBook(title);
			setRaiseCreateError(false);
			setTitle('');
		} else {
			setRaiseCreateError(true);
			removeErrorMsg();
		}
	};

	return (
		<div className='book-create'>
			<h3>Add a Book</h3>
			<form onSubmit={handleSubmit}>
				<label>Title</label>
				<input value={title} type='text' onChange={handleChange} className='input' />
				{raiseCreateError && (
					<label className='error-message'>
						The title must have more than 2 characters and must not be spaces.
					</label>
				)}
				<button className='button'>Create!</button>
			</form>
		</div>
	);
}

export default BookCreate;
