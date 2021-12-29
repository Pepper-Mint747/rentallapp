import { 
    ListSettings, UserListingData, UserAmenities, 
    UserSafetyAmenities, UserHouseRules, ListingData, UserSpaces
} from '../data/models';

async function checkListSettingsActivity(typeId, id) {
    let status, UserListingDataTable = [1, 3, 4, 7, 9];

    // Checking all the list settings are disabled or not
    const findActiveSettingsCount = await ListSettings.count({
        where: {
          typeId,
          isEnable: 1,
          id: {
            $ne: id
          }
        }
      });

      if (findActiveSettingsCount === 0) {
        status = 'unableToDisable';
      } else { // Check the list setting mapping with the listing
        if (UserListingDataTable.indexOf(typeId) >= 0) { // ListingData
            const checkUserListingDataTable = await UserListingData.count({
                where: {
                    settingsId: id
                }
            });
            status = checkUserListingDataTable > 0 ? 'listingUsed' : status;
        } else if (typeId === 10) { // Amenities
            const checkAmenitiesTable = await UserAmenities.count({
                where: {
                    amenitiesId: id
                }
            });
            status = checkAmenitiesTable > 0 ? 'listingUsed' : status;
        } else if (typeId === 11) { // SafetyAmenties
            const checkSafetyAmenitiesTable = await UserSafetyAmenities.count({
                where: {
                    safetyAmenitiesId: id
                }
            });
            status = checkSafetyAmenitiesTable > 0 ? 'listingUsed' : status;
        } else if (typeId === 12) { // Shared Spaces
            const checkSharedSpacesTable = await UserSpaces.count({
                where: {
                    spacesId: id
                }
            });
            status = checkSharedSpacesTable > 0 ? 'listingUsed' : status; 
        } else if (typeId === 14) { // HouseRules
            const checkHouseRulesTable = await UserHouseRules.count({
                where: {
                    houseRulesId: id
                }
            });
            status = checkHouseRulesTable > 0 ? 'listingUsed' : status;
        } else {
            const checkListingDataTable = await ListingData.count({
                where: {
                    bookingNoticeTime: id
                }
            });
            status = checkListingDataTable > 0 ? 'listingUsed' : status;
        }
      }

      return await status;
}

export default checkListSettingsActivity;