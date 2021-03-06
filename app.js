(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const fetch = require('node-fetch');

module.exports = {
    getAnime: `
        query ($id: Int) {
            Media (id: $id, type: ANIME) {
                id
                title {
                    romaji
                    english
                    native
                }
                description (asHtml: true)
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                season
                episodes
                duration
                hashtag
                bannerImage
                coverImage {
                    medium
                    large
                }
                synonyms
                nextAiringEpisode {
                    id
                    timeUntilAiring
                    episode
                }
                streamingEpisodes {
                        title
                        thumbnail
                        url
                        site
                    }
            }
        }
    `,
    request(query, variables) {
        return fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err));
    }
}

},{"node-fetch":3}],2:[function(require,module,exports){
const ql = require('./graphQL');
const fetch = require('node-fetch');

[ 99423, 97832, 99726, 21827 ].forEach((id) => {
    ql.request(ql.getAnime, { id: id })
    .then((res) => {

        if (res.data.Media) {
            let el = document.createElement('img');
            el.src = res.data.Media.coverImage.large;

            $('#application').append(el);
        }
    });
});

},{"./graphQL":1,"node-fetch":3}],3:[function(require,module,exports){
module.exports = exports = window.fetch;
exports.Headers = window.Headers;
exports.Request = window.Request;
exports.Response = window.Response;

},{}]},{},[2]);
