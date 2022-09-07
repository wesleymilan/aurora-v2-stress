
const user = 'postgres';
const pass = 'postgrestest';
const hostWrite = '';
const hostRead = '';
const port = '5432';
const db = 'postgres';

import postgres from 'postgres';

const sqlWriter = postgres(`postgres://${user}:${pass}@${hostWrite}:${port}/${db}`, {});
const sqlReader = postgres(`postgres://${user}:${pass}@${hostRead}:${port}/${db}`, {});

(async () => {

    let res;
    let count = 0;

    while(true) {

        console.log('run');

        let campo1 = 'Lorem';
        let campo2 = 'ipsum';

        await sqlWriter`
            INSERT INTO stress (campo1, campo2) VALUES (${ campo1 }, ${ campo2 })
            returning campo1 campo2
          `

        await sqlReader`
            SELECT
                campo1,
                degrees(id / 0.5),
                log(id / 0.1),
                sqrt(id),
                exp(sqrt(id))
            from
                stress
            ORDER BY campo1 ASC
            LIMIT 100
          `

        console.log(count);
        count++;

    }

})().catch(console.error);

