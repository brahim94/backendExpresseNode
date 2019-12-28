const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Thing = require('./models/thing');

mongoose.connect('mongodb+srv://brahimmongo:25Mongo@cluster0-xhtjj.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Acces-Control-Allow-Methodes', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error}));

});

app.use('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things =>
res.status(200).json(things))
    .catch(error => res.status(400).json({ error}));
});
module.exports = app;