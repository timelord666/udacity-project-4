var path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const mockAPIResponse = require('./mockAPI.js')
const aylien = require('aylien_textapi');
const bodyParser = require('body-parser');
dotenv.config();
const app = express()

const nlp = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})

app.use(express.static('dist'))
app.use(bodyParser.json());

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/evaluate', function (req, res) {
    
    
    const article = req.body.article;
    

    nlp.sentiment({
        'mode': 'document',
        'text': article

    }, (err, response) => {
        if (err === null) {
            res.send(JSON.stringify(response));
        } else {
            const errData = {
                'err': true,
                'data': err
            }
            res.send(JSON.stringify(errData));
        }
    });
    
    
})
