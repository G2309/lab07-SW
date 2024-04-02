//
//						Base del blog
//

function Blog() {
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

	return (
		<div style={blogStyle}>
		<BlogBar style={BarStyle} />
			<div style={ContentStyle}>			
			<Header/>
			<Body/>
			</div>
		</div>
	);


}
