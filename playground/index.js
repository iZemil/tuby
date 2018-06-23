const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


request('https://www.imdb.com/chart/top', function(err, res, body) {
    const $ = cheerio.load(body);

    const $filmTr = $('.lister-list tr');
    const titleSelector = '.titleColumn a';
    const posterImgSelector = '.posterColumn img';

    const films = [];

    $filmTr.each(function(ndx, el) {
        const $this = $(this),
            $title = $this.find(titleSelector),
            $posterImg = $this.find(posterImgSelector),
            title = $title.text(),
            href = $title.attr('href');

        const data = {
            id: href.match(/\/title\/.+\//)[0].split('/')[2],
            title: title,
            posterLink: $posterImg.attr('src').match(/.+_V1_/)[0] + '.jpg',
            link: 'https://www.imdb.com' + href,
        };

        films.push(data);
    });

    fs.appendFile('imdbTop250.json', JSON.stringify(films), function(err) {
        if (err) console.log('Appending error: ', err);
        console.log('Success appending');
    });
});


// const poster = `https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg`;