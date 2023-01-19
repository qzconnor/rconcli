const prompts = require('prompts');

async function askForServerIP(){
    const {value} = await prompts({
        type: 'text',
        name: 'value',
        message: 'Recon Address'
    })
    return value
}
async function askForServerPort(){
    const {value} = await prompts({
        type: 'number',
        name: 'value',
        message: 'Recon Port',
        initial: 25575,
        validate: value => {
            if (value > 0 && value < 65536) {
                return true
            }
            return 'Please enter a valid port number'
        }
    })
    return value
}
async function askForServerPassword(){
    const {value} = await prompts({
        type: 'password',
        name: 'value',
        message: 'Recon Password'
    })
    return value
}
async function askForServerCommand(){
    const {value} = await prompts({
        type: 'text',
        name: 'value',
        message: '',
        validate: value => value.length > 0 ? true : 'Please enter a command'
    })
    return value
}
async function askForTask(){
    const {value} = await prompts({
        type: 'select',
        name: 'value',
        message: 'Pick an Option',
        choices: [
            {title: 'CONNECT', value: 'connect'},
            {title: 'ADD', value: 'add'},
            {title: 'DELETE', value: 'remove'},
            {title: 'LIST', value: 'list'},
            {title: 'EXIT', value: 'exit'}
        ],
        initial: 0
    })
    return value
}

async function askForServer(rconHandler){
    const servers = await rconHandler.listServers();
    const {value} = await prompts({
        type: 'select',
        name: 'value',
        message: 'Pick a Server',
        choices: [
            ...servers.map((server, i) => {
                return {title: `${server.ip}:${server.port}`, value: i}
            })
        ],
        initial: 0
    })
    return value;
}

module.exports = {
    askForServerIP,
    askForServerPort,
    askForServerPassword,
    askForServerCommand,
    askForTask,
    askForServer
}
