var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(25);
import sequelize from '../../data/sequelize';
import { WishList, Listing } from '../../data/models';

const updateListStatus = app => {

    
    new CronJob('0 0 1-23 * * *', async function () { // Run every day on 1.00 AM, 11.00 PM and every one hour between 1.00 AM and 11.00 PM

        console.log("/********************************************/");
        console.log("HOLY MOLY UPDATE LIST STATUS CRON STARTED");

        // get all reservation id
        const getListIds = await Listing.findAll({
            attributes: ['id', 'isPublished']
        });

        // Update Reservation Status to completed
        if (getListIds != null && getListIds.length > 0) {
            getListIds.map(async (item) => {
                await AllowedLimit();
                // Get ThreadId
                let updateListingStatus = await WishList.update({
                    isListActive: item.isPublished
                }, {
                    where: {
                        listId: item.id
                    }
                });
            })
        }

        console.log("HOLY MOLY UPDATE LIST STATUS CRON COMPLETED");
        console.log("/********************************************/");


    }, null, true, 'America/Los_Angeles');

};

export default updateListStatus;