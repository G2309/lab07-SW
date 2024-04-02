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

	 return (
		 <div style={contentStyle}>
            	{isNewPostMode ? (
                	<div>
                    	<input type="text" value={newPost.title} onChange={handleTitleChange} placeholder="Enter title" />
                    	<input type="text" value={newPost.demon} onChange={handleDemonChange} placeholder="Enter demon" />
                    	<input type="text" value={newPost.content} onChange={handleContentChange} placeholder="Enter content" />
                    	<input type="number" value={newPost.level} onChange={handleLevelChange} placeholder="Enter level" />
                    	<button onClick={handleSaveClick}>Save</button>
                	</div>
            	) : (
                	<div>
                    	{post ? (
                        	<div>
                            	<h3>Demon: {post.demon}</h3>
                            	<h3>Level: {post.level}</h3>
                            	<p>Content: {post.content}</p>
                        	</div>
                    	) : (
                        	<img src='./blog-default-image/nopost.gif' style={{maxWidth: '100%', maxHeight: '70%', marginTop: '20%'}}/>
                    	)}
                	</div>
            	)}
        	</div>
   	 );
}
