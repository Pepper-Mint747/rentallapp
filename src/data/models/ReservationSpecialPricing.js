import moment from 'moment';
import DataType from 'sequelize';
import Model from '../sequelize';

const ReservationSpecialPricing = Model.define('ReservationSpecialPricing', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  listId: {
    type: DataType.INTEGER,
  },
  reservationId: {
    type: DataType.INTEGER,
  },
  blockedDates: {
    type: DataType.DATEONLY,
    allowNull: false,
    get: function () {
      return this.getDataValue('blockedDates') ? moment.utc(this.getDataValue('blockedDates')).format('YYYY-MM-DD') : null;
    }
  },
  isSpecialPrice: {
    type: DataType.FLOAT
  }

});

export default ReservationSpecialPricing;
