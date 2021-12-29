import SideMenuType from '../../types/siteadmin/SideMenuType';
import { SideMenu } from '../../../data/models';

import {
    GraphQLString as StringType
} from 'graphql';

const updateSideMenu = {

    type: SideMenuType,

    args: {
        blockTitle1: { type: StringType },
        blockContent1: { type: StringType },
        blockTitle2: { type: StringType },
        blockContent2: { type: StringType },
        blockTitle3: { type: StringType },
        blockContent3: { type: StringType },
        isEnable: { type: StringType }
    },

    async resolve({ request }, {
        blockTitle1,
        blockContent1,
        blockTitle2,
        blockContent2,
        blockTitle3,
        blockContent3,
        isEnable
    }) {

        if (request.user && request.user.admin == true) {
            let isStaticBlockSettingsUpdated = false;

            // Block 1 Info
            // if (blockTitle1 && blockContent1 && blockImage1) {
            const updateBlock1 = await SideMenu.update({ title: blockTitle1, description: blockContent1 }, { where: { name: 'block1' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });
            // }

            // Block 2 Info
            // if (blockTitle2 && blockContent2 && blockImage2) {
            const updateBlock2 = await SideMenu.update({ title: blockTitle2, description: blockContent2 }, { where: { name: 'block2' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });
            // }

            // Block 2 Info
            // if (blockTitle2 && blockContent2 && blockImage2) {
                const updateBlock3 = await SideMenu.update({ title: blockTitle3, description: blockContent3 }, { where: { name: 'block3' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

                return {
                    status: 'success'
                } 

        } else {
            return {
                status: 'failed'
            }
        }

    },
};

export default updateSideMenu;
