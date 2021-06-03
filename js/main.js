const ERROR_MESSAGE = 'Значения должны быть больше 0';

//Функция, возвращающая случайное целое число из переданного диапазона включительно. Диапазон может быть только положительный, включая ноль
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomNumber (min, max) {
  if (min < 0 || max < 0) {
    return ERROR_MESSAGE;
  }
  if (min > max) {
    return Math.round(Math.random() * (min - max) + max);
  }

  if (min === max) {
    return max;
  }

  return Math.round(Math.random() * (max - min) + min);
}

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. Будет использоваться для генерации временных географических координат в следующем задании. Пример использования функции:
// Источник: https://habr.com/ru/post/312880/#s2_11
function genarateMapCoordinate (min, max, rounding) {
  const ROUND = Math.pow(10, rounding);
  let coordinate;
  if (min < 0 || max < 0) {
    return ERROR_MESSAGE;
  }
  if (min === max) {
    return Math.trunc(max * ROUND) / ROUND;
  }
  if (min > max) {
    coordinate = Math.random() * (min - max) + max;
    return Math.trunc(coordinate * ROUND) / ROUND;
  }
  coordinate = Math.random() * (max - min) + min;
  return Math.trunc(coordinate * ROUND) / ROUND;
}

getRandomNumber (10, 20);
genarateMapCoordinate (50, 100, 3);
