const app = require('express')();
const mysql = require('mysql');
const faker = require('faker-br');

const createConfigDB = () => ({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
})

const createConnection = () => {
    const configDB = createConfigDB();
    return mysql.createConnection(configDB);
}

const createTable = (dbConnection) => {
    dbConnection.query('DROP TABLE IF EXISTS `people`');
    dbConnection.query('CREATE TABLE people (name VARCHAR(255))');
    dbConnection.end();
}

const makeRandomPeopleNameList = () => {
    const randomQuantity = Math.floor(Math.random() * 10) + 1;
    return Array.from({ length: randomQuantity }, () => faker.name.firstName());
}

const makeInsertionPeopleQueryFromNameList = (nameList = []) => {
    const namesAsValues = nameList
        .map(name => `('${name}')`)
        .join(',');
    return `INSERT INTO people(name) VALUES ${namesAsValues};`;
}

const makeSelectQuery = () => 'SELECT * FROM people;'

const insertRandomPeopleIntoPeopleTable = (dbConnection) => {
    const insertionQuery = makeInsertionPeopleQueryFromNameList(
        makeRandomPeopleNameList()
    );
    dbConnection.query(insertionQuery);
}

const selectPeople = (dbConnection, requestCallback) => {
    const selectQuery = makeSelectQuery();
    dbConnection.query(selectQuery, requestCallback);
}

const makeHTMLFromNameList = (nameList = []) => {
    return `
        <ul>
            ${nameList.reduce((accumulator, currentValue) => accumulator + `<li><h3>${currentValue.name}</h3></li>`, '')}
        </ul>
    `
}

app.listen(3000, () => createTable(createConnection()))

app.get('/', (req, resp) => {
    const dbConnection = createConnection();
    dbConnection.query('DELETE FROM people;')
    insertRandomPeopleIntoPeopleTable(dbConnection);

    selectPeople(dbConnection, (error, results, fields) => {
        if (error) throw error;
        dbConnection.end();
        resp.send(`
            <h1>Full Cycle Rocks!</h1>
            ${makeHTMLFromNameList(results)}
        `)
    });
})


