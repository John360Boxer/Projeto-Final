import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import '../styles/Home.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'; // Make sure you have this import

export default function Home() {
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (post) => {
        setSelectedPost(post);
        setShow(true);
    };

    useEffect(() => {
        // const token = 'YOUR_TOKEN_HERE';

        axios.get('http://localhost:3000/posts/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                setError('Failed to fetch posts');
                console.error('There was an error fetching the posts!', error);
            });
    }, []);

    const handleDelete = async () =>{
        let c = confirm(`Deseja apagar o post ${selectedPost.titulo}?`);
        if(c === true){
          try {
            const resposta = await axios.delete(`http://localhost:3000/posts/deletar-post/${selectedPost.id}`);
            if(resposta.status === 200)
              location.reload();
          } catch (error) {
            console.log(error);
          }
        }
      }

    return (
        <>
            <NavBar/>
            <div className='postagens'>
                {error && <p>{error}</p>}
                {posts.length === 0 ? (
                    <p>No posts available</p>
                ) : (
                    posts.map(post => (
                        <Card key={post.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={post.foto} />
                            <Card.Body>
                                <div className='alinhar'>
                                    <Card.Title className='bold'>{post.titulo}</Card.Title>
                                    <button id='mais' onClick={() => handleShow(post)}>
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                </div>
                                <div className='informacoes'>
                                    <Card.Text>Data: {post.data}</Card.Text>
                                    <Card.Text>Temperatura: {post.temperatura} graus</Card.Text>
                                </div>
                                <Card.Text>{post.descricao}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
            {selectedPost && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Opções do post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Selecione alguma das opções</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Excluir
                        </Button>
                        <Link to='/attPost' state={selectedPost}>Atualizar</Link>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
