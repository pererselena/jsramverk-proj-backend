'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    const data = {
        data: {
            title: "Min me-sida i kursen jsramverk",
            /* eslint max-len: [1, 600, 4] */
            msg: `test`
        }
    };

    res.json(data);
});

module.exports = router;
