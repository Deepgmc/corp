const logoutController = function (req, res, next) {
    req.session.destroy(function(error) {
        return res.redicrect('/login')
    })
}

module.exports = logoutController