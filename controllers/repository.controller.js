const db = require('../db')
const RepositoryService =  require('../services/repository.service');
const InitializerRunService =  require('../services/initializeRun.service');

const initializerRunService = new InitializerRunService()
const repositoryService = new RepositoryService()

class RepositoryController {
    async getAllRepositories(req, res) {
        const repositories = repositoryService.getAllRepositories()
        return res.json(repositories)
    }

    async getRepository(req, res) {
        const {id, name} = req.query;
        const repository = await repositoryService.getRepository(id, name)
        return res.json(repository)
    }

    async updateRepositories(req, res) {
        await initializerRunService.clearTimer()
        await initializerRunService.setTimer(()=> {
            repositoryService.updateRepositories()
        }, process.env.TIMER)
        return res.sendStatus(200)
    }
}

module.exports = new RepositoryController();