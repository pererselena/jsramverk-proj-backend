'use strict';
const express = require("express");

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const index = require('./routes/index.js');
const auth = require('./src/auth.js');



const app = express();
const router = express.Router();
const port = 1337;

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

router.use('/', index);
router.post('/login', (req, res) => auth.login(res, req.body));
router.post('/register', (req, res) => auth.register(res, req.body));

app.use('/', router);





// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title": err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
const server = app.listen(port, () => console.log(`Trade API listening on port ${port}!`));

module.exports = server;
