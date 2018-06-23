const getRandom = require('../helplers/').random;
const imdb250 = require('../../playground/imdbTop250.json');


const api = {
    random250: function () {
        const index = getRandom(249);

        return imdb250[index];
    }
};

module.exports = api;