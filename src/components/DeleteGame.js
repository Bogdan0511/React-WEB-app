import React, { useState, useEffect } from 'react';
import { getAllGames, deleteGame } from '../api/gameApi';
import './styling/DeleteGame.css';

const DeleteGame = () => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const data = await getAllGames();
            setGames(data);
        } catch (error) {
            // Handle error
        }
    };

    const handleGameChange = (event) => {
        setSelectedGame(event.target.value);
    };

    const handleDelete = async () => {
        try {
            await deleteGame(selectedGame);
            console.log('Game deleted successfully');
            // Optionally, perform any additional actions after deleting the game
        } catch (error) {
            console.error('Error deleting game:', error);
            // Handle any errors that occur during the API request
        }

        setSelectedGame('');
    };

    return (
        <div className="delete-game-container">
            <h2>Delete Game</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="game-select">Select Game:</label>
                    <select id="game-select" value={selectedGame} onChange={handleGameChange}>
                        <option value="">Select a game</option>
                        {games.map((game) => (
                            <option key={game.id} value={game.id}>
                                {game.home} vs {game.away}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedGame && (
                    <div className="delete-confirmation">
                        <p>Are you sure you want to delete this game?</p>
                        <button onClick={handleDelete}>Delete Game</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default DeleteGame;