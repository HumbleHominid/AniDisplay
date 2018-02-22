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
