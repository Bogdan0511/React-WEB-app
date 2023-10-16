import React, { useState, useEffect } from 'react';
import { getAllGames, updateGame } from '../api/gameApi';
import './styling/UpdateGame.css';

const UpdateGame = () => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');
    const [home, setHome] = useState('');
    const [away, setAway] = useState('');
    const [type, setType] = useState('');
    const [seats, setSeats] = useState('');

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const data = await getAllGames();
            setGames(data);
        } catch (error) {

        }
    };

    const handleGameChange = (event) => {
        const gameId = event.target.value;
        setSelectedGame(gameId);
        const selected = games.find(game => game.id === parseInt(gameId));

        if (selected) {
            setHome(selected.home);
            setAway(selected.away);
            setType(selected.type);
            setSeats(selected.seats);
        } else {
            setHome('');
            setAway('');
            setType('');
            setSeats('');
        }
    };

    const handleSubmit = async () => {
        const updatedGame = { home, away, type, seats };

        try {
            const updated = await updateGame(selectedGame, updatedGame);
            console.log('Game updated:', updated);
            await fetchGames();

        } catch (error) {
            console.error('Error updating game:', error);
        }

        setSelectedGame('');
        setHome('');
        setAway('');
        setType('');
        setSeats('');
    };

    return (
        <div className="update-game-container">
            <h2>Update Game</h2>
            <form className="form-container update-form" onSubmit={handleSubmit}>
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
                    <div>
                        <label>
                            Home Team:
                            <input
                                type="text"
                                value={home}
                                onChange={(e) => setHome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Away Team:
                            <input
                                type="text"
                                value={away}
                                onChange={(e) => setAway(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Type:
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Seats:
                            <input
                                type="number"
                                value={seats}
                                onChange={(e) => setSeats(e.target.value)}
                            />
                        </label>
                        <br />
                        <button type="submit" className="text-center">Update Game</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UpdateGame;
