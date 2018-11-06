// TODO get seed data from config

const seed = require('./seed.json');

module.exports = (config) => {
    switch (config.storage) {
        case 'memory':
            return require('../storage/memory-storage')(seed);
        default:
            // Use memory storage, if not otherwise specified
            return require('../storage/memory-storage')(seed);
    }
};