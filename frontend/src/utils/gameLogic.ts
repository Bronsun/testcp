import type { Person, Starship, GameEntity } from '../models/models';

export const isPerson = (entity: GameEntity): entity is Person => {
  return 'mass' in entity;
};

export const isStarship = (entity: GameEntity): entity is Starship => {
  return 'crew' in entity;
};

export const determineWinner = (
  leftEntity: GameEntity,
  rightEntity: GameEntity
): 'left' | 'right' | 'tie' => {
  
  if (isPerson(leftEntity) && isPerson(rightEntity)) {
    const leftMass = leftEntity.mass || 0;
    const rightMass = rightEntity.mass || 0;
    
    if (leftMass > rightMass) return 'left';
    if (rightMass > leftMass) return 'right';
    return 'tie';
  }
  
  if (isStarship(leftEntity) && isStarship(rightEntity)) {
    const leftCrew = leftEntity.crew || 0;
    const rightCrew = rightEntity.crew || 0;
    
    if (leftCrew > rightCrew) return 'left';
    if (rightCrew > leftCrew) return 'right';
    return 'tie';
  }
  
  throw new Error('Cannot compare different entity types');
};

export const getComparisonAttribute = (entity: GameEntity): { label: string; value: number } => {
  if (isPerson(entity)) {
    return {
      label: 'Mass (kg)',
      value: entity.mass || 0
    };
  }
  
  if (isStarship(entity)) {
    return {
      label: 'Crew Size',
      value: entity.crew || 0
    };
  }
  
  return {
    label: 'Unknown',
    value: 0
  };
};
