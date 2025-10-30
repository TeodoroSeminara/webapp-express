function pathImage(req, res, next) {
    req.pathImage = `${req.protocol}://${req.get('host')}/img/`;
    next()
}

module.exports = pathImage;