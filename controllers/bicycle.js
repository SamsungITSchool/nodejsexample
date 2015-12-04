/**
 * Created by raiym on 11/30/15.
 */
'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger();
var models = require("../models");
var Bicycle = models.Bicycle;

exports.create = function (req, res) {
    logger.info('In create action');
    var newBicycle = req.body;
    logger.info('Bicycle: ' + JSON.stringify(newBicycle));
    Bicycle.build(newBicycle).save().catch(function (err) {
        logger.error("Error occured");
        logger.error('Failed to save Bicycle: ' + err);
        res.status(500).json({error: 1, message: 'Failed to save Bicycle', data: null});
    }).then(function (createdBicycle) {
        logger.info('Bicycle saved: ' + JSON.stringify(createdBicycle));
        res.json({error: 0, message: 'Bicycle saved', data: createdBicycle});
    });
};

exports.get = function (req, res) {
    var location = {
        latitude: req.params.latitude,
        longitude: req.params.longitude
    };
    logger.info('Location: ' + JSON.stringify(location));

    var sql = 'select *, round((point(latitude, longitude) <@> point(:latitude, :longitude))::numeric, 3) as distance from tbl_Bicycle order by point(latitude, longitude) <-> point(:latitude, :longitude) LIMIT 10';
    models.sequelize.query(sql,
        {
            replacements: {latitude: location.latitude, longitude: location.longitude},
            type: models.sequelize.QueryTypes.SELECT
        }
    ).catch(function (err) {
        if (err) {
            logger.error('Failed to get nearest bicycles: ' + err);
            res.status(500).json({error: 1, message: 'Failed to get nearest bicycles', data: null});
        }
    }).then(function (bicycles) {
        logger.info('Nearest bicycles: ' + JSON.stringify(bicycles));
        res.json({error: 0, message: '10 nearest Bicycles', data: bicycles});
    });
};

exports.parse = function (req, res) {
    var fs = require('fs');
    fs.readFile('bicycles.json', 'utf8', function (err,cycles) {
        if (err) {
            logger.error('Error: ' + cycles);
            res.status(500).json({error:1, message:'', data:null});
            return;

        }
        cycles = JSON.parse(cycles);
        cycles.forEach(function (cycle) {
            var newCycle = {
                description : cycle.Cells.Name,
                longitude: cycle.Cells.Longitude_WGS84,
                latitude: cycle.Cells.Latitude_WGS84,
                findDescription: cycle.Cells.Address
            };
            Bicycle.build(newCycle).save().then(function (saveCycle) {
                logger.info(JSON.stringify(saveCycle));
            });
        });
    })
};