import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
} from 'graphql';

const FailedTransactionHistoryType = new ObjectType({
    name: 'FailedTransactionHistory',
    fields: {
        id: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        userId: {
            type: ID
        },
        amount: {
            type: FloatType
        },
        reason: {
            type: StringType
        },
        transactionId: {
            type: IntType
        },
        paymentMethodId: {
            type: IntType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default FailedTransactionHistoryType;