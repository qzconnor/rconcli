const {Rcon} = require('rcon-client');
module.exports = class RconHandler {
    constructor(configHandler) {
        this.rcon = null;
        this.configHandler = configHandler;
    }

    listServers() {
        return this.configHandler.config.servers;
    }

    addServer(ip, port, password) {
        this.configHandler.config.servers.push({
            ip: ip,
            port: port,
            password: password
        });
        this.configHandler.saveConfig();
    }

    removeServer(index) {
        this.configHandler.config.servers.splice(index, 1);
        this.configHandler.saveConfig();
    }


    async connect(index) {
        const server = this.configHandler.config.servers[index];
        this.rcon = await Rcon.connect({
            host: server.ip, port: server.port, password: server.password
        });
        return server;
    }

    async sendCommand(command) {
        if(command !== undefined && command !== null && command !== ''){
            return await this.rcon.send(command);
        }
        return "Invalid command";
    }

    async disconnect() {
        await this.rcon.end();
    }

    isConnected() {
        return this.rcon !== null;
    }

}
