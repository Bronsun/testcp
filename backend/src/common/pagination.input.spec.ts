import { Test, TestingModule } from '@nestjs/testing';
import { PaginationInput } from './pagination.input';

describe('PaginationInput', () => {
  it('should have default values', () => {
    const pagination = new PaginationInput();
    expect(pagination.page).toBe(1);
    expect(pagination.limit).toBe(10);
  });

  it('should accept custom values', () => {
    const pagination = new PaginationInput();
    pagination.page = 5;
    pagination.limit = 20;
    
    expect(pagination.page).toBe(5);
    expect(pagination.limit).toBe(20);
  });
});
