const Service = require('./service')


class profileService extends Service {

    async updateProfileData(settings, userId){
        console.log('Update settings: ', settings);
        return new Promise((resolve, reject) => {
            resolve('profile updated')
        })
    }

    async updateUserData(newUser, foundUser){
        const updatedUser = Object.assign(foundUser, newUser)
        return new Promise((resolve, reject) => {
            this._connection.query('UPDATE users SET ? WHERE id = ? LIMIT 1', [updatedUser, foundUser.id], (error, rows) => {
                if(error) reject(error)
                resolve(rows)
            })
        })


    }

}

module.exports = profileService