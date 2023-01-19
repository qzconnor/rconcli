const figlet = require('figlet');
const {askForServerIP, askForServerPort, askForServerPassword, askForServer, askForServerCommand, askForTask} = require("../lib/questions.js");
const RconHandler = require("../lib/RconHandler.js");
const ConfigHandler = require("../lib/ConfigHandler.js");


const configHandler = new ConfigHandler({
    servers: []
});
const rconHandler = new RconHandler(configHandler);

async function list(){
    if(rconHandler.listServers().length === 0){
        console.log('No servers configured!');
        return
    }
    console.log('Servers:');
    rconHandler.listServers().forEach((server, i) => {
        console.log(`ID: ${i} | ${server.ip}:${server.port}`);
    });
}
async function add(){
    const ip = await askForServerIP();
    const port = await askForServerPort();
    const password = await askForServerPassword();
    rconHandler.addServer(ip, port, password);
    await connect();
    console.log('Server added!');
}
async function remove(){
    if(rconHandler.listServers().length === 0){
        console.log('No servers configured!');
        return
    }
    const server = await askForServer(rconHandler);
    rconHandler.removeServer(server);
    console.log('Server removed!');
}
async function connect(){
    const list = rconHandler.listServers();
    if(list.length === 0){
        await add();
        return
    }
    const s = await askForServer(rconHandler);
    if(s === undefined){
        console.log('No server selected!');
        return
    }
    const server = await rconHandler.connect(s);
    console.log(`Connected to ${server.ip}:${server.port}`);
    if(rconHandler.isConnected()){
        let command = await askForServerCommand();
        while(command !== 'exit'){
            console.log(await rconHandler.sendCommand(command));
            command = await askForServerCommand();
        }
        await rconHandler.disconnect();
    }
}
console.log(figlet.textSync('RconCLI', {
    font: 'Big',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}));
(async () => {
    app: while (true){
        switch (await askForTask()) {
            case 'list': await list(); break;
            case 'add': await add(); break;
            case 'remove': await remove(); break;
            case 'connect': await connect(); break;
            case 'exit': break app;
            default: console.log('Invalid Task'); break app;
        }
    }
})();
