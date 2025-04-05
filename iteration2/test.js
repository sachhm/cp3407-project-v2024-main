import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { 
  addBooking, 
  getAllBookings, 
  deleteBooking, 
  addProvider, 
  getAllProviders, 
  deleteProvider, 
  addAvailability, 
  getAllAvailability, 
  deleteAvailability, 
  getSummaryStats,
  updateBookingActive 
} from './db.js'; // Adjust this import to point to your actual file

// Initialize Supabase client
const supabaseUrl = 'https://mgbekoeqtysnuoshxwup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nYmVrb2VxdHlzbnVvc2h4d3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDA0NDAsImV4cCI6MjA1NjIxNjQ0MH0.6V8KdhJl_ySCe1ti0OQj5NeiG92tOvF0Egc6f03fFn0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function runTests() {
  console.log('Running tests...');

  // Test: addBooking
  try {
    const newBooking = { provider_id: 1, customer_name: 'John Doe', booking_date: '2025-04-10' };
    const result = await addBooking(newBooking);
    console.log('addBooking test passed:', result ? 'Booking ID: ' + result.id : 'Failed');
  } catch (error) {
    console.error('addBooking test failed:', error);
  }

  // Test: getAllBookings
  try {
    const bookings = await getAllBookings();
    console.log('getAllBookings test passed:', Array.isArray(bookings) && bookings.length > 0 ? `Found ${bookings.length} bookings.` : 'No bookings found.');
  } catch (error) {
    console.error('getAllBookings test failed:', error);
  }

  // Test: deleteBooking
  try {
    const newBooking = { provider_id: 1, customer_name: 'Jane Doe', booking_date: '2025-04-12' };
    const createdBooking = await addBooking(newBooking);
    const bookingId = createdBooking.id;

    const deletionResult = await deleteBooking(bookingId);
    const bookings = await getAllBookings();
    const deletedBooking = bookings.find(booking => booking.id === bookingId);

    console.log('deleteBooking test passed:', deletionResult && !deletedBooking ? 'Booking deleted successfully.' : 'Failed to delete booking.');
  } catch (error) {
    console.error('deleteBooking test failed:', error);
  }

  // Test: addProvider
  try {
    const newProvider = { name: 'Cleaning Service' };
    const result = await addProvider(newProvider);
    console.log('addProvider test passed:', result ? 'Provider ID: ' + result.id : 'Failed');
  } catch (error) {
    console.error('addProvider test failed:', error);
  }

  // Test: getAllProviders
  try {
    const providers = await getAllProviders();
    console.log('getAllProviders test passed:', Array.isArray(providers) && providers.length > 0 ? `Found ${providers.length} providers.` : 'No providers found.');
  } catch (error) {
    console.error('getAllProviders test failed:', error);
  }

  // Test: deleteProvider
  try {
    const newProvider = { name: 'Housekeeping' };
    const createdProvider = await addProvider(newProvider);
    const providerId = createdProvider.id;

    const deletionResult = await deleteProvider(providerId);
    const providers = await getAllProviders();
    const deletedProvider = providers.find(provider => provider.id === providerId);

    console.log('deleteProvider test passed:', deletionResult && !deletedProvider ? 'Provider deleted successfully.' : 'Failed to delete provider.');
  } catch (error) {
    console.error('deleteProvider test failed:', error);
  }

  // Test: addAvailability
  try {
    const newAvailability = { provider_id: 1, available_dates: ['2025-04-12', '2025-04-14'] };
    const result = await addAvailability(newAvailability);
    console.log('addAvailability test passed:', result ? 'Availability ID: ' + result.id : 'Failed');
  } catch (error) {
    console.error('addAvailability test failed:', error);
  }

  // Test: getAllAvailability
  try {
    const availability = await getAllAvailability();
    console.log('getAllAvailability test passed:', Array.isArray(availability) && availability.length > 0 ? `Found ${availability.length} availabilities.` : 'No availabilities found.');
  } catch (error) {
    console.error('getAllAvailability test failed:', error);
  }

  // Test: deleteAvailability
  try {
    const newAvailability = { provider_id: 1, available_dates: ['2025-04-15'] };
    const createdAvailability = await addAvailability(newAvailability);
    const availabilityId = createdAvailability.id;

    const deletionResult = await deleteAvailability(availabilityId);
    const availability = await getAllAvailability();
    const deletedAvailability = availability.find(avail => avail.id === availabilityId);

    console.log('deleteAvailability test passed:', deletionResult && !deletedAvailability ? 'Availability deleted successfully.' : 'Failed to delete availability.');
  } catch (error) {
    console.error('deleteAvailability test failed:', error);
  }

  // Test: getSummaryStats
  try {
    const stats = await getSummaryStats();
    console.log('getSummaryStats test passed:', stats ? `Bookings: ${stats.totalBookings}, Providers: ${stats.totalProviders}, Active Bookings: ${stats.totalActiveBookings}` : 'Failed to fetch stats.');
  } catch (error) {
    console.error('getSummaryStats test failed:', error);
  }

  // Test: updateBookingActive
  try {
    const newBooking = { provider_id: 1, customer_name: 'Test Customer', booking_date: '2025-04-20' };
    const createdBooking = await addBooking(newBooking);
    const bookingId = createdBooking.id;

    const updatedBooking = await updateBookingActive(bookingId, false);
    console.log('updateBookingActive test passed:', updatedBooking && updatedBooking.active === false ? 'Booking updated successfully.' : 'Failed to update booking.');
  } catch (error) {
    console.error('updateBookingActive test failed:', error);
  }
}

// Run all tests
runTests().then(() => console.log('Tests completed.'));
