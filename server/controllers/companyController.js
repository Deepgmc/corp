const companyS = require('../services/companyService')
const authS = require('../services/authService.js')

const saveUserCompany = async function (req, res, next) {
    const companyService = new companyS()
    const authService = new authS()

    //TODO CHECK TOKEN (req.body.token)

    user = await authService.findUserByToken(req.body.token)
    console.log('saveUserCompany: found user ', user);

    const result = await companyService.saveUserCompany(req.body.data, user)
}

module.exports = {
    saveUserCompany
}