// A simple "database" using localStorage

// Get the stored bookings as an array (or an empty array if none exist)
function getBookings() {
    const data = localStorage.getItem('bookings');
    return data ? JSON.parse(data) : [];
}

// Get the stored providers as an array (or an empty array if none exist)
function getProviders() {
    const data = localStorage.getItem('providers');
    return data ? JSON.parse(data) : [];
}
  
// Save the bookings array to localStorage
function saveBookings(bookings) {
  localStorage.setItem('bookings', JSON.stringify(bookings, null, 2));
}

// Save the providers array to localStorage
function saveProviders(providers) {
  localStorage.setItem('providers', JSON.stringify(providers, null, 2));
}
  
// Add a new booking and return it. Generates a unique id based on timestamp.
function addBooking(booking) {
  const bookings = getBookings();
  booking.id = Date.now();
  bookings.push(booking);
  saveBookings(bookings);
  return booking;
}

// Add a new provider and return it. Generates a unique id based on timestamp.
function addProvider(provider) {
  const providers = getProviders();
  provider.id = Date.now();
  providers.push(provider);
  saveProviders(providers);
  return provider;
}

// Retrieve all bookings
function getAllBookings() {
  return getBookings();
}

// Retrieve all providers
function getAllProviders() {
  return getProviders();
}

// Display bookings
function displayBookings() {
  const bookings = getAllBookings();
  const bookingsDiv = document.getElementById('bookings');
  if (bookings.length === 0) {
    bookingsDiv.innerHTML = '<p>No bookings stored.</p>';
    return;
  }
  bookingsDiv.innerHTML = '';
  bookings.forEach(booking => {
    bookingsDiv.innerHTML += `<p>ID: ${booking.id}, Name: ${booking.name}, Service: ${booking.service}, Date: ${booking.booking_date}, Status: ${booking.status}</p>`;
  });
}

// Display providers
function displayProviders() {
  const providers = getAllProviders();
  const providersDiv = document.getElementById('providers');
  if (providers.length === 0) {
    providersDiv.innerHTML = '<p>No providers stored.</p>';
    return;
  }
  providersDiv.innerHTML = '';
  providers.forEach(provider => {
    providersDiv.innerHTML += `<p>ID: ${provider.id}, Name: ${provider.name}, Services: ${provider.services.join(', ')}</p>`;
  });
}