import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGameGenre, getGames, nameByOrder, gamesFiteredByGenres, gamesFilteredByCreation } from '../../redux/actions';
import GameCard from '../GameCard/GameCard'
import Loading from '../Loading/Loading';
import Paginate from '../Paginate/Paginate';
import SearchBar from '../SearchBar/SearchBar';
import SelectGenres from '../SelectGenres/SelectGenres';
import "./home.css";

const Home = () => {

    const dispatch = useDispatch();

    const allGames = useSelector((state) => state.games);

    const allGenres = useSelector((state) => state.genres);

    const [currentPage, setCurrentPage] = useState(1);

    const [gamesPage, setGamesPage] = useState(15);

    const indexOfLastGame = currentPage * gamesPage;

    const indexOfFirstGame = indexOfLastGame - gamesPage;

    const currentGame = allGames.slice(indexOfFirstGame, indexOfLastGame); 

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getGames());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getGameGenre());
    }, [dispatch]);

    const handleFilteredGenres = (e) => {
        dispatch(gamesFiteredByGenres(e.target.value));
    };

    const handleFilteredCreates = (e) => {
        dispatch(gamesFilteredByCreation(e.target.value));
    }

    const handleOrderName = (e) => {
        e.preventDefault();
        dispatch(nameByOrder(e.target.value));

    }

    return (
        <div>

            <SearchBar />
            
            <Paginate 
                gamesPage = {gamesPage} 
                allGames = {allGames.length} 
                paginate = {paginate} 
            />

            <select onChange={e => handleOrderName(e)}>
                {/* <option selected disabled value="">Ordenar alfabeticamente</option> */}
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>

            <select>
                <option value="">Ordenar por ranking</option>
                <option value="mejor">Mejor ranking</option>
                <option value="peor">Peor ranking</option>
            </select>

            <select onChange={e => handleFilteredCreates(e)}>
                <option value="Todos">Todos los juegos</option>
                <option value="Creados">Creados</option>
                <option value="API">Existentes</option>
            </select>

            <select onChange={e => handleFilteredGenres(e)}>
                <option value="Todos">Todos los generos</option>
                <SelectGenres allGenres = {allGenres} />
            </select>

            <Link to='/game'>
                <button>Crear videojuego</button>
            </Link>

            {
                currentGame.length ?
                currentGame?.map( game => {
                    return (
                        <GameCard
                            id = {game.id} 
                            key = {game.id}
                            name = {game.name}
                            image = {game.image}
                            genres = {game.genres}
                            rating = {game.rating}
                            createInDb = {game.createInDb}
                        />
                    )
                })
                : <Loading />
            }

        </div>
    )
}

export default Home