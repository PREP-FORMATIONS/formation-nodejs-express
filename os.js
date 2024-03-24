const os = require('node:os');

const totalRAM = os.totalmem();
const totalRAMInGB = (totalRAM / 1024 / 1024 / 1024).toFixed(2);

console.log(`Quantité totale de RAM : ${totalRAMInGB} Go`);
