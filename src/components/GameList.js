import React, { useEffect, useState } from 'react';
import { getAllGames } from '../api/gameApi';
import './styling/GameList.css';

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Fetch games when the component mounts
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const data = await getAllGames();
            setGames(data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    return (
        <div className="game-list">
            <h2 className="game-list-title"> Available games:</h2>
            {/* Display the list of games */}
            <table className="table">
                <thead>
                <tr>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th>Type</th>
                    <th>Seats</th>
                </tr>
                </thead>
                <tbody>
                {games.map((game) => (
                    <tr key={game.id}>
                        <td>{game.home}</td>
                        <td>{game.away}</td>
                        <td>{game.type}</td>
                        <td>{game.seats}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameList;