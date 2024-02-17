// Функція, яка симулює завантаження даних з сервера
function fetchDataFromServer() {
  return new Promise((resolve, reject) => {
    // Симулюємо асинхронний запит до сервера
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber < 0.7) {
        resolve("Дані успішно завантажені");
      } else {
        reject("Помилка завантаження даних");
      }
    }, 1000);
  });
}

// Функція для конвертації даних
function convertData(data) {
  return new Promise((resolve) => {
    // Симулюємо асинхронну конвертацію даних
    setTimeout(() => {
      const convertedData = data.toUpperCase(); // Приклад конвертації
      resolve(convertedData);
    }, 500);
  });
}

// Генераторний метод, що використовує 'yield' для послідовного завантаження даних з сервера
async function* fetchData() {
  try {
    const result = await fetchDataFromServer(); // Завантажуємо дані з сервера

    yield "pending"; // Повертаємо статус "pending"

    const convertedData = await convertData(result); // Конвертуємо дані

    yield "success"; // Повертаємо статус "convert"

    return convertedData; // Повертаємо конвертовані дані
  } catch (error) {
    yield "error"; // Повертаємо статус "error" }
  }
}

(async () => {
  const generator = fetchData();
  console.log(await generator.next());
  console.log(await generator.next());
  console.log(await generator.next());
})();
