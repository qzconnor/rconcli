const getAppDataPath = require("appdata-path");
const path = require("path");
const fs = require("fs");

module.exports = class ConfigHandler {
    #defaults;
    #configPath;
    #appdataPath;

    constructor(defaults = {}) {
        this.#defaults = defaults;
        this.#appdataPath = getAppDataPath("reconcli");
        this.#configPath =  path.join(this.#appdataPath, "config.json");
        this.config = null;
        this.#createConfigIfNotExit();
        this.#loadConfig();
    }
    #loadConfig() {
        try {
            this.config = JSON.parse(fs.readFileSync(this.#configPath, "utf8"));
        } catch (e) {
            this.config = {};
        }
    }

    saveConfig() {
        fs.writeFileSync(this.#configPath, JSON.stringify(this.config, null, 4));
    }

    #createConfigIfNotExit() {
        if (!fs.existsSync(this.#appdataPath)) {
            fs.mkdirSync(this.#appdataPath);
        }
        if (!fs.existsSync(this.#configPath)) {
            fs.writeFileSync(this.#configPath, JSON.stringify(this.#defaults, null, 4));
        }

    }

}
