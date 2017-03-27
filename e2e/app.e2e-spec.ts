import { BlueWhalePage } from './app.po';

describe('blue-whale App', () => {
  let page: BlueWhalePage;

  beforeEach(() => {
    page = new BlueWhalePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
