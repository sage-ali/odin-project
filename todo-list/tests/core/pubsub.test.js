import { describe, it, expect, vi, beforeEach } from 'vitest';
import { pubsub } from '../../src/core/pubsub.js';

describe('PubSub Module', () => {
  beforeEach(() => {
    // Reset internal state between tests if possible,
    // but since pubsub is a singleton, we might need a reset method or
    // just be careful with event names.
    // For TDD purposes, we'll assume we can't reset and use unique event names.
  });

  it('should allow subscribing to an event and receiving data', () => {
    const handler = vi.fn();
    const testData = { message: 'hello world' };

    pubsub.on('testEvent', handler);
    pubsub.emit('testEvent', testData);

    expect(handler).toHaveBeenCalledWith(testData);
  });

  it('should call all handlers subscribed to the same event', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    pubsub.on('multiHandlerEvent', handler1);
    pubsub.on('multiHandlerEvent', handler2);
    pubsub.emit('multiHandlerEvent', 'data');

    expect(handler1).toHaveBeenCalledWith('data');
    expect(handler2).toHaveBeenCalledWith('data');
  });

  it('should allow unsubscribing from an event', () => {
    const handler = vi.fn();

    pubsub.on('offEvent', handler);
    pubsub.off('offEvent', handler);
    pubsub.emit('offEvent', 'data');

    expect(handler).not.toHaveBeenCalled();
  });

  it('should not throw an error when emitting an event with no subscribers', () => {
    expect(() => {
      pubsub.emit('noSubscribersEvent', 'data');
    }).not.toThrow();
  });

  it('should only remove the specific handler passed to off', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    pubsub.on('selectiveOffEvent', handler1);
    pubsub.on('selectiveOffEvent', handler2);

    pubsub.off('selectiveOffEvent', handler1);
    pubsub.emit('selectiveOffEvent', 'data');

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledWith('data');
  });
});
