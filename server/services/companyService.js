const Service = require('./service')

class companyService extends Service {

    async createCompany({companyName, companyAddress}, user){
        const result = await this.createCompanyQuery({companyName: companyName, companyAddress: companyAddress})
        await this.updateUserCompanyId(result.insertId, user.id)
        return true
    }

    async saveUserCompany({name, address}, user){
        let company, result
        if(!user.companyId){
            /** если у юзера еще нет компании - создадим её */
            result = await this.createCompany({companyName: name, companyAddress: address}, user)
            return result
        } else {
            /** компания уже была создана ранее - обновим её данные */
            company = await this.findUserCompany(user.companyId)
            if(company && typeof company.id !== 'undefined'){
                result = await this.updateCompanyData(name, address, company.id)
            } else {
                result = await this.createCompany({companyName: name, companyAddress: address}, user)
            }
            return result
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
            this._connection.query('UPDATE users SET companyId = ? WHERE id = ?', [companyId, userId], (error, rows) => {
                if(error) reject(error)
                resolve(rows)
            })
        })
    }

    async createCompanyQuery({companyName, companyAddress}){
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
    }

    async getUserCompany(companyId){
        if(!companyId) return {}
        const company = await this.findUserCompany(companyId)
        if(!company || typeof company.id === 'undefined'){
            throw new Error('Компания не найдена')
        }
        company.departments = await this.findCompanyDepartments(companyId)
        company.employees = await this.findCompanyEmployees(companyId)
        company.positions = await this.findCompanyPositions(companyId)
        return company
    }

    async findCompanyDepartments(companyId){
        return new Promise((resolve, reject) => {
            this._connection.query('SELECT * FROM departments WHERE companyId = ?', companyId, (error, rows) => {
                if(error) reject(error)
                resolve(rows)
            })
        })
    }
    async findCompanyEmployees(companyId){
        return new Promise((resolve, reject) => {
            this._connection.query('SELECT * FROM employee WHERE companyId = ?', companyId, (error, rows) => {
                if(error) reject(error)
                resolve(rows)
            })
        })
    }
    async findCompanyPositions(companyId){
        return new Promise((resolve, reject) => {
            this._connection.query('SELECT * FROM positions WHERE companyId = ?', companyId, (error, rows) => {
                if(error) reject(error)
                resolve(rows)
            })
        })
    }

    saveNewDepartment(data){
        return new Promise((resolve, reject) => {
            this._connection.query('INSERT INTO departments (name, companyId) VALUES (?, ?)', [data.deptName, data.companyId], (error, insertResult) => {
                if(error) reject(error)
                resolve(insertResult)
            })
        })
    }

    saveNewPosition(data){
        return new Promise((resolve, reject) => {
            this._connection.query('INSERT INTO positions (name, companyId, departmentId) VALUES (?, ?, ?)', [data.positionName, data.companyId, data.departmentId], (error, insertResult) => {
                if(error) reject(error)
                resolve(insertResult)
            })
        })
    }

    saveNewEmployee(employeeData){
        return new Promise((resolve, reject) => {
            this._connection.query(`
                    INSERT INTO employee
                    (create_time, fio, companyId, departmentId, positionId, hireDate, employeeBirthday, employeePhone, employeeEmail, employeeAddress, passportSerial, passportPlace, innNumber, snilsNumber, empRecordNumber, employeeSalary)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    this.getTimestamp(),
                    employeeData.employee.fio,
                    employeeData.employee.companyId,
                    employeeData.employee.departmentId,
                    employeeData.employee.positionId,
                    employeeData.employee.hireDate,
                    employeeData.employee.employeeBirthday,
                    employeeData.employee.employeePhone,
                    employeeData.employee.employeeEmail,
                    employeeData.employee.employeeAddress,
                    employeeData.employee.passportSerial,
                    employeeData.employee.passportPlace,
                    employeeData.employee.innNumber,
                    employeeData.employee.snilsNumber,
                    employeeData.employee.empRecordNumber,
                    employeeData.employee.employeeSalary,
                ],
                (error, insertResult) => {
                    if(error) reject(error)
                    resolve(insertResult)
                })
        })
    }

    findCompanyByIdQuery(companyId, callback){
        this._connection.query('SELECT * FROM company WHERE id = ? LIMIT 1', companyId, callback)
    }

}

module.exports = companyService