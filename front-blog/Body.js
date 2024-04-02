function Body({post}) {

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
		{post ? (
			<div>
				<h3>Demon: {post.demon}</h3>
				<h3>Level: {post.level}</h3>
				<p>Content: {post.content}</p>
			</div>
		): (
			<img src='./blog-default-image/nopost.gif' style={{maxWidth: '100%', maxHeight: '70%', marginTop: '20%'}}/>
		)}
		</div>
	);
}
