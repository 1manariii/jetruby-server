const db = require('../db')
const RepositoryService =  require('../services/repository.service');
const InitializerRunService =  require('../services/initializeRun.service');

const initializerRunService = new InitializerRunService()
const repositoryService = new RepositoryService()

class RepositoryController {
    async getAllRepositories(req, res) {
        const repositories = await db.query('SELECT * FROM repositories ORDER BY id ASC')

        return res.json(repositories)
    }

    async getRepository(req, res) {
        const {id, name} = req.query;
        if (id !== 'null') {
            const repository = await db.query(`SELECT * FROM repositories WHERE id = ${id}`);
            return res.json(repository)
        }
        if (name !== 'null') {
            // const repository = await db.query(`SELECT * FROM repositories WHERE name = '${name}'`);
            const repositories = await db.query('SELECT * FROM repositories ORDER BY id ASC')
            const foundedRepository = repositories.rows.filter(r=>r.name.indexOf(name) > -1)
            return res.json(foundedRepository)
        }
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