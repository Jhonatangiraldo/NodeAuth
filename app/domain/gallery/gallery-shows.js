var http = require('http');

const showsUrl = 'http://api.tvmaze.com/shows';

function getShows(request, response) {
    http.get(showsUrl, getData.bind({ 'responseGallery': response }));
};

function getData(responseServiceConsumed) {
    let responseGallery = this.responseGallery;
    let streamData = "";
    responseServiceConsumed.on('data', function (chunk) {
        streamData += chunk;
    });
    responseServiceConsumed.on('end', function () {
        responseGallery.json(JSON.parse(streamData));
    });
}

module.exports = getShows;