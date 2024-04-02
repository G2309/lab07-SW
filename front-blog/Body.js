function Body({post, isNewPostMode, onSavePost}) {

	const [newPost, setNewPost] = React.useState({
		title: '',
		demon: '',
		content: '',
		level: 0
	});

	 const handleTitleChange = (event) => {
		setNewPost({ ...newPost, title: event.target.value });
   	 };

  	  const handleDemonChange = (event) => {
  		setNewPost({ ...newPost, demon: event.target.value });
  	  };

   	 const handleContentChange = (event) => {
       		 setNewPost({ ...newPost, content: event.target.value });
   	 };

   	 const handleLevelChange = (event) => {
     		setNewPost({ ...newPost, level: parseInt(event.target.value) });
    	};

    	const handleSaveClick = async () => {
        	const response = await fetch('http://localhost:3000/posts', {
            		method: 'POST',
           		headers: {
                		'Content-Type': 'application/json'
            		},
            	body: JSON.stringify(newPost)
        	});

        	if (response.ok) {
           		onSavePost();
        	} else {
            		console.error('Error al guardar el nuevo post');
        	}
    	};

	const contentStyle = {
		marginTop: '10px',	
		height: '75%',
		width: '100%',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		color: 'white',
	};

	const inputContainer = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	};

	const inputStyle = {
		fontSize: '16px',
		marginRight: '20px',
		border: '1px solid white',
		backgroundColor: '#2135ae',
		borderRadius: '5px',
		color: 'white',
		marginTop: '7%',
		marginBottom: '10px',
		width: '50%'
	}

	const ButtonStyle = {
		width: '50px',
		height: '25px',
		backgroundColor: '#352c7d',
		borderRadius: '10px',
		color: 'white',
	}

	 return (
		 <div style={contentStyle}>
            	{isNewPostMode ? (
                	<div style={inputContainer}>
                    	<input type="text" value={newPost.title} onChange={handleTitleChange} placeholder="Enter title" style={inputStyle} />
                    	<input type="text" value={newPost.demon} onChange={handleDemonChange} placeholder="Enter demon" style={inputStyle}/>
                    	<input type="text" value={newPost.content} onChange={handleContentChange} placeholder="Enter content" style={inputStyle}/>
                    	<input type="number" value={newPost.level} onChange={handleLevelChange} placeholder="Enter level" style={inputStyle}/>
                    	<button style={ButtonStyle} onClick={handleSaveClick}>Save</button>
                	</div>
            	) : (
			<div>
			{post ? (
                        	<div>
                            		<div style={{backgroundColor: '#2135ae', padding: '10px', marginBottom: '10px', width:'100%'}}>
                                		<h3 style={{color: 'white', marginBottom: '5px',width:'100%'}}>Demon: {post.demon}</h3>
                                		<h3 style={{color: 'white'}}>Level: {post.level}</h3>
                            		</div>
                            		<div style={{backgroundColor: '#182b7e', padding: '10px',width:'100%'}}>
                                		<p style={{color: 'white'}}>Content: {post.content}</p>
                            		</div>
                        	</div>
                    	) : (
                        	<img src='./blog-default-image/nopost.gif' style={{maxWidth: '100%', maxHeight: '70%', marginTop: '20%'}}/>
                    	)}
                	</div>
            	)}
        	</div>
   	 );
}
