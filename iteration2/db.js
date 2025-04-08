// Import Supabase client library
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize Supabase client
const supabaseUrl = 'https://mgbekoeqtysnuoshxwup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nYmVrb2VxdHlzbnVvc2h4d3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDA0NDAsImV4cCI6MjA1NjIxNjQ0MH0.6V8KdhJl_ySCe1ti0OQj5NeiG92tOvF0Egc6f03fFn0';
const supabase = createClient(supabaseUrl, supabaseKey);

///// --- BOOKING MANAGEMENT --- /////

// Function to add a new booking
async function addBooking(bookingData) {
  // Ensure active is set to true for new bookings
  const bookingWithActive = {
    ...bookingData,
    active: true
  };

  console.log('Booking data being inserted:', bookingWithActive);

  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingWithActive])
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
  // Ensure date is saved in YYYY-MM-DD format
  availabilityData.available_dates = availabilityData.available_dates.map(date =>
    new Date(date).toISOString().split('T')[0]
  );

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

  // Format dates for display
  return data.map(item => ({
    ...item,
    available_dates: item.available_dates.map(date => {
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return formattedDate;
    })
  }));
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

  const { data: activeBookings, error: activeError } = await supabase
    .from('bookings')
    .select('id')
    .eq('active', true);  // ✅ Filtering for active bookings

  console.log("Bookings Data:", bookings, bookingsError);
  console.log("Providers Data:", providers, providersError);
  console.log("Active Bookings Data:", activeBookings, activeError);  // ✅ Check this log

  return {
    totalBookings: bookings ? bookings.length : 0,
    totalProviders: providers ? providers.length : 0,
    totalActiveBookings: activeBookings ? activeBookings.length : 0, // ✅ Ensure this exists
  };
}


async function updateBookingActive(bookingId, active) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ active: active })
    .eq('id', bookingId)
    .select();

  if (error) {
    console.error('Error updating booking:', error);
    return null;
  }
  return data[0];
}

// Helper functions for validation
function validateBooking(bookingData) {
  // Check required fields
  if (!bookingData.name || !bookingData.service || !bookingData.booking_date) {
    return false;
  }
  
  // Check if booking date is in the future
  const bookingDate = new Date(bookingData.booking_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return bookingDate >= today;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Update the database functions
async function addBooking(bookingData) {
  // Validate booking data
  if (!validateBooking(bookingData)) {
    console.error('Invalid booking data');
    return null;
  }

  const bookingWithActive = {
    ...bookingData,
    active: true,
    status: bookingData.status || 'Pending'
  };

  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingWithActive])
    .select();

  if (error) {
    console.error('Error adding booking:', error);
    return null;
  }

  return data[0];
}

async function addProvider(providerData) {
  // Validate email
  if (!validateEmail(providerData.email)) {
    console.error('Invalid email format');
    return null;
  }

  // Check for existing provider with same email
  const { data: existingProvider } = await supabase
    .from('providers')
    .select('email')
    .eq('email', providerData.email);

  if (existingProvider && existingProvider.length > 0) {
    console.error('Provider with this email already exists');
    return null;
  }

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

async function addAvailability(availabilityData) {
  // Validate dates are in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validDates = availabilityData.available_dates.every(date => {
    const availableDate = new Date(date);
    return availableDate >= today;
  });

  if (!validDates) {
    console.error('Cannot set availability for past dates');
    return null;
  }

  // Check for overlapping availability
  const { data: existingAvailability } = await supabase
    .from('availability')
    .select('*')
    .eq('cleaner_name', availabilityData.cleaner_name);

  const hasOverlap = existingAvailability?.some(existing => 
    existing.available_dates.some(date => 
      availabilityData.available_dates.includes(date)
    )
  );

  if (hasOverlap) {
    console.error('Overlapping availability detected');
    return null;
  }

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

async function updateBookingActive(bookingId, active) {
  // Get current booking status
  const { data: currentBooking } = await supabase
    .from('bookings')
    .select('status')
    .eq('id', bookingId)
    .single();

  // Prevent status change if already completed
  if (currentBooking?.status === 'Completed' && !active) {
    console.error('Cannot modify completed booking');
    return null;
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({ active: active })
    .eq('id', bookingId)
    .select();

  if (error) {
    console.error('Error updating booking:', error);
    return null;
  }

  return data[0];
}

async function getSummaryStats() {
  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, active');

  const { data: providers } = await supabase
    .from('providers')
    .select('id');

  const totalBookings = bookings?.length || 0;
  const totalProviders = providers?.length || 0;
  const totalActiveBookings = bookings?.filter(b => b.active)?.length || 0;

  // Ensure active bookings never exceed total bookings
  return {
    totalBookings,
    totalProviders,
    totalActiveBookings: Math.min(totalActiveBookings, totalBookings)
  };
}

export { 
  addBooking, getAllBookings, deleteBooking, updateBookingActive,
  addProvider, getAllProviders, deleteProvider,
  addAvailability, getAllAvailability, deleteAvailability,
  getSummaryStats
};