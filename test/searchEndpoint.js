/* eslint-disable prefer-destructuring */
const api = require('supertest')('https://kitsu.io/api/edge');
const expect = require('chai').expect;

describe('Search endpoint', () => {
  it('should return response with HTTP Code 200', (done) => {
    api
      .get('/anime?filter[genres]=adventure')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.ok).to.equal(true);
        done();
      });
  });

  it('should support limit parametr', (done) => {
    api
      .get('/anime?&page[limit]=5')
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).to.have.length(5);
        expect(res.body.data[0].id).to.equal('1');
        done();
      });
  });

  it('should throw an error if unknown filter is used', (done) => {
    api
      .get('/anime?filter[theisnosuchfilter]=adventure')
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.badRequest).to.equal(true);
        done();
      });
  });

  it('should support offset parametr', (done) => {
    api
      .get('/anime?page[limit]=1&page[offset]=2')
      .expect(400)
      .end((err, res) => {
        expect(res.body.data[0].id).to.equal('3');
        done();
      });
  });
});
