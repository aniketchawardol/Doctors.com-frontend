import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Custom render function that includes providers
export function renderWithProviders(ui, options = {}) {
  const Wrapper = ({ children }) => (
    <HelmetProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </HelmetProvider>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock data for testing
export const mockUserData = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  type: 'user'
}

export const mockHospitalData = {
  id: 1,
  name: 'Test Hospital',
  email: 'hospital@example.com',
  type: 'hospital',
  slug: 'test-hospital'
}

// Mock API responses
export const mockFetchUserData = (data = mockUserData) => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  })
}

export const mockFetchHospitalData = (data = mockHospitalData) => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  })
}
