const db = require("../db");
const axios = require("axios");


class RepositoryService {
    async updateRepositories () {
        const response = await axios.get('https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&page=1')

        const {data} = response
        data.items.map(item => {
            const {name, watchers_count, stargazers_count } = item;
            const owner = item.owner.login;
            // Просмотры равны звездам и для виду чуть изменил число
            const watch = Math.floor(watchers_count*1.5);
            const stars = stargazers_count;

            db.query(`INSERT INTO repositories (name, owner, stars, watch) values ($1, $2, $3, $4) RETURNING *`, [name, owner, stars, watch])
        })
    }

    async deleteRepositories () {
        await db.query(`DELETE FROM repositories RETURNING *`);
    }
}

module.exports = RepositoryService;