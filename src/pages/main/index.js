import React, { Component } from 'react';
import api from '../../components/services/api';
import './style.css';
import { Link } from 'react-router-dom';

export default class Main extends Component { // Extendendo classe

    state = { //Definindo estado (sempre um objeto ou diversos)
        products: [],
        productInfo: {},
        page: 1,
    };
    componentDidMount() {
        this.loadProducts();
    }
    loadProducts = async (page = 1) => { //função responsavel por dar o 'get' na API
        const response = await api.get(`/products?page=${page}`); //Usando template literals.
        
        const { docs, ...productInfo } = response.data;

        this.setState({ products: docs, productInfo, page });

        
        };

        prevPage = () => {
            //função responsável pelo retrocesso das páginas
            const { page, productInfo } = this.state;

            if(page === 1) return;

            const pageNumber = page - 1;

            this.loadProducts(pageNumber);

        };
        nextPage = () => {

            //função responsável pelo avanço das páginas
            const { page, productInfo } = this.state;

            if(page === productInfo.pages) return;

            const pageNumber = page + 1;

            this.loadProducts(pageNumber);

        };

    render() {
        const { products, page, productInfo } = this.state;
        return (
            <div className='product-list'>
                {products.map(product =>(
                   <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                   </article>
                ))}
                <div className='actions'>
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        );
    }
}