import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from './../home';
import useHome from './../../hooks/home';

jest.mock('./../../hooks/home'); // Mock the useHome hook

describe('Home Component', () => {
  const mockCharactersList = [
    { id: 1, name: 'Character One' },
    { id: 2, name: 'Character Two' },
  ];

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('renders loading state', () => {
    (useHome as jest.Mock).mockReturnValue({
      charactersList: [],
      loading: true,
      error: null,
      handleOnSelect: jest.fn(),
    });

    render(<Home />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error message', () => {
    const mockError = new Error('Something went wrong');
    (useHome as jest.Mock).mockReturnValue({
      charactersList: [],
      loading: false,
      error: mockError,
      handleOnSelect: jest.fn(),
    });

    render(<Home />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('simulates typing in the search box', () => {
    (useHome as jest.Mock).mockReturnValue({
      charactersList: mockCharactersList,
      loading: false,
      error: null,
      handleOnSelect: jest.fn(),
    });

    render(<Home />);

    const searchBox = screen.getByRole('textbox'); // Get the textbox element
    fireEvent.change(searchBox, { target: { value: 'Character One' } }); // Simulate typing

    expect(searchBox.getAttribute('value')).toBe('Character One'); // Assert that the value has updated
    // You can add more assertions based on how the component reacts to the input
  });
});