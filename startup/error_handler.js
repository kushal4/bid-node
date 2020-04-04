module.exports = function(app) {
    app.use(function(err, req, res, next) {
        // Do logging and user-friendly error message display
        console.error(err);
        res.status(500).send('internal server error');
    });
}