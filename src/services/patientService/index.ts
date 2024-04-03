import { ParsedQs } from 'qs';
import { db } from '../../db';

/**
 * Get patient by MRN
 * @param mrn 
 * @returns patient info
 */
export const getPatientByMrn = (mrn: string) => {
	//const result = await db.raw('SELECT * FROM patient WHERE mrn = ?', mrn);
	var rawStr = 'SELECT * FROM patient WHERE mrn = ?';
	var params:string[] = [mrn];

	const result = callDb(rawStr, params);
	
	return result;
};

/**
 * Get list patients by general practitioner's npi
 * @param npi 
 * @returns 
 */
export const getPatientsByPractitioner = async (npi: string) => {
	
	//const result = await db.raw('SELECT * FROM patient WHERE generalPractitioner = ?', npi);
	var rawStr = 'SELECT * FROM patient WHERE generalPractitioner = ?';
	var params:string[] = [npi];
	
	const result = callDb(rawStr, params);
	return result;
};

/**
 * Get list of practitioners by location
 * @param npi 
 * @returns 
 */
export const getPractitionersByLocation = async (location: string) => {
	// const result = await db.raw(`SELECT gp.first_name, gp.last_name, gp.npi, p.location 
	// FROM patient p 
	// INNER join generalPractitioner gp on p.generalPractitioner = gp.npi
	// WHERE p.location = ?`
	//, location);
	// const result = await db.raw(`SELECT gp.first_name, gp.last_name, gp.npi, p.location 
	// FROM generalPractitioner gp 
	// INNER join patient p on p.generalPractitioner = gp.npi AND p.location = ?`, location);
	
	var rawStr = `SELECT gp.first_name, gp.last_name, gp.npi, p.location 
	FROM patient p 
	INNER join generalPractitioner gp on p.generalPractitioner = gp.npi
	WHERE p.location = ?`;
	var params:string[] = [location];
	const result = callDb(rawStr, params);
	return result;


	// subquery?
};

/**
 * Get list of appointments by date range
 * @param npi 
 * @returns 
 */
export const getAppointmentsByDateRange = async (startDate: string, endDate: string) => {
	//const result = await db.raw('SELECT * FROM patient WHERE appointment BETWEEN ? AND ?', [startDate, endDate]);
	var rawStr = 'SELECT * FROM patient WHERE appointment BETWEEN ? AND ?';
	var params:string[] = [startDate, endDate];
	
	const result = callDb(rawStr, params);
	return result;
};


export const getListOfPatientsByFirstLastAndOrBirthday = async (query: ParsedQs) => {
	var rawStr = 'SELECT * FROM patient WHERE first_name = ? AND last_name = ?';
	// create param array
// validate: undefined, null, empty string

	if (query.birthDate != null)
	{
		rawStr += 'AND birth_date = ?';
		return await db.raw(rawStr, [query.firstname, query.lastname, query.birthDate]);
	}
	
	return await db.raw(rawStr, [query.firstname, query.lastname]);
};

const callDb = async (queryString: string, params: string[]) =>
{
	try {
		var result = await db.raw(queryString, params);

		// If results empty, return "No data found"
		if(result != null)
		{
			return "No Data Found";
		}

		return result;
	}
	catch(err)
	{
		console.log("Error");
		console.log(err);
		return "Sorry - there's some error"
	}
}
