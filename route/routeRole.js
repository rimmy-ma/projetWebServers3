// routes/roles.js
const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

// Créer un nouveau rôle
router.post('/roles', RoleController.createRole);

// Récupérer tous les rôles
router.get('/roles', RoleController.getAllRoles);

// Récupérer un rôle par ID
router.get('/roles/:id', RoleController.getRoleById);

// Mettre à jour un rôle
router.put('/roles/:id', RoleController.updateRole);

// Supprimer un rôle
router.delete('/roles/:id', RoleController.deleteRole);

module.exports = router;