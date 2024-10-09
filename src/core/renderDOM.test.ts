import { expect } from 'chai';
import sinon from 'sinon';
import renderDOM from './renderDOM';
import Block from './Block';  // Ensure the correct path to Block

describe('renderDOM', () => {
  let block: sinon.SinonStubbedInstance<Block>;
  let rootElement: HTMLElement;

  beforeEach(() => {
    // Create a stub for Block and its getContent method
    block = sinon.createStubInstance(Block);
    const contentElement = document.createElement('div');
    contentElement.innerHTML = '<div>Test Block</div>';
    block.getContent.returns(contentElement);

    // Create a root element and attach it to the DOM
    rootElement = document.createElement('div');
    rootElement.id = 'app';
    document.body.appendChild(rootElement);
  });

  afterEach(() => {
    // Clean up after each test
    sinon.restore();
    document.body.removeChild(rootElement);
  });

  it('should query the DOM for the #app element', () => {
    const querySelectorSpy = sinon.spy(document, 'querySelector');

    renderDOM(block as unknown as Block);

    expect(querySelectorSpy.calledOnceWith('#app')).to.be.true;
  });

  it('should clear the innerHTML of the root element', () => {
    renderDOM(block as unknown as Block);

    expect(rootElement.innerHTML).to.equal('');
  });
});
