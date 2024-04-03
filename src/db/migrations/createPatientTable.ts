import { Knex } from 'knex';

export const up = async (knex: Knex) => {
	console.log('Creating patient table');
	await knex.raw(`CREATE TABLE IF NOT EXISTS patient
(
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    birth_date data_type TEXT NOT NULL,
    appointment DATETIME,
    mrn        TEXT NOT NULL UNIQUE,
    location   TEXT NOT NULL,
    generalPractitioner TEXT NOT NULL
)
`);
	console.log('Patient table created');
};

export const down = () => {};