const companyS = require('../services/companyService')
const authS = require('../services/authService.js')

const saveUserCompany = async function (req, res, next) {
    const companyService = new companyS()
    const authService = new authS()

    const token = req.headers.token ?? req.body.token
    //TODO CHECK TOKEN (req.body.token) так же запихнуть в целом всю проверку в одно место!

    user = await authService.findUserByToken(token)
    if(!user){
        throw new Error('Пользователь с таким токеном не найден')
    }

    await companyService.saveUserCompany(req.body.data, user)
    res.send({error: false, message: 'Saved success'})
}

const getUserCompany = async function (req, res, next) {
    const companyService = new companyS()
    const authService = new authS()

    const token = req.headers.token ?? req.body.token
    //TODO CHECK TOKEN (req.body.token) так же запихнуть в целом всю проверку в одно место!

    user = await authService.findUserByToken(token)
    if(!user){
        throw new Error('Пользователь с таким токеном не найден')
    }
    const company = await companyService.getUserCompany(user.company_id)
    console.log('Found company: ', company)

    res.send({company: company})
}

module.exports = {
    saveUserCompany,
    getUserCompany
}