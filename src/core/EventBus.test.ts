import { expect } from 'chai';
import EventBus, { Listener } from './EventBus'; // Adjust the import path based on your setup

describe('EventBus', () => {
  describe('on', () => {
    it('should register a listener for an event', () => {
      const eventBus = new EventBus<'test-event'>();
      const mockCallback: Listener<[string, string]> = () => {}; // Explicit types
      eventBus.on('test-event', mockCallback);

      expect(eventBus['listeners']['test-event']).to.include(mockCallback);
    });
  });

  describe('emit', () => {
    it('should call listeners when an event is emitted', () => {
      const eventBus = new EventBus<'test-event'>();
      let called = false;
      const mockCallback: Listener<[string, string]> = (arg1: string, arg2: string) => {
        called = true;
        expect(arg1).to.equal('arg1'); // First expect
        expect(arg2).to.equal('arg2'); // Second expect
      };

      eventBus.on('test-event', mockCallback);
      eventBus.emit('test-event', 'arg1', 'arg2');

      expect(called).to.be.true; // Ensure callback was called
    });

    it('should throw an error if the event has no listeners', () => {
      const eventBus = new EventBus<'test-event'>();
      expect(() => eventBus.emit('non-existing-event' as 'test-event')).to.throw('Нет события: non-existing-event');
    });
  });

  describe('off', () => {
    it('should remove a listener for an event', () => {
      const eventBus = new EventBus<'test-event'>();
      const mockCallback: Listener<[string, string]> = () => {};
      eventBus.on('test-event', mockCallback);
      eventBus.off('test-event', mockCallback);

      expect(eventBus['listeners']['test-event']).to.not.include(mockCallback);
    });

    it('should throw an error when trying to remove a listener from a non-existing event', () => {
      const eventBus = new EventBus<'test-event'>();
      const mockCallback: Listener<[string, string]> = () => {};
      expect(() => eventBus.off('non-existing-event' as 'test-event', mockCallback)).to.throw('Нет события: non-existing-event');
    });
  });

  describe('Integration tests', () => {
    it('should handle multiple listeners for an event', () => {
      const eventBus = new EventBus<'test-event'>();
      let called1 = false;
      let called2 = false;

      const mockCallback1: Listener<[string]> = (arg: string) => {
        called1 = true;
        expect(arg).to.equal('arg1'); // Ensure first listener received the correct argument
      };

      const mockCallback2: Listener<[string]> = (arg: string) => {
        called2 = true;
        expect(arg).to.equal('arg1'); // Ensure second listener received the correct argument
      };

      eventBus.on('test-event', mockCallback1);
      eventBus.on('test-event', mockCallback2);

      eventBus.emit('test-event', 'arg1');

      expect(called1).to.be.true; // Ensure first callback was called
      expect(called2).to.be.true; // Ensure second callback was called
    });

    it('should allow removing specific listeners without affecting others', () => {
      const eventBus = new EventBus<'test-event'>();
      let called1 = false;
      let called2 = false;

      const mockCallback1: Listener<[]> = () => {
        called1 = true;
      };

      const mockCallback2: Listener<[]> = () => {
        called2 = true;
      };

      eventBus.on('test-event', mockCallback1);
      eventBus.on('test-event', mockCallback2);

      eventBus.off('test-event', mockCallback1);
      eventBus.emit('test-event');

      expect(called1).to.be.false; // Ensure first callback was removed
      expect(called2).to.be.true;  // Ensure second callback was called
    });
  });
});
