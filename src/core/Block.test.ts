import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block';  // Adjust the import path as needed
import EventBus from './EventBus';

// Mocking a simple block class that extends Block
class MockBlock extends Block {
  render(): string {
    return '<div>Test Block</div>';
  }
}

describe('Block', () => {
  let block: MockBlock;
  let eventBus: sinon.SinonStubbedInstance<EventBus<any>>;

  beforeEach(() => {
    // Create a block instance
    block = new MockBlock({});

    // Stub the EventBus
    eventBus = sinon.createStubInstance(EventBus);
    sinon.stub(block, 'eventBus').returns(eventBus);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should correctly set new props with setProps', () => {
    const newProps = { testProp: 'newValue' };
    block.setProps(newProps);

    expect((block as any).props.testProp).to.equal('newValue');
  });

  it('should correctly set new state with setState', () => {
    const newState = { testState: 'newState' };
    block.setState(newState);

    expect((block as any).state.testState).to.equal('newState');
  });

  it('should create a document element in _createDocumentElement', () => {
    const element = block['_createDocumentElement']('div');
    expect(element.tagName.toLowerCase()).to.equal('div');
  });

  it('should hide and show correctly', () => {
    const contentStub = sinon.stub(block, 'getContent').returns(document.createElement('div'));

    block.show();
    expect(contentStub().style.display).to.equal('block');

    block.hide();
    expect(contentStub().style.display).to.equal('none');
  });

  it('should remove and add events correctly', () => {
    const removeEventSpy = sinon.spy(block as any, '_removeEvents');
    const addEventSpy = sinon.spy(block as any, '_addEvents');

    block['_render']();

    expect(removeEventSpy.calledOnce).to.be.true;
    expect(addEventSpy.calledOnce).to.be.true;
  });
});
