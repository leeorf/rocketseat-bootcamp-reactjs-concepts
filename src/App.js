import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([{}]);

  useEffect(()=> {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Project ${Date.now()}`,
      url: "http://github.com/...", 
      techs: ["Node.js", "..."]  
    })

    const repository = response.data;

    setRepositories([
      ...repositories,
      repository
    ]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoriesCopy = [
      ...repositories
    ]

    const indexDeletedRepository = repositoriesCopy
    .findIndex(repository => repository.id === id);

    repositoriesCopy.splice(indexDeletedRepository,1);


    setRepositories(repositoriesCopy);
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
            <li key={String(repository.id)}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
