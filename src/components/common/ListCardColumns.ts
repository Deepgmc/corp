import { IEmpListItem, FnType } from '@/types/globalTypes'

export function employeeListColumns(timestampToNumbers: FnType) {
    return [
        {
            name   : 'fio',
            caption: 'ФИО',
            sorting: {
                type: 'string',
                direction: -1
            },
            action : null,
        },
        {
            name   : 'departmentPositionName',
            caption: 'Отдел/должность',
            sorting: null,
            action : (slotParams: IEmpListItem) => {
                return `<div>${slotParams.item.departmentName}</div><div>${slotParams.item.positionName}</div>`
            },
        },
        {
            name   : 'employeeContacts',
            caption: 'Контакты',
            sorting: null,
            action : (slotParams: IEmpListItem) => {
                return `<div>${slotParams.item.employeePhone}</div><div>${slotParams.item.employeeEmail}</div>`
            },
        },
        {
            name   : 'employeeSalary',
            caption: 'Месячная оплата',
            sorting: {
                type: 'number',
                direction: -1
            },
            action : null
        },
        {
            name   : 'hireDate',
            caption: 'Начало работы',
            sorting: null,
            action : (slotParams: IEmpListItem) => {
                if(timestampToNumbers) return timestampToNumbers(slotParams.item.hireDate, 'ru')
            },
        },
    ]
}