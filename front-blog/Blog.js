//
//						Base del blog
//

function Blog() {
	
	const [selectedPost, setSelectedPost] = React.useState(null);

	const [isNewPostMode, setIsNewPostMode] = React.useState(false);

	// Estilo del blog
	const blogStyle = {
		width: '100%',
		height: '100vh',
		display: 'flex',
	};

	const BarStyle = {
		width: '30%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	};

	const ContentStyle = {
		width: '70%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	};

	const handleDelete = () => {};

	const handleNewPost = () => {
		setSelectedPost(null);
		setIsNewPostMode(true);
	};

	const handleSavePost = () => {
		setIsNewPostMode(false);
	};

	return (
		<div style={blogStyle}>
		<BlogBar setSelectedPost={setSelectedPost} style={BarStyle}/>
			<div style={ContentStyle}>	
			<Header post={selectedPost}/>
			<Body post={selectedPost} isNewPostMode={isNewPostMode} onSavePost={handleSavePost}/>
			<Nav onDelete={handleDelete} onSave={handleSavePost} selectedPost={selectedPost} onNewPost={handleNewPost}/>
			</div>
		</div>
	);


}
