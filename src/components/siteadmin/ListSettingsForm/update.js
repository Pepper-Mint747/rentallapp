// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';

// Redux
import { closeListSettingsModal } from '../../../actions/siteadmin/modalActions';
import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';

async function update(values, dispatch) {

  const query = `
    query (
        $id:Int,
        $typeId:Int,
        $itemName:String,
        $itemDescription:String,
        $otherItemName:String,
        $maximum:Int,
        $minimum:Int,
      	$startValue:Int,
        $endValue:Int,
        $isEnable: String,
        $image: String
      ) {
          updateListSettings (
            id: $id,
            typeId:$typeId,
            itemName:$itemName,
            itemDescription:$itemDescription,
            otherItemName: $otherItemName,
            maximum: $maximum,
            minimum: $minimum,
            startValue: $startValue,
            endValue: $endValue,
            isEnable: $isEnable,
            image: $image
          ) {
            status
          }
        }
  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.updateListSettings.status === "success") {
    dispatch(closeListSettingsModal());
    await dispatch(getAdminListingSettings(values.typeId));
    toastr.success("Update List Settings", "The list setting has been updated successfully!");
  } else if(data.updateListSettings.status === "unableToDisable") {
    toastr.error("Update List Settings", "Unable to disable the list setting. At least, one list setting should be active.");
  } else if(data.updateListSettings.status === "listingUsed") {
    toastr.error("Update List Settings", "Unable to disable the list setting. The list setting is using on the property. Please remove the list setting on the properties and try again.");
  } else {
    toastr.error("Update List Settings", "Oops! Something went wrong. Please try again.");
  }

}

export default update;
