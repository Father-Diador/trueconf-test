const {ConfigManager} = require("./ConfigManager");
const {ElevatorManager} = require("./ElevatorManager");
const {FloorManager} = require("./FloorManager");

module.exports.ConfigManager = new ConfigManager();
module.exports.ElevatorManager = new ElevatorManager();
module.exports.FloorManager = new FloorManager();