import ShowListingType from '../types/ShowListingType';
import { Listing } from '../../data/models';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const showListing = {

  type: ShowListingType,

  args: {
    listId: { type: new NonNull(StringType) },
  },

  async resolve({ request }, { listId }) {
    if(request.user) {

      let userId = request.user.id;
      
      const listingData = await Listing.find({
        where: {
          id: listId,
          userId,
        },
      });
  
      return listingData;
    }
    // Get All Listing Data
    

  },
};

export default showListing;
