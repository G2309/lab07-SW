//
//						Base del blog
//

function Blog() {
	
	const [selectedPost, setSelectedPost] = React.useState(null);


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

	return (
		<div style={blogStyle}>
		<BlogBar setSelectedPost={setSelectedPost} style={BarStyle}/>
			<div style={ContentStyle}>	
			<Header post={selectedPost}/>
			<Body post={selectedPost}/>
			<Nav onDelete={handleDelete} selectedPost={selectedPost}/>
			</div>
		</div>
	);


}
