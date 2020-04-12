import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });

  }, []);

  function randomIntegerNumber() {
    return (Math.random() * (100 - 1) + 1).toFixed(4);
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Project - Version: ${randomIntegerNumber()}`,
      owner: 'Markim',
      techs: ['ReactJS', 'React Native', 'NodeJS']
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const respose = await api.delete(`repositories/${id}`);

    if (respose.status === 204) {
      const repositoriesFiltred = repositories.filter(repository => repository.id !== id);

      setRepositories(repositoriesFiltred)  
    }
  }

  return (
    <div>
      <h1>Repositórios</h1>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
