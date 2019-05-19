import debug = require('debug');
import * as express from "express";
import { Configuration } from "./Common/Configuration";
import { IDataProvider } from './DataProviders/IDataProvider';
import { SqlDataProvider } from './DataProviders/SqlDataProvider/SqlDataProvider';
import { HomeController } from './Routes/HomeController';
import { SeasonsController } from "./Routes/SeasonsController";

Configuration.initialize();

// TODO: Use DI
const dataProvider: IDataProvider = new SqlDataProvider(Configuration.dbConnectionString);
const homeController = new HomeController();
const seasonsController = new SeasonsController(dataProvider);

const app = express();
const port = Configuration.port;

app.use('/', homeController.router);
app.use('/seasons', seasonsController.router);

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
