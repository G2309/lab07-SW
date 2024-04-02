function BlogBar() {

	const [blogs, setBlogs] = React.useState([]);

	BlogBar.propTypes = {
		blogs: PropTypes.array.isRequired,
	};

	// Style para la barra donde se seleccionaran los post del blog

	const BlogBarStyles = {
		width: '25%',
		height: '100vh',
		backgroundColor: '#010923',
		padding: '10px',
		borderRadius: '25px',
		marginRight: '15px',
		overflowY: 'scroll',
	};

	// Style para los post
	
	const PostStyle = {
		backgroundColor: '#352c7d',
		height: '10%',
		borderRadius: '10px',
		marginBottom: '20px',
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',

	}

	// Funcion para consumir la REST API del lab06
	
	const fetchPost = async() => {
		try {
			const response = await fetch('http://localhost:3000/posts', {
				method: 'GET',
			});
			const data = await response.json();
			setBlogs(data);
		} catch (error) { 
			console.error('Error al obtener post del blog', error);
		}
	};
	
	React.useEffect(() => { fetchPost();}, [blogs]);

	return (
		<div style={BlogBarStyles}>
			{blogs.map(blog => (
				<div key={blog.id} style={PostStyle}>
					<h4>{blog.title}</h4>
				</div>
			))}
		</div>
	);
}
