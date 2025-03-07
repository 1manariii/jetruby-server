const db = require("../db");
const axios = require("axios");


class RepositoryService {
    async getRepository (id, name) {
        if (id !== 'null') {
            return await db.query(`SELECT * FROM repositories WHERE id = ${id}`)
        }
        if (name !== 'null') {
            return await db.query(`SELECT * FROM repositories WHERE name LIKE '${name}'`)
        }
    }

    async getAllRepositories () {
        const repositories = await db.query('SELECT * FROM repositories ORDER BY id ASC')
        return repositories
    }

    async updateRepositories () {
        const response = await axios.get('https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&page=1', {
            headers: {
                'Authorization': `Bearer ${process.env.GIT_TOKEN}`
            }
        })

        const {data} = response
        data.items.map((item, i) => {
            const {name, watchers_count, stargazers_count } = item;
            const id = i + 1
            const owner = item.owner.login;
            // Просмотры равны звездам и для виду чуть изменил число
            const watch = Math.floor(watchers_count*1.5);
            const stars = stargazers_count;

            db.query(`INSERT INTO repositories (id, name, owner, stars, watch) values ($1, $2, $3, $4, $5) RETURNING *`, [id, name, owner, stars, watch])
        })
    }

    async deleteRepositories () {
        await db.query(`DELETE FROM repositories RETURNING *`);
    }
}

module.exports = RepositoryService;