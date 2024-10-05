import { expect } from 'chai';
import Block from './Block';
import { BrowseRouter } from './BrowserRouter';
import sinon from 'sinon';

export class Test extends Block {
  protected render(): string {
    // language=hbs
    return `
      <p>Test</p>
    `;
  }
}

describe('Router', () => {
  let router: BrowseRouter;

  beforeEach(() => {
    router = new BrowseRouter();
    router.use('/test-1', Test).use('/test-2', Test).start();
  });

  afterEach(() => {
    sinon.restore();  // Restore any stubbed methods after each test
  });

  it('should be defined', () => {
    expect(router).to.be.an('object');
  });

  it('should increase the history length to 3 when navigating to a new route', () => {
    router.go('/test-3');
    expect(window.history.length).to.equal(3);
  });
});
