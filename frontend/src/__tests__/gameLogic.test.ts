import { describe, it, expect } from 'vitest';
import { determineWinner, isPerson, isStarship, getComparisonAttribute } from '../utils/gameLogic';
import type { Person, Starship } from '../models/models';

describe('Game Logic Utils', () => {
  const mockPerson1: Person = {
    id: '1',
    name: 'Alex Nova',
    mass: 77,
    height: 172,
  };

  const mockPerson2: Person = {
    id: '2',
    name: 'Captain Steel',
    mass: 136,
    height: 202,
  };

  const mockStarship1: Starship = {
    id: '1',
    name: 'Eagle Strike',
    crew: 1,
    model: 'T-65 X-wing',
  };

  const mockStarship2: Starship = {
    id: '2',
    name: 'Titan Station',
    crew: 342953,
    model: 'DS-1 Orbital Battle Platform',
  };

  describe('isPerson', () => {
    it('should correctly identify a person', () => {
      expect(isPerson(mockPerson1)).toBe(true);
      expect(isPerson(mockStarship1)).toBe(false);
    });
  });

  describe('isStarship', () => {
    it('should correctly identify a starship', () => {
      expect(isStarship(mockStarship1)).toBe(true);
      expect(isStarship(mockPerson1)).toBe(false);
    });
  });

  describe('determineWinner', () => {
    it('should determine winner for people based on mass', () => {
      expect(determineWinner(mockPerson1, mockPerson2)).toBe('right'); // Captain Steel heavier
      expect(determineWinner(mockPerson2, mockPerson1)).toBe('left'); // Captain Steel heavier
    });

    it('should determine winner for starships based on crew', () => {
      expect(determineWinner(mockStarship1, mockStarship2)).toBe('right'); // Titan Station larger crew
      expect(determineWinner(mockStarship2, mockStarship1)).toBe('left'); // Titan Station larger crew
    });

    it('should handle tie correctly', () => {
      const person3: Person = { ...mockPerson1, mass: 77 };
      expect(determineWinner(mockPerson1, person3)).toBe('tie');
    });

    it('should throw error for mixed entity types', () => {
      expect(() => determineWinner(mockPerson1, mockStarship1)).toThrow();
    });
  });

  describe('getComparisonAttribute', () => {
    it('should return mass for person', () => {
      const result = getComparisonAttribute(mockPerson1);
      expect(result.label).toBe('Mass (kg)');
      expect(result.value).toBe(77);
    });

    it('should return crew for starship', () => {
      const result = getComparisonAttribute(mockStarship1);
      expect(result.label).toBe('Crew Size');
      expect(result.value).toBe(1);
    });

    it('should handle missing values', () => {
      const personWithoutMass: Person = { 
        id: '3', 
        name: 'Test',
        mass: undefined // Explicitly undefined mass
      };
      const result = getComparisonAttribute(personWithoutMass);
      expect(result.label).toBe('Mass (kg)');
      expect(result.value).toBe(0);
    });
  });
});
