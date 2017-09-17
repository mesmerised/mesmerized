/**
 * script to download the images and json data
 * from the api server. ir will populate the categories
 * folder with photos for each of the given categories
 * and the corresponding json data mapping to the photos.
 *
 * run from root -> node src/modules/background/utils/downloader.js
 */

const categories = require('../configs/categories.config');
const path = require('path');
const download = require('download');
const querystring = require('querystring');
const request = require('request');
const fs = require('fs');
const imageOptim = require('imageoptim');

const categoriesArray = Object.keys(categories);

const client_id = 'c94869b36aa272dd62dfaeefed769d4115fb3189a9d1ec88ed457207747be626';
const baseFetchUrl = 'https://unsplash.com/napi/search/photos';
const per_page = 1;

const DEFAULTS_API_PARAMS = {
    client_id, per_page,
    page: 1, featured: '', xp: '',
    orientation: 'landscape'
};
const DEFAULTS_PHOTO_PARAMS = {
    w: 1440, h: 900, q: 50, fit: 'crop'
}

categoriesArray.forEach(c => {
    const fetchUrl = `${baseFetchUrl}?${querystring.stringify({...DEFAULTS_API_PARAMS, query: c})}`;

    request({
        url: fetchUrl,
        json: true
    }, function (error, response, jsonData) {

        if (error || response.statusCode !== 200) {
            console.log('error', error);
            return;
        }

        console.log('processing category...', c);

        const { results } = jsonData;
        const categoryJson = JSON.stringify(results);
        const jsonFileName = `${path.join(__dirname, 'images/categories')}/${c}.json`;
        fs.writeFile(jsonFileName, categoryJson, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('written category json file', jsonFileName);
        });

        results.forEach(p => {
            const { urls } = p;

            const [base, paramsStr] = urls.regular.split('?');
            const params = { ...querystring.parse(paramsStr), ...DEFAULTS_PHOTO_PARAMS };
            const url = `${base}?${querystring.stringify(params)}`;
            const filename = `${p.id}.jpg`;

            const storagePath = path.join(__dirname, 'images/categories', c);
            download(url, storagePath, {filename}).then(() => {
                console.log(`saved ${url} to ${filename}`);

                imageOptim.optim([`${storagePath}/${filename}`])
                    .then( res => {
                        console.log('Optimized image', res);
                    });
            });
        });
    })
});
