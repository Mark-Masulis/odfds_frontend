import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  test('renders welcome message', () => {
    render(<Router><LandingPage /></Router>);
    const welcomeMessage = screen.getByText(/Welcome to ODFDS!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders restaurant login button', () => {
    render(<Router><LandingPage /></Router>);
    const restaurantButton = screen.getByRole('button', { name: /Restaurant/i });
    expect(restaurantButton).toBeInTheDocument();
  });
  

  test('renders driver login button', () => {
    render(<Router><LandingPage /></Router>);
    const driverLoginButton = screen.getByText(/Driver/i);
    expect(driverLoginButton).toBeInTheDocument();
  });

  test('renders customer button', () => {
    render(<Router><LandingPage /></Router>);
    const customerButton = screen.getByRole('link', { name: /Customer/i });
    expect(customerButton).toBeInTheDocument();
  });
});

