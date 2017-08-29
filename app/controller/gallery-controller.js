var galleryShows = require('./../domain/gallery/gallery-shows.js');

function getShows(request, response) {
    galleryShows(request, response);
}

module.exports.getShows = getShows;