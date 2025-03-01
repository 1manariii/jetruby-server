const express = require('express');
require('dotenv').config()
const cors = require('cors');
const repositoryRouter = require('./routes/repository.routes');
const InitializeRunService = require('./services/initializeRun.service')
const RepositoryService = require('./services/repository.service')
const initializeRunService = new InitializeRunService()
const repositoryService = new RepositoryService()
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())


app.use(cors());
app.use('/api', repositoryRouter)

app.listen(PORT, async () => {
    await initializeRunService.setTimer(setInterval(()=> {
        repositoryService.deleteRepositories()
        repositoryService.updateRepositories()
    }, process.env.TIMER))
    console.log(`Сервер работает на ${PORT} порту!`)
})