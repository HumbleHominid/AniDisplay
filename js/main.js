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
