/**
 * Simple PubSub (Publish-Subscribe) module for cross-module communication.
 */
const events = {};

/**
 * Subscribe to an event.
 * @param {string} eventName - The name of the event to listen for.
 * @param {Function} fn - The callback function to execute when the event is emitted.
 */
function on(eventName, fn) {
  events[eventName] = events[eventName] || [];
  events[eventName].push(fn);
}

/**
 * Unsubscribe from an event.
 * @param {string} eventName - The name of the event.
 * @param {Function} fn - The specific function to remove.
 */
function off(eventName, fn) {
  if (events[eventName]) {
    events[eventName] = events[eventName].filter((f) => f !== fn);
  }
}

/**
 * Emit an event, calling all subscribed functions.
 * @param {string} eventName - The name of the event to emit.
 * @param {any} data - The data to pass to the subscribers.
 */
function emit(eventName, data) {
  if (events[eventName]) {
    events[eventName].forEach((fn) => fn(data));
  }
}

export const pubsub = {
  on,
  off,
  emit,
};
