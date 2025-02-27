// Initialize Supabase client
const supabaseUrl = 'https://mgbekoeqtysnuoshxwup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nYmVrb2VxdHlzbnVvc2h4d3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDA0NDAsImV4cCI6MjA1NjIxNjQ0MH0.6V8KdhJl_ySCe1ti0OQj5NeiG92tOvF0Egc6f03fFn0';

// Create the Supabase client using the CDN-loaded version
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Function to add a new booking
async function addBooking(bookingData) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        name: bookingData.name,
        service: bookingData.service,
        booking_date: bookingData.booking_date,
        status: bookingData.status
      }
    ])
    .select();

  if (error) {
    console.error('Error adding booking:', error);
    return null;
  }
  return data[0];
}

// Function to get all bookings
async function getAllBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*');

  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
  return data;
}

// Function to add a new cleaner availability
async function addAvailability(availabilityData) {
  const { data, error } = await supabase
    .from('availability')
    .insert([
      {
        cleaner_name: availabilityData.cleaner_name,
        available_dates: availabilityData.available_dates
      }
    ])
    .select();

  if (error) {
    console.error('Error adding availability:', error);
    return null;
  }
  return data[0];
}

// Function to get all cleaner availability
async function getAllAvailability() {
  const { data, error } = await supabase
    .from('availability')
    .select('*');

  if (error) {
    console.error('Error fetching availability:', error);
    return [];
  }
  return data;
}

// Export the functions
export { addBooking, getAllBookings, addAvailability, getAllAvailability };