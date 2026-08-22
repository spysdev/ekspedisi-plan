// __tests__/ItineraryPanel.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItineraryPanel from '@/components/ItineraryPanel';

// Mock supabase client
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: [], error: null }),
    })),
  },
}));

test('renders ItineraryPanel heading', async () => {
  render(<ItineraryPanel tripId="test-trip" />);
  const heading = await screen.findByText(/Itinerary/i);
  expect(heading).toBeInTheDocument();
});
