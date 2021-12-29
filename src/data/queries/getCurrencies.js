import {
  GraphQLString as StringType,
  GraphQLList as List
} from 'graphql';

import { Currencies } from '../../data/models';
import CurrenciesType from '../types/CurrenciesType';

const getCurrencies = {

  type: new List(CurrenciesType),

  args: {
    requestedFrom: { type: StringType }
  },

  async resolve({ request }, { requestedFrom }) {
    let where;

    if (requestedFrom != 'siteadmin') where = { isEnable: true }

    return await Currencies.findAll({
      where,
      order: [
        ['isBaseCurrency', 'DESC'],
      ]
    });

  },
};

export default getCurrencies;