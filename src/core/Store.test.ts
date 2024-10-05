import { expect } from 'chai';
import sinon from 'sinon';
import {Store} from './Store';  // Adjust the import path as needed
import { initialState } from './Store';  // Ensure this matches your import structure
import { StoreEvents } from '../types';  // Import your store event types

describe('Store', () => {
  let store: Store<typeof initialState>;

  beforeEach(() => {
    store = new Store(initialState);
  });

  afterEach(() => {
    sinon.restore();  // Restore any stubbed methods after each test
  });

  it('should initialize with the correct initial state', () => {
    const state = store.getState();
    expect(state).to.deep.equal(initialState);
  });

  it('should return the current state when getState is called', () => {
    const state = store.getState();
    expect(state).to.deep.equal(initialState);
  });

  it('should emit the UPDATE event when setState is called without an action', () => {
    const emitStub = sinon.stub(store, 'emit');

    const newState = {
      userInfo: {
        ...initialState.userInfo,
        first_name: 'Jane',
      },
    };

    store.setState(newState);

    expect(emitStub.calledOnceWith(StoreEvents.UPDATE)).to.be.true;
  });

  it('should emit a custom event when setState is called with an action', () => {
    const emitStub = sinon.stub(store, 'emit');
    const customAction = 'CUSTOM_ACTION';

    const newState = {
      userInfo: {
        ...initialState.userInfo,
        first_name: 'Doe',
      },
    };

    store.setState(newState, customAction);

    expect(emitStub.calledOnceWith(customAction)).to.be.true;
  });

  it('should emit the correct event when the state changes', (done) => {
    store.on(StoreEvents.UPDATE, () => {
      const updatedState = store.getState();
      expect(updatedState?.userInfo.first_name).to.equal('Alice');
      done();  // Indicate that the test is complete
    });

    const newState = {
      userInfo: {
        ...initialState.userInfo,
        first_name: 'Alice',
      },
    };

    store.setState(newState);
  });

});
