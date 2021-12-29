import ShowListingType from '../types/ShowListingType';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLString as StringType,
} from 'graphql';
import { Listing, UserProfile } from '../models';

const checkListing = {
    type: ShowListingType,

    args: {
        id: { type: new NonNull(IntType) },
        type: { type: StringType }
    },

    async resolve({ request }, { id, type }) {

        if (request.user) {
            let isCurrentUser = false;
            if(type == 'listing'){
                const getList = await Listing.findOne({
                    attributes: ['id'],
                    where: {
                        id: id,
                        userId: request.user.id
                    }
                });
    
                isCurrentUser = getList && getList.id == id ? true : false;
            }


            if(type == 'profile'){
                const getProfile = await UserProfile.findOne({
                    attributes: ['profileId'],
                    where: {
                        profileId: id
                    }
                })
                isCurrentUser = getProfile && getProfile.profileId == id ? true : false;
            }
           
            
            if(isCurrentUser) {
                return {
                    status: '200'
                }
            } else {
                return {
                    status: '400'
                }
            }

        } else {
            return {
                status: 500
            }
        }

    }
}

export default checkListing;