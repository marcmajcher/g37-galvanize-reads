"use strict";

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.get('/', (req, res) => {
    knex('books')
        .then((books) => {
            res.send(books);
        });
});

module.exports = router;
