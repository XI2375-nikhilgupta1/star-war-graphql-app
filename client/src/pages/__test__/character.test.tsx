import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterPage from './../character';
import useCharacter from '../../hooks/character';

// Mock the useCharacter hook
jest.mock('../../hooks/character');

describe('CharacterPage Component', () => {
  const mockCharacterData = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    height: '172',
    planet: { name: 'Tatooine', climate: ' arid', terrain: 'desert' },
    films: [{ title: 'A New Hope', episode_id: 4 }],
    vehicles: [{ name: 'X-wing', model: 'T-65 X-wing starfighter' }],
    starships: [{ name: 'Millennium Falcon', model: 'YT-1300 light freighter' }]
  };

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('renders loading state', () => {
    (useCharacter as jest.Mock).mockReturnValue({
      showLoader: true,
      error: null,
      characterData: null,
      characterImage: '',
      handleRightArrow: jest.fn(),
      handleLeftArrow: jest.fn()
    });

    render(
      <MemoryRouter initialEntries={['/character/hey/1']}>
        <CharacterPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error message', () => {
    (useCharacter as jest.Mock).mockReturnValue({
      showLoader: false,
      error: new Error('Character not found'),
      characterData: null,
      characterImage: '',
      handleRightArrow: jest.fn(),
      handleLeftArrow: jest.fn()
    });

    render(
      <MemoryRouter initialEntries={['/character/hey/1']}>
        <CharacterPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/character not found/i)).toBeInTheDocument();
  });

  test('renders character details including vehicles and ensures correct rendering', () => {
    (useCharacter as jest.Mock).mockReturnValue({
      showLoader: false,
      error: null,
      characterData: mockCharacterData,
      characterImage: 'mocked_image_url',
      handleRightArrow: jest.fn(),
      handleLeftArrow: jest.fn()
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/birth year: 19bby/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/planet name: tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/climate: arid/i)).toBeInTheDocument();

    // Check if the vehicles section is rendered correctly
    const vehicleHeading = screen.getByText(/vehicles/i);
    expect(vehicleHeading).toBeInTheDocument();

    // Use getAllByText to check for multiple vehicle entries
    const vehicleItems = screen.getAllByText(/x-wing/i);
    expect(vehicleItems.length).toBe(2); // Ensure there's exactly two 'X-wing' entry one in title and one in model name

    // Check if the starships section is rendered correctly
    const starshipHeading = screen.getByText(/starships/i);
    expect(starshipHeading).toBeInTheDocument();

    // Use getAllByText to check for multiple starship entries
    const starshipItems = screen.getAllByText(/millennium falcon/i);
    expect(starshipItems.length).toBe(1); // Ensure there's exactly one 'Millennium Falcon' entry

    // Check if the films section is rendered correctly
    const filmHeading = screen.getByText(/films/i);
    expect(filmHeading).toBeInTheDocument();

    // Use getAllByText to check for multiple film entries
    const filmItems = screen.getAllByText(/a new hope/i);
    expect(filmItems.length).toBe(1); // Ensure there's exactly one 'A New Hope' entry
  });

  test('renders navigation buttons correctly', () => {
    (useCharacter as jest.Mock).mockReturnValue({
      showLoader: false,
      error: null,
      characterData: mockCharacterData,
      characterImage: 'mocked_image_url',
      handleRightArrow: jest.fn(),
      handleLeftArrow: jest.fn()
    });

    render(
      <MemoryRouter initialEntries={['/character/hey/2']}>
        <CharacterPage />
      </MemoryRouter>
    );

    const leftButton = screen.getByRole('button', { name: /left/i });
    const rightButton = screen.getByRole('button', { name: /right/i });

    expect(leftButton).toBeInTheDocument(); // Left button should be present
    expect(rightButton).toBeInTheDocument(); // Right button should be present

    fireEvent.click(rightButton); // Simulate clicking the right button
    expect(useCharacter().handleRightArrow).toHaveBeenCalled(); // Check if the right arrow handler is called

    fireEvent.click(leftButton); // Simulate clicking the left button
    expect(useCharacter().handleLeftArrow).toHaveBeenCalled(); // Check if the left arrow handler is called
  });
});
