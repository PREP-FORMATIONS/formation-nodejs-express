const http = require("node:http");

const database = {
    players: [
        { id: 1, fname: "Christian", lname: "Lisangola" },
        { id: 2, fname: "Zinedine", lname: "Zidane" },
        { id: 3, fname: "Thierry", lname: "Henry" },
        { id: 4, fname: "Claude", lname: "Makelele" },
        { id: 5, fname: "Patrick", lname: "Vierra" },
        { id: 6, fname: "Robert", lname: "Pires" },
        { id: 7, fname: "Fabien", lname: "Barthez" },
        { id: 8, fname: "David", lname: "Trezeguet" },
        { id: 9, fname: "Ousmane", lname: "Dembele" },
    ],
    managers: [
        { id: "1", fname: "Carlo", lname: "Ancelloti" },
        {
            id: 2,
            fname: "Pep",
            lname: "Guardiola",
        },
        {
            id: 3,
            fname: "Jupp",
            lname: "Heynckes",
        },
    ],
};

const server = http.createServer(async function (req, res) {
    if (req.url === "/") {
        res.end("<h1>Welcome</h1>");
    }

    if (req.url === "/api/players") {
        // const football = JSON.parse(await fs.readFile("./database.json", "utf-8"));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(database.players));
    }

    if (req.url === "/api/managers") {
        // const football = JSON.parse(await fs.readFile("./database.json", "utf-8"));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(database.managers));
    }
});

server.listen(3000, () => {
    console.log("Le serveur écoute sur le port 3000");
});
