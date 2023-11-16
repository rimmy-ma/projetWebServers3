const db = require('../models');
const Role = db.Role;

// Créer un nouveau rôle
exports.create = (req, res) => {
  const { nom } = req.body;

  Role.create({ nom })
    .then(role => {
      res.status(201).json(role);
    })
    .catch(err => {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du rôle.' });
    });
};

// Récupérer tous les rôles
exports.findAll = (req, res) => {
  Role.findAll()
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(err => {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des rôles.' });
    });
};

// Récupérer un seul rôle par ID
exports.findOne = (req, res) => {
  const { roleId } = req.params;

  Role.findByPk(roleId)
    .then(role => {
      if (!role) {
        res.status(404).json({ message: 'Rôle non trouvé.' });
        return;
      }
      res.status(200).json(role);
    })
    .catch(err => {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération du rôle.' });
    });
};

// Mettre à jour un rôle par ID
exports.update = (req, res) => {
  const { roleId } = req.params;
  const { nom } = req.body;

  Role.findByPk(roleId)
    .then(role => {
      if (!role) {
        res.status(404).json({ message: 'Rôle non trouvé.' });
        return;
      }
      role.nom = nom;
      return role.save();
    })
    .then(updatedRole => {
      res.status(200).json(updatedRole);
    })
    .catch(err => {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du rôle.' });
    });
};

// Supprimer un rôle par ID
exports.delete = (req, res) => {
  const { roleId } = req.params;

  Role.findByPk(roleId)
    .then(role => {
      if (!role) {
        res.status(404).json({ message: 'Rôle non trouvé.' });
        return;
      }
      return role.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du rôle.' });
    });
};
