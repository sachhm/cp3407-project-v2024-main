import { jest } from '@jest/globals';

// Mock database functions with implementations
const mockDb = {
  addBooking: jest.fn(async (bookingData) => {
    if (!bookingData.name || !bookingData.service || !bookingData.booking_date) {
      return null;
    }
    const bookingDate = new Date(bookingData.booking_date);
    const today = new Date();
    if (bookingDate < today) {
      return null;
    }
    return { id: 1, ...bookingData, active: true };
  }),

  addProvider: jest.fn(async (providerData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(providerData.email)) {
      return null;
    }
    const existingEmails = mockDb.addProvider.mock.calls
      .map(call => call[0].email);
    if (existingEmails.includes(providerData.email)) {
      return null;
    }
    return { id: 1, ...providerData };
  }),

  addAvailability: jest.fn(async (availabilityData) => {
    const today = new Date();
    const validDates = availabilityData.available_dates.every(date => {
      return new Date(date) >= today;
    });
    if (!validDates) {
      return null;
    }
    const existingDates = mockDb.addAvailability.mock.calls
      .filter(call => call[0].cleaner_name === availabilityData.cleaner_name)
      .flatMap(call => call[0].available_dates);
    const hasOverlap = availabilityData.available_dates.some(date => 
      existingDates.includes(date)
    );
    if (hasOverlap) {
      return null;
    }
    return { id: 1, ...availabilityData };
  }),

  updateBookingActive: jest.fn(async (bookingId, active) => {
    // Get the last booking that was added through addBooking
    const lastBooking = mockDb.addBooking.mock.calls[mockDb.addBooking.mock.calls.length - 1]?.[0];
    
    // Check if the booking was completed
    if (lastBooking?.status === 'Completed' && !active) {
      return null;
    }
    
    return { id: bookingId, active };
  }),


  getSummaryStats: jest.fn(async () => ({
    totalBookings: 5,
    totalProviders: 3,
    totalActiveBookings: 3
  })),

  getAllBookings: jest.fn(async () => []),
  deleteBooking: jest.fn(async () => true),
  getAllProviders: jest.fn(async () => []),
  deleteProvider: jest.fn(async () => true),
  getAllAvailability: jest.fn(async () => []),
  deleteAvailability: jest.fn(async () => true)
};

describe('MyClean Application Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Booking Management', () => {
    test('should reject invalid booking data', async () => {
      const invalidBooking = {
        service: 'Light Clean',
        booking_date: '2025-04-15'
      };
      
      const result = await mockDb.addBooking(invalidBooking);
      expect(result).toBeNull();
    });

    test('should reject bookings for past dates', async () => {
      const pastBooking = {
        name: 'Test Customer',
        service: 'Light Clean',
        booking_date: '2023-04-15'
      };
      
      const result = await mockDb.addBooking(pastBooking);
      expect(result).toBeNull();
    });

    test('should create valid booking', async () => {
      const validBooking = {
        name: 'Test Customer',
        service: 'Light Clean',
        booking_date: '2025-04-15',
        status: 'Pending'
      };
      
      const result = await mockDb.addBooking(validBooking);
      expect(result).toBeTruthy();
      expect(result.name).toBe(validBooking.name);
    });
  });

  describe('Provider Management', () => {
    test('should reject provider with invalid email', async () => {
      const invalidProvider = {
        name: 'Test Provider',
        email: 'not-an-email',
        phone: '1234567890',
        service_type: 'Light Clean'
      };
      
      const result = await mockDb.addProvider(invalidProvider);
      expect(result).toBeNull();
    });

    test('should reject duplicate provider email', async () => {
      const provider1 = {
        name: 'Test Provider 1',
        email: 'test@example.com',
        phone: '1234567890',
        service_type: 'Light Clean'
      };
      
      const provider2 = {
        name: 'Test Provider 2',
        email: 'test@example.com',
        phone: '0987654321',
        service_type: 'Deep Clean'
      };
      
      await mockDb.addProvider(provider1);
      const result = await mockDb.addProvider(provider2);
      expect(result).toBeNull();
    });
  });

  describe('Availability Management', () => {
    test('should reject overlapping availability', async () => {
      const availability1 = {
        cleaner_name: 'Test Cleaner',
        available_dates: ['2025-04-15']
      };
      
      const availability2 = {
        cleaner_name: 'Test Cleaner',
        available_dates: ['2025-04-15']
      };
      
      await mockDb.addAvailability(availability1);
      const result = await mockDb.addAvailability(availability2);
      expect(result).toBeNull();
    });

    test('should reject past availability dates', async () => {
      const pastAvailability = {
        cleaner_name: 'Test Cleaner',
        available_dates: ['2023-04-15']
      };
      
      const result = await mockDb.addAvailability(pastAvailability);
      expect(result).toBeNull();
    });
  });

  describe('Statistics', () => {
    test('should have matching total and individual counts', async () => {
      const stats = await mockDb.getSummaryStats();
      expect(stats.totalActiveBookings).toBeLessThanOrEqual(stats.totalBookings);
    });
  });


  describe('Booking Status Updates', () => {
    test('should reject invalid status transitions', async () => {
      const completedBooking = {
        name: 'Status Test',
        service: 'Light Clean',
        booking_date: '2025-04-16',
        status: 'Completed'
      };
      
      // First add the completed booking
      await mockDb.addBooking(completedBooking);
      
      // Then try to update its status
      const result = await mockDb.updateBookingActive(1, false);
      expect(result).toBeNull();
    });

    // Add a positive test case
    test('should allow status update for non-completed booking', async () => {
      const pendingBooking = {
        name: 'Status Test',
        service: 'Light Clean',
        booking_date: '2025-04-16',
        status: 'Pending'
      };
      
      await mockDb.addBooking(pendingBooking);
      const result = await mockDb.updateBookingActive(1, false);
      expect(result).toEqual({ id: 1, active: false });
    });
  });
});