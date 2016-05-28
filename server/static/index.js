const express = require('express');
const router = express.Router();
const path = require('path');

const publicPath = path.join(__dirname, '../../public');
const nodeModulesPath = path.join(__dirname, '../../node_modules');
const clientPath = path.join(__dirname, '../../client');

router.use(express.static(publicPath));
router.use(express.static(nodeModulesPath));
router.use(express.static(clientPath));

module.exports = router;
