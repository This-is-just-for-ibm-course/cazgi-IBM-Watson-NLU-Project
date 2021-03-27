const express = require('express');
                require('dotenv').config();
const app = new express();
 
app.use(express.static('client'))
 
const cors_app = require('cors');
app.use(cors_app());
 
const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const {IamAuthenticator} = require('ibm-watson/auth');
 
function getNLUInstance(){
 
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
            version: '2020-08-01',
            authenticator: new IamAuthenticator({
                apikey: api_key
            }),
            serviceUrl: api_url
    })
    
    return naturalLanguageUnderstanding;
}
 
 
app.get("/",(req,res)=>{
    res.render('index.html');
  });
 
app.get("/url/emotion", (req,res) => {
    const url = req.query.url;
    const analyzeParams = {
                url,
                'features': {
                    'entities': {
                        'emotion': true,
                        'limit': 3
                    }
                }
            }
   
    getNLUInstance().analyze(analyzeParams)
        .then(results => res.json(results.result.entities[0].emotion))
        .catch(err => console.log(err));
        /*
            {
                sadness: 0.092927,
                joy: 0.108549,
                fear: 0.086326,
                disgust: 0.035562,
                anger: 0.068027
            }
        */
});
 
app.get("/url/sentiment", (req,res) => {
    const url = req.query.url;
    console.log(url);
    const analyzeParams = {
            url: url,
            'features': {
                'entities': {
                    'sentiment': true,
                    'limit': 1
                }
            }
        }
   
    getNLUInstance().analyze(analyzeParams)
        .then(results => res.json(results.result.entities[0].sentiment))
        .catch(err => console.log(err));
    //returns {score: #, mixed: #, label: 'positive'}
});
 
app.get("/text/emotion", (req,res) => {
    const text = req.query.text;
    const analyzeParams = {
                text,
                'features': {
                    'entities': {
                        'emotion': true,
                        'limit': 1
                    }
                }
            }
   
    getNLUInstance().analyze(analyzeParams)
        .then(results => res.json(results.result.entities[0].emotion))
        .catch(err => console.log(err));
        /*
            {
                sadness: 0.092927,
                joy: 0.108549,
                fear: 0.086326,
                disgust: 0.035562,
                anger: 0.068027
            }
        */
});
 
app.get("/text/sentiment", (req,res) => {
    const text = req.query.text;
    console.log(text);
    const analyzeParams = {
                text,
                'features': {
                    'entities': {
                        'sentiment': true,
                        'limit': 1
                    }
                }
            }
   
    getNLUInstance().analyze(analyzeParams)
        .then(results => res.json(results.result.entities[0].sentiment))
        .catch(err => console.log(err));
        //{score: #, label: 'positive'}
});
 
let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
