export const BSP_ANSWERS = [
    'Yes',
    'No',
    'Maybe',
    'Probably',
    'Probably Not',
    'Definitely',
    'Definitely Not',
];

export const BSP_QUESTIONS = [
    'Is it going to rain today?',
    'Will I get a raise this year?',
    'Is paris the capital of France?',
    'Is the earth flat?',
    'Is the earth round?',
    'Is the earth a cube?'
];

export function get_random_element<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}