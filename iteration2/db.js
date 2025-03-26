// Import Supabase client library
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize Supabase client
const supabaseUrl = 'https://mgbekoeqtysnuoshxwup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nYmVrb2VxdHlzbnVvc2h4d3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDA0NDAsImV4cCI6MjA1NjIxNjQ0MH0.6V8KdhJl_ySCe1ti0OQj5NeiG92tOvF0Egc6f03fFn0'; // Replace with your actual key
const supabase = createClient(supabaseUrl, supabaseKey);

///// --- BOOKING MANAGEMENT --- /////

// Function to add a new booking
async function addBooking(bookingData) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
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

// Function to delete a booking
async function deleteBooking(bookingId) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
  return true;
}

///// --- PROVIDER MANAGEMENT --- /////

// Function to add a new provider
async function addProvider(providerData) {
  const { data, error } = await supabase
    .from('providers')
    .insert([providerData])
    .select();

  if (error) {
    console.error('Error adding provider:', error);
    return null;
  }
  return data[0];
}

// Function to get all providers
async function getAllProviders() {
  const { data, error } = await supabase
    .from('providers')
    .select('*');

  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
  return data;
}

// Function to delete a provider
async function deleteProvider(providerId) {
  const { error } = await supabase
    .from('providers')
    .delete()
    .eq('id', providerId);

  if (error) {
    console.error('Error deleting provider:', error);
    return false;
  }
  return true;
}

///// --- AVAILABILITY MANAGEMENT --- /////

// Function to add a new cleaner availability
async function addAvailability(availabilityData) {
  const { data, error } = await supabase
    .from('availability')
    .insert([availabilityData])
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

// Function to delete availability
async function deleteAvailability(availabilityId) {
  const { error } = await supabase
    .from('availability')
    .delete()
    .eq('id', availabilityId);

  if (error) {
    console.error('Error deleting availability:', error);
    return false;
  }
  return true;
}

///// --- SUMMARY STATISTICS --- /////

// Function to get summary statistics
async function getSummaryStats() {
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('id');

  const { data: providers, error: providersError } = await supabase
    .from('providers')
    .select('id');

  if (bookingsError || providersError) {
    console.error('Error fetching summary statistics:', bookingsError || providersError);
    return null;
  }

  return {
    totalBookings: bookings.length,
    totalProviders: providers.length
  };
}

// Export all functions
export { 
  addBooking, getAllBookings, deleteBooking,
  addProvider, getAllProviders, deleteProvider,
  addAvailability, getAllAvailability, deleteAvailability,
  getSummaryStats
};