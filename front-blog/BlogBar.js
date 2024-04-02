
function BlogBar({setSelectedPost}) {

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

	// Style para button
	
	const ButtonStyle = {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		background: `url("./blog-default-image/button.png")`,
		backgroundSize: 'cover',
		border: 'none',
		cursor: 'pointer',
		marginLeft: '20px',
	}

	// Copie el style para un "clear button"
	
	const ClearButtonStyle = {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		background: `url("./blog-default-image/scape.png")`,
		backgroundSize: 'cover',
		border: 'none',
		cursor: 'pointer',
		marginLeft: '20px',
	}

	// Funcion para consumir la REST API del lab06
	
	const fetchPost = async() => {
		const response = await fetch('http://localhost:3000/posts', {
			method: 'GET',
		});
		if(response.ok) {
			const data = await response.json();
			setBlogs(data);
		} else {
			throw new Error('Error al obtener post del blog');
		}
	};
	
	React.useEffect(() => { fetchPost();}, [blogs]);

	// Mantiene en header.js y body.js el contenido seleccionado
	const handlePost = (post) => {
		setSelectedPost(post);
	};
	
	// Regresa al empty state, no muestra ningun post
	const handleClearPost = () => {
		setSelectedPost(null);
	}

	return (
		<div style={BlogBarStyles}>
			{blogs.map(blog => (
				<div key={blog.id} style={PostStyle} >
					<h4>{blog.title}</h4>
					<button style={ButtonStyle} onClick={() => handlePost(blog)}></button>
					<button style={ClearButtonStyle} onClick={handleClearPost}></button>
				</div>
			))}
		</div>
	);
}
