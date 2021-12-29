import { updateSideMenuInfo } from '../../../actions/siteadmin/updateSideMenu';

async function submit(values, dispatch) {

	dispatch(
		updateSideMenuInfo(
      values
		)
	);
}
export default submit;
