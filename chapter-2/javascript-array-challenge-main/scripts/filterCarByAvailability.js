function filterCarByAvailability(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  console.log(cars);

  // Tempat penampungan hasil
  const result = [];

  cars.forEach(car => {
    if (car.available === true) {
      result.push(car);
    }
  });

  // Rubah code ini dengan array hasil filter berdasarkan availablity
  return result;
}
