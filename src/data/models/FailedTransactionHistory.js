import DataType from 'sequelize';
import Model from '../sequelize';

const FailedTransactionHistory = Model.define('FailedTransactionHistory', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    reservationId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    userId: {
        type: DataType.UUID,
        allowNull: false
    },

    amount: {
        type: DataType.FLOAT,
        allowNull: false,
    },

    currency: {
        type: DataType.STRING,
        allowNull: false,
    },

    reason: {
        type: DataType.TEXT,
        allowNull: false
    },

    transactionId: {
        type: DataType.STRING,
    },

    paymentMethodId: {
        type: DataType.INTEGER
    }
});

export default FailedTransactionHistory;