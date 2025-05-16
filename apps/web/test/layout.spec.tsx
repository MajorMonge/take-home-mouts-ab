import { metadata } from '../src/app/layout';
import { describe, it, expect } from '@jest/globals';

describe('Root layout', () => {
  describe('metadata', () => {
    it('should be exported', () => {
      expect(metadata).toBeDefined();
    });

    it('should contain a `title` and `description`', () => {
      expect(metadata).toHaveProperty('title');
      expect(metadata).toHaveProperty('description');
    });

    it('should have the correct title', () => {
      expect(metadata.title).toBe('Next App');
    });

    it('should have the correct description', () => {
      expect(metadata.description).toBe('next app');
    });
  });
});
