const db = require('../db')
const RepositoryService =  require('../services/repository.service');
const InitializerRunService =  require('../services/initializeRun.service');

const initializerRunService = new InitializerRunService()
const repositoryService = new RepositoryService()

class RepositoryController {
    async getAllRepositories(req, res) {
        const repositories = await db.query('SELECT * FROM repositories ORDER BY id ASC')
        console.log('Получение данных')
        return res.json(repositories)
    }

    async getRepository(req, res) {
        const {id} = req.query;

        const repository = await db.query(`SELECT * FROM repositories WHERE id = ${id}`);

        res.json({item: repository, message: `Найден репозиторий под id ${id}`})
    }

    async updateRepositories(req, res) {
        await initializerRunService.clearTimer()
        await initializerRunService.setTimer(()=> {
            repositoryService.updateRepositories()
        }, process.env.TIMER)
        console.log('Обновление данных')
        res.json({message: 'Принудительное обновление БД!'})
    }
}

module.exports = new RepositoryController();