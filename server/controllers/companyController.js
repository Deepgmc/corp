const companyS = require('../services/companyService')
const authS = require('../services/authService.js')
const messages = require('../MESSAGES')

const save_error = {
    error: true,
    message: messages.SAVE_ERROR
}
const save_success = {
    error: false,
    message: ''
}

const companyService = new companyS()
const authService = new authS()

const saveUserCompany = async function (req, res, next) {

    const token = req.headers.token ?? req.body.token
    //TODO CHECK TOKEN (req.body.token) так же запихнуть в целом всю проверку в одно место!

    user = await authService.findUserByToken(token)
    if(!user){
        res.send({error: true, message: messages.USER_NOT_FOUND})
        return
    }

    const result = await companyService.saveUserCompany(req.body.data, user)
    if(result.error) {
        save_error.message = result.message
        res.send(save_error)
    } else res.send(save_success)
}

const saveNewDepartment = async function (req, res, next) {
    try {
        await companyService.saveNewDepartment(req.body.data)
        res.send(save_success)
    } catch (error){
        res.send(save_error)
    }
}
const saveNewPosition = async function (req, res, next) {
    try {
        await companyService.saveNewPosition(req.body.data)
        res.send(save_success)
    } catch (error){
        res.send(save_error)
    }
}

const saveNewEmployee = async function (req, res, next) {
    try {
        await companyService.saveNewEmployee(req.body.data)
        res.send(save_success)
    } catch (error){
        res.send(save_error)
    }
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