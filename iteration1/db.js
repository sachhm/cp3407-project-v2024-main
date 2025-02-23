// Key used in localStorage for the database
const DB_KEY = 'myclean_db';

// Initialize the "database" if needed
function initDB() {
  if (!localStorage.getItem(DB_KEY)) {
    // Database now holds both bookings and provider availability arrays.
    const initialDB = { 
      bookings: [],
      availability: []
    };
    localStorage.setItem(DB_KEY, JSON.stringify(initialDB, null, 2));
  }
}

// Retrieve the entire database object
function getDB() {
  initDB();
  return JSON.parse(localStorage.getItem(DB_KEY));
}

// Save the database object to localStorage
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db, null, 2));
}

// Booking functions
function addBooking(booking) {
  const db = getDB();
  // Generate an ID using a timestamp
  booking.id = Date.now();
  db.bookings.push(booking);
  saveDB(db);
  return booking;
}

function getAllBookings() {
  return getDB().bookings;
}

// Provider availability functions
function addAvailability(availability) {
  const db = getDB();
  // Generate an ID using a timestamp
  availability.id = Date.now();
  db.availability.push(availability);
  saveDB(db);
  return availability;
}

function getAllAvailability() {
  return getDB().availability;
}