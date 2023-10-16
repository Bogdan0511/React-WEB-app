import React from 'react';
import GameList from './components/GameList';
import AddGame from './components/AddGame';
import UpdateGame from './components/UpdateGame';
import DeleteGame from './components/DeleteGame';
import './App.css';

const App = () => {
    return (
        <div className="app-container">
            <h1>
                Basketball Games
            </h1>
            <div className="game-list-container">
                <GameList />
            </div>
            <div className="content-container">

                <div className="forms-container">
                    <AddGame />
                    <UpdateGame />
                    <DeleteGame />
                </div>
            </div>
        </div>
    );
};

export default App;