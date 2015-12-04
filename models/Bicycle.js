/**
 * Created by raiym on 11/30/15.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Bicycle', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(511)
        },
        findDescription: {
            type: DataTypes.STRING(255)
        },
        latitude: {
            type: DataTypes.FLOAT
        },
        longitude: {
            type: DataTypes.FLOAT
        }
    }, {
        freezeTableName: true,
        tableName: 'tbl_bicycle'
    });
};