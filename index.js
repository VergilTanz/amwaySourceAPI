const functions = require('@google-cloud/functions-framework');
const escapeHtml = require('escape-html');

/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
// functions.http('helloHttp', (req, res) => {
//     res.send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
// });

functions.http('helloHttp', (req, res) => {

    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log(req.query)
    console.log('-------------------------------------')
    console.log(req.query.name)
    console.log('-------------------------------------')
    console.log(req.body)
    console.log('-------------------------------------')
    console.log(req.body.name)
    console.log('-------------------------------------')

    res.set('Access-Control-Allow-Origin', '*')

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('Hello World with Options 2');
    } else {
        res.send('Hello World! without Options 2');
    }

    // res.send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
});