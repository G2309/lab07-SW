function Header({post}) {
	const headerStyle = {
		height: '15%',
		width: '100%',
		backgroundColor: '#271958',
		borderRadius: '20px',
		color: 'white',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	return (
		<div style={headerStyle}>
			<h2>{post ? post.title : 'No post selected'}</h2>
		</div>
	);
}
