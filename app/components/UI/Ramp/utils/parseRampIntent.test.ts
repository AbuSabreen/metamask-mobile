import parseRampIntent from './parseRampIntent';

describe('parseRampIntent', () => {
  it('should return undefined if pathParams do not contain necessary fields', () => {
    const pathParams = {};
    const result = parseRampIntent(pathParams);
    expect(result).toBeUndefined();
  });

  it('should return a RampIntent object if pathParams contain necessary fields', () => {
    const pathParams = {
      address: '0x1234567890',
      chainId: '1',
      amount: '10',
      currency: 'usd',
    };
    const result = parseRampIntent(pathParams);
    expect(result).toEqual({
      address: '0x1234567890',
      chainId: '1',
      amount: '10',
      currency: 'usd',
    });
  });

  it('should default to chainId 1 if token address is defined but chainId is not', () => {
    const pathParams = {
      address: '0x1234567890',
      chainId: undefined,
      amount: '10',
      currency: 'usd',
    };
    const result = parseRampIntent(pathParams);
    expect(result).toEqual({
      address: '0x1234567890',
      chainId: '1',
      amount: '10',
      currency: 'usd',
    });
  });

  it('should return a RampIntent object with only defined fields', () => {
    const pathParams = {
      address: '0x1234567890',
      chainId: '76',
      amount: '10',
      currency: 'usd',
      extraneaous: 'field',
    };
    const result = parseRampIntent(pathParams);
    expect(result).toEqual({
      address: '0x1234567890',
      chainId: '76',
      amount: '10',
      currency: 'usd',
    });
  });

  it('should return a RampIntent object with only defined values', () => {
    const pathParams = { chainId: '56', amount: undefined, address: undefined };
    const result = parseRampIntent(pathParams);
    expect(result).toEqual({ chainId: '56' });
  });
});
