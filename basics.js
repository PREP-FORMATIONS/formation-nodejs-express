const http = require("node:http");

const contacts = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
];

const server = http.createServer((request, response) => {
    if (request.url === "/api/contacts" && request.method === "GET") {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(contacts));
    }

    if (request.url === "/api/contacts" && request.method === "POST") {
        const body = { id: contacts.length + 1, name: "Luis" };
        contacts.push(body);
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify(body));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});


// Pas obligatoire
server.on("connection", (socket) => {
    console.log("Un client a été connecté");
    console.log("client : ", socket.remoteAddress);
});

server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
        console.log("Address in use, retrying...");
        setTimeout(() => {
            server.close();
            server.listen(PORT);
        }, 1000);
    }
});

