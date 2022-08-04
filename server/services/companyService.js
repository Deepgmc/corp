const Service = require('./service')

class companyService extends Service {

    async saveUserCompany({name, address}, user){
        let company, result
        if(!user.company_id){
            /** если у юзера еще нет компании - создадим её */
            result = await this.createCompany({companyName: name, companyAddress: address})
            result = await this.updateUserCompanyId(result.insertId, user.id)
            return true
        } else {
            /** компания уже была создана ранее - обновим её данные */
            company = await this.findUserCompany(user.company_id)
            result = await this.updateCompanyData(name, address, company.id)
            return true
        }
    }

    async updateCompanyData(companyName, companyAddress, companyId){
        return new Promise((resolve, reject) => {
            this._connection.query('UPDATE company SET name = ?, address = ? WHERE id = ?', [companyName, companyAddress, companyId], (error, rows) => {
                if(error) reject(error)
                resolve(rows)
            })
        })
    }

    async updateUserCompanyId(companyId, userId){
        return new Promise((resolve, reject) => {
            this._connection.query('UPDATE users SET company_id = ? WHERE id = ?', [companyId, userId], (error, rows) => {
                if(error) reject(error)
                resolve(rows)
            })
        })
    }

    async createCompany({companyName, companyAddress}){
        return new Promise((resolve, reject) => {
            this._connection.query('INSERT INTO company (name, address) VALUES (?, ?)', [companyName, companyAddress], (error, rows) => {
                if(error) reject(error)
                resolve(rows)
            })
        })
    }

    async findUserCompany(companyId){
        return new Promise((resolve, reject) => {
            this.findCompanyByIdQuery(companyId, (error, rows) => {
                if(error) reject(error)
                resolve(rows[0])
            })
        })
        .catch((error) => {

        })
    }

    async getUserCompany(companyId){
        if(!companyId) return {}
        return await this.findUserCompany(companyId)
    }

    saveNewDepartment(data){
        return new Promise((resolve, reject) => {
            this._connection.query('INSERT INTO departments (name, companyId) VALUES (?, ?)', [data.deptName, data.companyId], (error, rows) => {
                if(error) reject(error)
                resolve('Department saved')
            })
        })
    }

    findCompanyByIdQuery(companyId, callback){
        this._connection.query('SELECT * FROM company WHERE id = ? LIMIT 1', companyId, callback)
    }

}

module.exports = companyService