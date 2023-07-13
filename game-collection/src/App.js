import { useState } from "react";
import "./index.css";

const defaultGames = [
  {
    name: "Rygar",
    console: "NES",
    publisher: "Tecmo",
    value: 10.0,
    id: 8,
  },
  {
    name: "Shadowgate",
    console: "NES",
    publisher: "Kemco",
    value: 7.0,
    id: 7,
  },
  {
    name: "Metroid",
    console: "NES",
    publisher: "Nintendo",
    value: 20.0,
    id: 6,
  },
  {
    name: "Mega Man 2",
    console: "NES",
    publisher: "Capcom",
    value: 25.0,
    id: 4,
  },
];

function App() {
  const [gameList, setGameList] = useState(defaultGames);
  const [addGame, setAddGame] = useState(false);

  function handleRemove(id) {
    setGameList((gameList) => gameList.filter((game) => game.id != id));
  }

  function handleSubmit(game) {
    setGameList((gameList) => [...gameList, game]);
    setAddGame(!addGame);
  }
  return (
    <div>
      <h1 className="header">
        Video Game Collection
        <button
          className={addGame ? "red-button" : ""}
          onClick={() => setAddGame(!addGame)}
        >
          {addGame ? "Close" : "Add New Game"}{" "}
        </button>
      </h1>
      <GameForm handleSubmit={handleSubmit} addGame={addGame} />
      <Collection gameList={gameList} handleRemove={handleRemove} />
    </div>
  );
}

function Collection({ gameList, handleRemove }) {
  let totalvalue = 0;
  gameList.map((game) => (totalvalue = game.value + totalvalue));

  function Remove(id) {
    handleRemove(id);
  }
  if (gameList.length <= 0) return <h1>NO GAMES FOUND </h1>;

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Console</th>
            <th>Publisher</th>
            <th>Value</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {gameList.map((el) => (
            <tr>
              <td>{el.name}</td>
              <td>{el.console}</td>
              <td>{el.publisher}</td>
              <td>{el.value}</td>
              <td>
                <button className="remove-button" onClick={() => Remove(el.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="total-value">Your Total game value is ${totalvalue}</h1>
    </div>
  );
}

function GameForm({ addGame, handleSubmit }) {
  const [name, setName] = useState("");
  const [console, setConsole] = useState("");
  const [publisher, setPublisher] = useState(" ");
  const [value, setValue] = useState(0.0);

  function onSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    if (!name || !console || !publisher) return;

    const newGame = {
      name,
      console,
      publisher,
      value,
    };

    handleSubmit(newGame);
    setConsole("");
    setName("");
    setPublisher("");
  }
  if (!addGame) return;
  return (
    <div className="game-form">
      <form onSubmit={onSubmit}>
        <label>Game Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Console</label>
        <input
          type="text"
          value={console}
          onChange={(e) => setConsole(e.target.value)}
        />
        <label>Publisher</label>
        <input
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <label>Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
