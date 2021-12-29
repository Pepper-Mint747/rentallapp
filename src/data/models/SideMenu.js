import DataType from 'sequelize';
import Model from '../sequelize';

const SideMenu = Model.define('SideMenu', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataType.STRING,
        allowNull: false
    },

    description: {
        type: DataType.TEXT,
        allowNull: false
    },

    name: {
        type: DataType.STRING
    },
    
    step: {
        type: DataType.INTEGER
    }, 

    page: {
        type: DataType.STRING
    },

    isEnable: {
        type: DataType.BOOLEAN,
        defaultValue: true
    }
});

export default SideMenu;