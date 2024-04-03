import fs from 'fs';
import { Knex } from 'knex';

interface Record {
	given: string;
	family: string;
	birthDate: Date;
	appointment: Date;
	mrn: number;
	location: string;
	generalPractitioner: {
		given: string;
		family: string;
		npi: number;
	};
}

export const seed = async (knex: Knex) => {
	console.log('Beginning database seeding.');
	const records: Record[] = JSON.parse(
		fs.readFileSync('src/db/seeds/data.json', 'utf-8'),
	);

	console.log(records[0]);
	console.log(records[0].given);
	console.log(`Seeding ${records.length} records`);

	// TODO: add your database hydration logic here

	for (var record of records)
	{
		// Add patient data
		try {
		await knex('patient')
		.insert({first_name: record.given, 
				last_name: record.family,
				birth_date: record.birthDate,
				appointment: record.appointment,
				mrn: record.mrn,
				location: record.location,
				generalPractitioner: record.generalPractitioner.npi
		})
		.onConflict('mrn')
		.ignore()}
		// .select(record.mrn)
		// .whereNotExists(knex('patient').where('mrn', record.mrn))}
		catch(err)
		{
			console.log("ERROR patient data")
			console.log(err)
		}
		//.then(()=>{})

		// Add general practitioner data
		//var val = "water";
		// try{
		// 	var gp = record.generalPractitioner;
		// 	//var rawStr = "INSERT INTO generalPractitioner (first_name, last_name, npi) VALUES(?, ?, ?) SELECT DISTINCT ? FROM generalPractitioner WHERE NOT EXISTS(SELECT 1 FROM generalPractitioner WHERE npi = ?)";
		// 	var rawStr = "INSERT OR IGNORE INTO generalPractitioner (first_name, last_name, npi) VALUES(?, ?, ?)";
		// 	return knex.raw(rawStr, [gp.given, gp.family, gp.npi])
		// 	.on('query', function(data) {
		// 	console.log("ON-QUERY data:", data);
		// 	})
		// }

		try {
		await knex('generalPractitioner')
		.insert({first_name: record.generalPractitioner.given, 
			last_name: record.generalPractitioner.family,
			npi: record.generalPractitioner.npi
		})
		.onConflict('npi')
		.ignore()
		// .select(record.generalPractitioner.npi)
		// .whereNotExists(knex('generalPractitioner').where('npi', record.generalPractitioner.npi))
		
		}
		catch(err)
		{
			console.log("ERROR general practitioner data")
			console.log(err)
		}
	}

	console.log('Database seeding complete.');
};
