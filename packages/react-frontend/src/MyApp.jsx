import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list))
      .catch((error) => { console.log(error); });
  }, [] );

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function removeUser(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });

    return promise;
  }

  function removeOneCharacter(index) {
    let removeId = characters[index].id;
    removeUser(removeId)
      .then((response) => {
        if (response.status !== 204) {
          throw new Error("Delete failed with status " + response.status);
        } else {
          const updated = characters.filter((character) => {
            return character.id !== removeId;
          });
          setCharacters(updated);
        }
      })
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Request failed with status " + response.status);
        } else {
          return response.json();
        }})
      .then((json) => setCharacters([...characters, json]))
      .catch((error) => {
          console.log(error);
      })

      // Should there be a semicolon on the line above this?
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;