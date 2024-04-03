import { Knex } from 'knex';

export const up = async (knex: Knex) => {
	console.log('Creating generalPractitioner table');
	await knex.raw(`CREATE TABLE IF NOT EXISTS generalPractitioner
(
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    npi        TEXT NOT NULL UNIQUE
)
    
`);
	console.log('GeneralPractitioner table created');
};

export const down = () => {};