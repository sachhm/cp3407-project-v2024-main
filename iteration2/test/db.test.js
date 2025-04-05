import { createClient } from '@supabase/supabase-js';
import { expect } from 'chai';

const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

describe('📦 Bookings', () => {
  let bookingId;

  it('should add a booking if not exists', async () => {
    // Check if the booking already exists
    const { data: existingBooking, error: existingBookingError } = await supabase
      .from('bookings')
      .select('id')
      .eq('name', 'Test User')
      .eq('booking_date', '2025-04-06')
      .single();

    expect(existingBookingError).to.be.null;

    if (!existingBooking) {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            name: 'Test User',
            service: 'Test Clean',
            booking_date: '2025-04-06',
            active: true,
            status: 'scheduled',
          }
        ])
        .select()
        .single();

      expect(error).to.be.null;
      expect(data).to.have.property('id');
      bookingId = data.id;
    } else {
      bookingId = existingBooking.id;
    }
  });

  it('should get all bookings', async () => {
    const { data, error } = await supabase.from('bookings').select('*');
    expect(error).to.be.null;
    expect(data).to.be.an('array');
  });

  it('should update booking active state', async () => {
    const { error } = await supabase
      .from('bookings')
      .update({ active: false })
      .eq('id', bookingId);

    expect(error).to.be.null;
  });

  it('should delete a booking', async () => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);

    expect(error).to.be.null;
  });
});

describe('👨‍⚕️ Providers', () => {
  let providerId;

  it('should add a provider if not exists', async () => {
    const { data: existingProvider, error: existingProviderError } = await supabase
      .from('providers')
      .select('id')
      .eq('email', 'jane@example.com')
      .single();

    expect(existingProviderError).to.be.null;

    if (!existingProvider) {
      const { data, error } = await supabase
        .from('providers')
        .insert([
          {
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '1234567890',
            service_type: 'Window Cleaning'
          }
        ])
        .select()
        .single();

      expect(error).to.be.null;
      expect(data).to.have.property('id');
      providerId = data.id;
    } else {
      providerId = existingProvider.id;
    }
  });

  it('should get all providers', async () => {
    const { data, error } = await supabase.from('providers').select('*');
    expect(error).to.be.null;
    expect(data).to.be.an('array');
  });

  it('should delete a provider', async () => {
    const { error } = await supabase
      .from('providers')
      .delete()
      .eq('id', providerId);

    expect(error).to.be.null;
  });
});

describe('📅 Availability', () => {
  let availabilityId;

  it('should add availability if not exists', async () => {
    const { data: existingAvailability, error: existingAvailabilityError } = await supabase
      .from('availability')
      .select('id')
      .eq('cleaner_name', 'Cleaner Joe')
      .eq('available_dates', ['2025-04-08'])
      .single();

    expect(existingAvailabilityError).to.be.null;

    if (!existingAvailability) {
      const { data, error } = await supabase
        .from('availability')
        .insert([
          {
            cleaner_name: 'Cleaner Joe',
            available_dates: ['2025-04-08']
          }
        ])
        .select()
        .single();

      expect(error).to.be.null;
      expect(data).to.have.property('id');
      availabilityId = data.id;
    } else {
      availabilityId = existingAvailability.id;
    }
  });

  it('should get all availability entries', async () => {
    const { data, error } = await supabase.from('availability').select('*');
    expect(error).to.be.null;
    expect(data).to.be.an('array');
  });

  it('should delete availability', async () => {
    const { error } = await supabase
      .from('availability')
      .delete()
      .eq('id', availabilityId);

    expect(error).to.be.null;
  });
});

describe('📊 Summary Stats', () => {
  it('should return summary statistics', async () => {
    const [bookingsRes, providersRes, activeRes] = await Promise.all([
      supabase.from('bookings').select('id'),
      supabase.from('providers').select('id'),
      supabase.from('bookings').select('id').eq('active', true)
    ]);

    expect(bookingsRes.error).to.be.null;
    expect(providersRes.error).to.be.null;
    expect(activeRes.error).to.be.null;

    expect(bookingsRes.data).to.be.an('array');
    expect(providersRes.data).to.be.an('array');
    expect(activeRes.data).to.be.an('array');
  });
});
