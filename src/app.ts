import debug = require('debug');
import * as express from "express";
import { Configuration } from "./Common/Configuration";

Configuration.initialize();

import routes from './routes/index';
import seasons from "./routes/seasons";

const app = express();
const port = Configuration.port;

app.use('/', routes);
app.use('/seasons', seasons);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', port);

const server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
