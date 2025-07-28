import { gql } from '@apollo/client';

// Queries
export const GET_RANDOM_PERSON = gql`
  query GetRandomPerson {
    randomPerson {
      id
      name
      mass
      height
      gender
    }
  }
`;

export const GET_RANDOM_STARSHIP = gql`
  query GetRandomStarship {
    randomStarship {
      id
      name
      model
      crew
      passengers
      starshipClass
    }
  }
`;

export const GET_ALL_PEOPLE = gql`
  query GetAllPeople($pagination: PaginationInput) {
    people(pagination: $pagination) {
      data {
        id
        name
        mass
        height
        gender
      }
      pagination {
        total
        page
        totalPages
        limit
      }
    }
  }
`;

export const GET_ALL_STARSHIPS = gql`
  query GetAllStarships($pagination: PaginationInput) {
    starships(pagination: $pagination) {
      data {
        id
        name
        model
        crew
        passengers
        starshipClass
      }
      pagination {
        total
        page
        totalPages
        limit
      }
    }
  }
`;

export const GET_PERSON = gql`
  query GetPerson($id: ID!) {
    person(id: $id) {
      id
      name
      mass
      height
      gender
    }
  }
`;

export const GET_STARSHIP = gql`
  query GetStarship($id: ID!) {
    starship(id: $id) {
      id
      name
      model
      crew
      passengers
      starshipClass
    }
  }
`;
