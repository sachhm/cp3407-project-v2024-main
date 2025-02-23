// Key used in localStorage
const DB_KEY = 'myclean_db';

// Initialize the "database" if needed
function initDB() {
  if (!localStorage.getItem(DB_KEY)) {
    // Initialize with an object containing bookings array.
    const initialDB = { bookings: [] };
    localStorage.setItem(DB_KEY, JSON.stringify(initialDB, null, 2));
  }
}

// Retrieve the entire DB object (as JSON)
function getDB() {
  initDB();
  return JSON.parse(localStorage.getItem(DB_KEY));
}

// Save the DB object to localStorage
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db, null, 2));
}

// Add a new booking, returns the booking
function addBooking(booking) {
  const db = getDB();
  // Generate an ID using a timestamp
  booking.id = Date.now();
  db.bookings.push(booking);
  saveDB(db);
  return booking;
}

// Retrieve all bookings
function getAllBookings() {
  return getDB().bookings;
}