var ical = require('ical');
import { findURL, storeCalendar } from './dbFunctions';
import { getDates } from '../../helpers/dateRange';
const axios = require('axios');

const iCalRoutes = app => {

	app.post('/import-calendar', async function (req, res) {

		if (!req.user) {
			res.redirect('/');
		} else {
			const listId = req.body.data.listId;
			const url = req.body.data.url;
			const name = req.body.data.name;
			const calendarId = req.body.data.calendarId;
			const toSearch = ["text/calendar", "application/octet-stream", "application/ics"];
			const toSearchHtml = "text/html";

			if (!calendarId) {
				const isURLAvailable = await findURL(url, listId);
				if (isURLAvailable) {
					res.send({ status: 409 });
					return;
				}
			}

			axios.get(url).then(async (response) => {
				// handle success
				if (response && response.data) {
					var contentType = response.headers['content-type'];
					contentType = contentType.includes(";") ? contentType.split(";")[0] : contentType;
					var dataIndex = toSearch.indexOf(contentType); var dataIndexHtml = contentType.search(toSearchHtml);

					if (dataIndex > -1 || dataIndexHtml > -1) {
						var calendarData, calendarDataId;
						if (!calendarId) {
							calendarData = await storeCalendar(url, listId, name);
							calendarDataId = calendarData.id;
						} else {
							calendarDataId = calendarId;
						}
						var data = ical.parseICS(response.data);
						var blockedDateCollection = [];
						for (var k in data) {
							if (data.hasOwnProperty(k)) {
								var ev = data[k];
								if (ev.start && ev.end) {
									// if (ev.start.getDate() === ev.end.getDate()) {
									if (ev.start.getDate() === ev.end.getDate() && ev.start.getFullYear() === ev.end.getFullYear() && ev.start.getMonth() === ev.end.getMonth()) {
										blockedDateCollection.push(ev.start);
									} else {
										var range = getDates(ev.start, ev.end);
										range.map(async (item) => {
											blockedDateCollection.push(item);
										});
									}
								}
							}
						}
						res.send({ status: 200, blockedDates: blockedDateCollection, calendarDataId });

					} else {
						res.send({ status: 400 });
						return;
					}

				} else {
					res.send({ status: 400 });
					return;
				}
			}).catch((error) => {
				res.send({ status: 400 });
				return;
			});
		}
	})
};

export default iCalRoutes;