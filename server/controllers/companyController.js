const companyS = require('../services/companyService')
const authS = require('../services/authService.js')

const companyService = new companyS()
const authService = new authS()

const saveUserCompany = async function (req, res, next) {

    const token = req.headers.token ?? req.body.token
    //TODO CHECK TOKEN (req.body.token) так же запихнуть в целом всю проверку в одно место!

    user = await authService.findUserByToken(token)
    if(!user){
        res.send({error: true, message: 'Пользователь с таким токеном не найден'})
        return
    }

    const result = await companyService.saveUserCompany(req.body.data, user)
    res.send({error: result.error, message: result.error ? result.message : 'save_success'})
}

const saveNewDepartment = async function (req, res, next) {
    const saveResult = await companyService.saveNewDepartment(req.body.data)
    res.send({error: false, message: saveResult})
}
const saveNewPosition = async function (req, res, next) {
    const saveResult = await companyService.saveNewPosition(req.body.data)
    res.send({error: false, message: saveResult})
}

const saveNewEmployee = async function (req, res, next) {
    const saveResult = await companyService.saveNewEmployee(req.body.data)
    res.send({error: false, message: saveResult})
}

const getUserCompany = async function (req, res, next) {

    const token = req.headers.token ?? req.body.token
    //TODO CHECK TOKEN (req.body.token) так же запихнуть в целом всю проверку в одно место!

    user = await authService.findUserByToken(token)
    if(!user){
        res.send({error: true, message: 'Пользователь с таким токеном не найден'})
        return
    }
    try {
        const company = await companyService.getUserCompany(user.companyId)
        res.send({company: company})
    } catch(error) {
        res.send({error: true, message: error.message})
    }
}

module.exports = {
    saveUserCompany,
    getUserCompany,
    saveNewDepartment,
    saveNewEmployee,
    saveNewPosition
}