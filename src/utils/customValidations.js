export const ONLY_LETTERS = 'Только буквы'
export const MAX_LENGTH = 'Длина не более'
export const MIN_LENGTH = 'Длина не менее'
export const REQUIRED = 'Обязательное поле'

export function onlyWords(value) {
    //нет цифр
    return !/\d/.test(value)
}