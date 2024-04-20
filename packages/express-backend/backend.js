import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

const users = {users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

function generateId(){
    return Math.floor(Math.random() * 10000); // random between 0 - 9999
}

const addUser = (user) => {
    user.id = generateId();
    users["users_list"].push(user);
    return user;
};

// returns Id if deleted, 0 if not found
const removeUser = (userId) => {
    let numUsers = users.users_list.length;
    users.users_list = users.users_list.filter((user, i) => {
        return user.id != userId;
    });

    if (users.users_list.length < numUsers) {
        return userId;
    }

    return 0;
}

const findUserByName = (list, name) => {
    return list.filter(
        (user) => user["name"] === name
    );
};

const findUserByJob = (list, job) => {
    return list.filter(
        (user) => user.job === job
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    let response_list = users.users_list;
    if (name != undefined) {
        response_list = findUserByName(response_list, name);
    }

    if (job != undefined) {
        response_list = findUserByJob(response_list, job);
    }

    res.send({ users_list: response_list });
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; // or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    let addedUser = addUser(userToAdd);
    res.status(201).send(addedUser);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    let removeId = removeUser(id);
    if (removeId === 0) {
        res.status(404).send(); // not found
    } else {
        res.status(204).send(); // success
    }
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});