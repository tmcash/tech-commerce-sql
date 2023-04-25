import { Model, DataTypes } from 'sequelize';

import sequelize from '../config/connection.js';

class Tag extends Model {}

Tag.init(
{
  
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    },
    tag_name: {
    type: DataTypes.STRING
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
}
);

export default Tag;