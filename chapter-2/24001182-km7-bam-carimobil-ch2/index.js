// Fetch mobil dari file JSON
async function fetchAllCars() {
  try {
    const cars = await fetch("cars.json").then((response) => response.json());
    return cars;
  } catch (error) {
    console.error("Error fetching cars data: ", error);
  }
}

// Tampilkan mobil sesuai filter
function displayCars(filteredCars) {
  const carListContainer = document.getElementById("carListContainer");
  carListContainer.innerHTML = "";

  if (filteredCars.length === 0) {
    carListContainer.innerHTML =
      '<p class="text-center">Tidak ada mobil yang ditemukan sesuai kriteria.</p>';
    return;
  }

  filteredCars.forEach((car) => {
    const carCard = `
      <div class="card" style="width: 18rem; margin-bottom: 20px;">
        <img src="images/${car.image}" class="card-img-top" alt="${car.model}">
        <div class="card-body">
          <h5 class="card-title">${car.manufacture} ${car.model} - Rp${car.rentPerDay}</h5>
          <p class="card-text">${car.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><strong>Kapasitas:</strong> ${car.capacity} penumpang</li>
          <li class="list-group-item"><strong>Transmisi:</strong> ${car.transmission}</li>
          <li class="list-group-item"><strong>Tahun:</strong> ${car.year}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="btn btn-success w-100">Pilih Mobil</a>
        </div>
      </div>
    `;
    carListContainer.innerHTML += carCard;
  });
}

//  tanggal acak sebulan lalu hingga sebulan ke depan
class Binar {
  static populateCars(cars) {
    return cars.map((car) => {
      const timeAt = new Date(); // Waktu sekarang

      // Waktu sebulan lalu dan sebulan ke depan
      const oneMonthMillis = 30 * 24 * 60 * 60 * 1000;
      const oneMonthAgo = timeAt.getTime() - oneMonthMillis;
      const oneMonthAhead = timeAt.getTime() + oneMonthMillis;

      // tanggal acak antara sebulan yang lalu dan sebulan yang akan datang
      const randomTime = getRandomInt(oneMonthAgo, oneMonthAhead);
      const availableAt = new Date(randomTime);

      return {
        ...car,
        availableAt,
      };
    });
  }
}

// Fungsi untuk menghasilkan angka acak dalam rentang tertentu
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi untuk filter data mobil
function filterCars(cars, filter) {
  return cars.filter((car) => {
    // Filter berdasarkan kapasitas, kapasitas mobil harus <= jumlah penumpang yang diinput
    const isCapacityMatch = !filter.capacity || car.capacity >= filter.capacity;

    // Filter berdasarkan tanggal
    const selectedDate = filter.date ? new Date(filter.date) : null;
    const carAvailableAt = car.availableAt ? new Date(car.availableAt) : null;

    // Memastikan mobil tersedia pada tanggal yang dipilih
    const isDateMatch =
      !selectedDate || (carAvailableAt && carAvailableAt <= selectedDate);

    // Filter berdasarkan tipe driver
    const isDriverMatch =
      (filter.driver === "Dengan Supir" && car.available === true) ||
      (filter.driver === "Tanpa Supir" && car.available === false) ||
      !filter.driver;

    return isCapacityMatch && isDateMatch && isDriverMatch;
  });
}

// Event listener untuk tombol pencarian
document
  .getElementById("searchCarButton")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    // Ambil data dari file JSON
    const cars = await fetchAllCars();

    // Memperbarui data mobil dengan tanggal availableAt acak
    const populatedCars = Binar.populateCars(cars);

    // Ambil input dari form
    const date = document.getElementById("datepicker").value;
    const capacity = document.getElementById("jumlahPenumpang").value;
    const driverType = document.getElementById("tipeDriver").value;

    // Buat objek filter berdasarkan input pengguna
    const filter = {};

    if (date) {
      filter.date = date;
    }
    if (capacity) {
      filter.capacity = parseInt(capacity);
    }
    if (driverType) {
      filter.driver = driverType;
    }

    // Filter mobil dan tampilkan hasilnya
    const filteredCars = filterCars(populatedCars, filter);
    displayCars(filteredCars);
  });
