import moment from 'moment';
import DataType from 'sequelize';
import Model from '../sequelize';

const ThreadItems = Model.define('ThreadItems', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    threadId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    reservationId: {
        type: DataType.INTEGER,
    },

    sentBy: {
        type: DataType.STRING,
        allowNull: false
    },

    content: {
        type: DataType.TEXT,
    },

    isRead: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },

    type: {
        type: DataType.ENUM('message', 'inquiry', 'preApproved', 'declined', 'approved', 'pending', 'cancelledByHost', 'cancelledByGuest', 'intantBooking', 'requestToBook', 'confirmed', 'expired', 'completed'),
        defaultValue: 'message',
    },

    startDate: {
        type: DataType.DATEONLY,
        get: function () {
            return this.getDataValue('startDate') ? moment.utc(this.getDataValue('startDate')).format('YYYY-MM-DD') : null;
        }
    },

    endDate: {
        type: DataType.DATEONLY,
        get: function () {
            return this.getDataValue('endDate') ? moment.utc(this.getDataValue('endDate')).format('YYYY-MM-DD') : null;
        }
    },

    personCapacity: {
        type: DataType.INTEGER,
    }
});

export default ThreadItems;   