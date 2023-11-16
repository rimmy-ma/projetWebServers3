const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Importation des routes
const articleRoutes = require('./routes/routeArticleDeBlog');
const commentRoutes = require('./routes/routeCommentaire');
const eventRoutes = require('./routes/routeEvenements');
const reservationRoutes = require('./routes/routeReservations');
const roleRoutes = require('./routes/routeRole');
const userRoutes = require('./routes/routeUtilisateurs');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/projetWebServer', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB: projetWebServer'))
    .catch(err => console.error('Impossible de se connecter à MongoDB', err));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisation des routes
app.use('/articles', articleRoutes);
app.use('/comments', commentRoutes);
app.use('/events', eventRoutes);
app.use('/reservations', reservationRoutes);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);

// Gestion des erreurs 404 - Page non trouvée
app.use((req, res, next) => {
    res.status(404).send('Désolé, page non trouvée');
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

module.exports = app;
