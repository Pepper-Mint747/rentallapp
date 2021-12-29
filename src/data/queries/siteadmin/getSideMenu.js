import SideMenuType from '../../types/siteadmin/SideMenuType';
import { SideMenu } from '../../../data/models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
} from 'graphql';

const getSideMenu = {

    type: new List(SideMenuType),

    args: {
        name: { type: StringType },
    },

    async resolve({ request }, { name }) {

        let staticBlockData;

        if (name) {
            // Get Specific Info of Block Data
            staticBlockData = await SideMenu.findAll({
                attributes: [
                    'id',
                    'title',
                    'description',
                    'name',
                    'step',
                    'page',
                    'isEnable'
                ],
                where: {
                    name: name
                }
            });
        } else {
            // Get Specific Info of Block Data
            staticBlockData = await SideMenu.findAll({
                attributes: [
                    'id',
                    'title',
                    'description',
                    'name',
                    'step',
                    'page',
                    'isEnable'
                ],
            });
        }


        return staticBlockData;

    },
};

export default getSideMenu;
