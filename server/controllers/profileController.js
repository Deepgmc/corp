const profileS = require('../services/profileService')
const authS = require('../services/authService.js')

const saveUserProfile = async function (req, res, next) {
    const profileService = new profileS()
    const newUser = req.body.data.user
    const settings = req.body.data.settings

    const authService = new authS()
    const token = req.headers.token ?? req.body.token

    const foundUser = await authService.findUserByToken(token)

    Promise.all([
        profileService.updateUserData(newUser, foundUser),
        profileService.updateProfileData(settings, foundUser)
    ])
    .then((result) => {
        res.send({error: false, message: 'Успешно сохранено'})
    })
    .catch((error) => {
        console.log(error)
    })


}

module.exports = {
    saveUserProfile
}