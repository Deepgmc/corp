const Service = require('./service')

class companyService extends Service {

    async saveUserCompany({companyName, companyAddress}, user){
        return new Promise((resolve, reject) => {
            this.findCompanyByIdQuery(user.company_id, (error, rows) => {
                if(error) reject(error)
                const company = rows[0]
            })
        })
        .catch((error) => {

        })
    }

    findCompanyByIdQuery(companyId, callback){
        this._connection.query('SELECT * FROM company WHERE id = ? LIMIT 1', companyId, callback)
    }

}

module.exports = companyService