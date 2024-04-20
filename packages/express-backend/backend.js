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

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const removeUser = (userId) => {
    users.users_list = users.users_list.filter((user, i) => {
        return user.id != userId;
    });
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
    addUser(userToAdd);
    res.send();
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    removeUser(id);
    res.send();
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});