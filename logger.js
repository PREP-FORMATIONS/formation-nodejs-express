const EventEmitter = require("node:events");

const emitter = new EventEmitter();

emitter.on("messageLogged", (data) => {
    console.log("Listener called", data);
});

emitter.emit("messageLogged", {
    id: 1,
    age: 22,
    nom: "Jean Paul",
    adresse: {
        rue: "De blablabla",
        numero: 12,
    },
});


