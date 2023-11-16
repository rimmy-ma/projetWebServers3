const db = require('../models');
const Article = db.Article;

// Créer un nouvel article de blog
exports.create = (req, res) => {
  const { titreArticle, contenuArticle, datePublication, auteurId } = req.body;

  Article.create({
    titreArticle,
    contenuArticle,
    datePublication,
    auteurId
  })
    .then(article => {
      res.status(201).json(article);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la création de l'article de blog." });
    });
};

// Récupérer tous les articles de blog
exports.findAll = (req, res) => {
  Article.findAll()
    .then(articles => {
      res.status(200).json(articles);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des articles de blog." });
    });
};

// Récupérer un seul article de blog par ID
exports.findOne = (req, res) => {
  const { articleId } = req.params;

  Article.findByPk(articleId)
    .then(article => {
      if (!article) {
        res.status(404).json({ message: 'Article de blog non trouvé.' });
        return;
      }
      res.status(200).json(article);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'article de blog." });
    });
};

// Mettre à jour un article de blog par ID
exports.update = (req, res) => {
  const { articleId } = req.params;
  const { titreArticle, contenuArticle, datePublication } = req.body;

  Article.findByPk(articleId)
    .then(article => {
      if (!article) {
        res.status(404).json({ message: 'Article de blog non trouvé.' });
        return;
      }
      article.titreArticle = titreArticle;
      article.contenuArticle = contenuArticle;
      article.datePublication = datePublication;

      return article.save();
    })
    .then(updatedArticle => {
      res.status(200).json(updatedArticle);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'article de blog." });
    });
};

// Supprimer un article de blog par ID
exports.delete = (req, res) => {
  const { articleId } = req.params;

  Article.findByPk(articleId)
    .then(article => {
      if (!article) {
        res.status(404).json({ message: 'Article de blog non trouvé.' });
        return;
      }
      return article.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'article de blog." });
    });
};
