import { IEmpListItem, FnType } from '@/types/globalTypes'

export function employeeListColumns(timestampToNumbers: FnType) {
    return [
        {
            field  : 'fio',
            caption: 'ФИО',
            sorting: {
                field    : 'fio',
                type     : 'string',
                direction: -1
            },
            action : null,
        },
        {
            field  : 'departmentPositionName',
            caption: 'Отдел/должность',
            sorting: null,
            action : (slotParams: IEmpListItem) => {
                return `<div>${slotParams.item.departmentName}</div><div>${slotParams.item.positionName}</div>`
            },
        },
        {
            field   : 'employeeContacts',
            caption: 'Контакты',
            sorting: null,
            action : (slotParams: IEmpListItem) => {
                return `<div>${slotParams.item.employeePhone}</div><div>${slotParams.item.employeeEmail}</div>`
            },
        },
        {
            field  : 'employeeSalary',
            caption: 'Месячная оплата',
            sorting: {
                field    : 'employeeSalary',
                type     : 'number',
                direction: -1
            },
            action : null
        },
        {
            field  : 'hireDate',
            caption: 'Начало работы',
            sorting: null,
            action : (slotParams: IEmpListItem) => {
                if(timestampToNumbers) return timestampToNumbers(slotParams.item.hireDate, 'ru')
            },
        },
    ]
}