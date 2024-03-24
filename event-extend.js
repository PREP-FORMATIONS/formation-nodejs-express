const EventEmitter = require("node:events");



class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit("messageLogged", { id: 1, age: 22, nom: "Jean Paul" });
    }
}


module.exports = Logger;
