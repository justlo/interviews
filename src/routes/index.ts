import { Router } from 'express';
import { getHealthStatus } from '../services/healthService';
import {getPatientByMrn} from '../services/patientService';
import {getPatientsByPractitioner} from '../services/patientService';
import {getPractitionersByLocation} from '../services/patientService';
import {getAppointmentsByDateRange} from '../services/patientService';
import {getListOfPatientsByFirstLastAndOrBirthday
} from '../services/patientService';

export const router = Router({});

/**
 * A health check that uses an optional query parameter
 */
router.get('/health', async (req, res) => {
	res.json(await getHealthStatus(req.query.status?.toString()));
});

/**
 * Find patient by their mrn
 */
router.get('/mrn/:mrn', async (req, res) => {
	res.json(await getPatientByMrn(req.params.mrn));
})

/**
 * Find list of patients by practitioner's npi
 */
router.get('/npi/:npi', async (req, res) => {
	res.json(await getPatientsByPractitioner(req.params.npi));
})

/**
 * Find list of practitioners by location
 */
router.get('/location/:location', async (req, res) => {
	res.json(await getPractitionersByLocation(req.params.location));
})

/**
 * Find list of appointments by date range
 */
router.get('/appointments', async (req, res) => {
	if (req.query.startDate != null && req.query.endDate != null)
	{
		res.json(await getAppointmentsByDateRange(req.query.startDate.toString(), req.query.endDate.toString()));

	}

	res.json("Missing start and/or end date");
})

/**
 * Find list of patients by first name, last name, and/or birthdate
 */
router.get('/patients', async (req, res) => {
	
	//res.json(await getListOfPatientsByFirstLastAndOrBirthday(req.query.firstName?.toString(), req.query.lastName, req.query.birthDate));
	res.json(await getListOfPatientsByFirstLastAndOrBirthday(req.query));

})

