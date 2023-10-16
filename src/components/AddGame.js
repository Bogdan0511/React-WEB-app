import React, {useEffect, useState} from 'react';
import {addGame, getAllGames} from '../api/gameApi';
import './styling/AddGame.css';

const AddGame = () => {
    const [games, setGames] = useState([]);
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

    const handleSubmit = async() => {
        const newGame = { home, away, type, seats };

        addGame(newGame)
            .then((data) => {
                console.log('New game added:', data);
                fetchGames();
            })
            .catch((error) => {
                console.error('Error adding game:', error);
            });

        setHome('');
        setAway('');
        setType('');
        setSeats('');
    };

    return (
        <div className="form-container">
            <h2>Add Game</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="text-center">Add Game</button>
            </form>
        </div>
    );
};

export default AddGame;