const Logger = require("./event-extend");

const logger = new Logger();

logger.on("messageLogged", (data) => {
    console.log("Listener called", data);
});


logger.log("message");

