import { expect } from 'chai';
import { UserService } from '../../src/services/UserService'
import 'mocha';

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = hello();
    expect(result).to.equal('Hello World!');
  });
});