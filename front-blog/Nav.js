function Nav({ onDelete, onSave, selectedPost }) {
	const [isEditing, setIsEditing] = React.useState(false);
    	const [inputValue, setInputValue] = React.useState('');

    	const NavStyle = {
        	width: '100%',
        	height: '10%',
        	display: 'flex'
    	};

    	const ButtonStyle = {
       		backgroundColor: '#352c7d',
        	color: 'white',
        	width: '50px',
        	height: '30px',
        	borderRadius: '35px',
        	marginLeft: '20px',
        	cursor: 'pointer',
    	};

    	const inputStyle = {
        	height: '30px',
        	marginRight: '10px',
        	padding: '0 10px',
        	borderRadius: '5px',
        	border: '1px solid #352c7d',
    	};

    	const handleEditClick = () => {
        	setIsEditing(true);
    	};

    	const handleSaveClick = () => {
        	onSave();
        	setIsEditing(false);
    	};

    	const handleDeleteClick = async () => {
        	if (!selectedPost) {
            		console.error('No hay post seleccionado para borrar');
            		return;
        	}

		const response = await fetch(`http://localhost:3000/posts/${selectedPost.id}`, {    
			method: 'DELETE'
        	});

        	if (response.ok) {
            		onDelete();
        	} else {
            		console.error('Error al borrar el post');
        	}
    	};

    	const handleInputChange = (event) => {
        	setInputValue(event.target.value);
    	};

    	return (
        	<div style={NavStyle}>
            	<button style={ButtonStyle} onClick={handleDeleteClick}>Delete</button>
            	<button style={ButtonStyle} onClick={handleSaveClick}>Save</button>
            	<button style={ButtonStyle} onClick={handleEditClick}>Edit</button>
           	 {isEditing && (
                	<input
                    	type="text"
                    	style={inputStyle}
                    	value={inputValue}
                    	onChange={handleInputChange}
                    	placeholder="Enter data..."
                	/>
            	)}
        	</div>
    	);
}
