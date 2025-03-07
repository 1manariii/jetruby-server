const Router = require('express');
const router = new Router()
const repositoryController = require('../controllers/repository.controller.js')

router.get('/', repositoryController.getAllRepositories)
router.get('/search', repositoryController.getRepository)
router.put('/', repositoryController.updateRepositories)

module.exports = router