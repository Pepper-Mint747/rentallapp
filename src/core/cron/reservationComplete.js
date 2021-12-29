var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(10);
import sequelize from '../../data/sequelize';
import { Reservation, ThreadItems, SiteSettings } from '../../data/models';
import { emailBroadcast } from './completedEmail';

const reservationComplete = app => {
	new CronJob('0 55 23 * * *', async function () { // Run every day on 11.55 PM
		console.log("/********************************************/");
		console.log("HOLY MOLY RESERVATION COMPLETE CRON STARTED");

		try {
			let emailLogo;
			// get all reservation id
			const getReservationIds = await Reservation.findAll({
				attributes: ['id', 'hostId', 'checkIn', 'checkOut', 'guests'],
				where: {
					checkOut: {
						$lte: sequelize.literal('CURDATE()')
					},
					reservationState: 'approved'
				},
				raw: true
			});

			// Update Reservation Status to completed
			if (getReservationIds != null && getReservationIds.length > 0) {
				const getEmailLogo = await SiteSettings.findOne({
					attributes: ['value'],
					where: {
						title: 'Email Logo'
					},
					raw: true
				});

				emailLogo = getEmailLogo && getEmailLogo.value;
				
				getReservationIds.map(async (item) => {

					await AllowedLimit();

					// Get ThreadId
					let getThreadId = await ThreadItems.findOne({
						where: {
							reservationId: item.id
						}
					});

					// Create new ThreaItem for completion
					if (getThreadId) {
						await ThreadItems.create({
							threadId: getThreadId.threadId,
							sentBy: item.hostId,
							type: 'completed',
							startDate: item.checkIn,
							endDate: item.checkOut,
							personCapacity: item.guests,
							reservationId: item.id
						});
					}

					// Update Reservation Status
					let updateReservation = await Reservation.update({
						reservationState: 'completed'
					}, {
						where: {
							id: item.id
						}
					});

					await emailBroadcast(item.id, emailLogo);
				})
			}

			console.log("HOLY MOLY RESERVATION COMPLETE CRON COMPLETED");
			console.log("/********************************************/");
		} catch(error) {
			console.log("HOLY MOLY RESERVATION COMPLETE CRON ERROR");
			console.log("ERROR: ", error);
			console.log("/********************************************/");
		}
	}, null, true, 'America/Los_Angeles');
};

export default reservationComplete;