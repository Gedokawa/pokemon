import { UrlToIdPipe } from './url-to-id.pipe';

describe('UrlToIdPipe', () => {
  it('create an instance', () => {
    const pipe = new UrlToIdPipe();
    expect(pipe).toBeTruthy();
  });
});
