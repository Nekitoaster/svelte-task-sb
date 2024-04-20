import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decodeFields(encodedList, translationsDict) {
  const excludeFields = ["groupId", "service", "formatSize", "ca"];
  let uniqueIds = new Set();

  const decodedList = encodedList.map((item) => {
    const newItem = {};

    Object.entries(item).forEach(([key, value]) => {
      if (
        key.endsWith("Id") &&
        !excludeFields.includes(key) &&
        value !== null
      ) {
        uniqueIds.add(value); // Добавляем уникальное значение в Set для каждого ID
        newItem[key] =
          translationsDict[value] !== undefined
            ? translationsDict[value]
            : value;
      } else {
        newItem[key] = value;
      }
    });

    return newItem;
  });

  console.log("Уникальные ID:", [...uniqueIds]); // Выводим список уникальных ID
  return decodedList;
}

const decoded = decodeFields(encoded, translations);



console.log(decoded)
