import moment from 'moment';
import DataType from 'sequelize';
import Model from '../sequelize';

const Reservation = Model.define('Reservation', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    hostId: {
        type: DataType.STRING,
        allowNull: false
    },

    guestId: {
        type: DataType.STRING,
        allowNull: false
    },

    checkIn: {
        type: DataType.DATEONLY,
        allowNull: false,
        get: function () {
            return this.getDataValue('checkIn') ? moment.utc(this.getDataValue('checkIn')).format('YYYY-MM-DD') : null;
        }
    },

    checkOut: {
        type: DataType.DATEONLY,
        allowNull: false,
        get: function () {
            return this.getDataValue('checkOut') ? moment.utc(this.getDataValue('checkOut')).format('YYYY-MM-DD') : null;
        }
    },

    guests: {
        type: DataType.INTEGER,
        defaultValue: 1,
    },

    message: {
        type: DataType.TEXT,
    },

    basePrice: {
        type: DataType.FLOAT,
        allowNull: false,
    },

    cleaningPrice: {
        type: DataType.FLOAT,
    },

    currency: {
        type: DataType.STRING,
        allowNull: false,
    },

    discount: {
        type: DataType.FLOAT,
    },

    discountType: {
        type: DataType.STRING,
    },

    guestServiceFee: {
        type: DataType.FLOAT,
    },

    hostServiceFee: {
        type: DataType.FLOAT,
    },

    total: {
        type: DataType.FLOAT,
        allowNull: false,
    },

    confirmationCode: {
        type: DataType.INTEGER,
    },

    payoutId: {
        type: DataType.INTEGER,
    },

    reservationState: {
        type: DataType.ENUM('pending', 'expired', 'approved', 'declined', 'completed', 'cancelled'),
        defaultValue: 'pending',
    },

    paymentState: {
        type: DataType.ENUM('pending', 'completed'),
        defaultValue: 'pending',
    },

    paymentMethodId: {
        type: DataType.INTEGER
    },

    cancellationPolicy: {
        type: DataType.INTEGER,
    },

    isSpecialPriceAverage: {
        type: DataType.FLOAT,
    },

    dayDifference: {
        type: DataType.FLOAT,
    },

    paymentIntentId: {
        type: DataType.STRING,
    },
    isHold: {
        type: DataType.BOOLEAN,
        defaultValue: '0'
    },
    paymentAttempt: {
        type: DataType.INTEGER
    },
    taxRate: {
        type: DataType.FLOAT,
    },
    checkInStart: {
        type: DataType.STRING
    },
    checkInEnd: {
        type: DataType.STRING
    },
    hostServiceFeeType: {
        type: DataType.STRING
    },
    hostServiceFeeValue: {
        type: DataType.FLOAT,
    },
    bookingType: {
        type: DataType.STRING
    }
});

export default Reservation; 