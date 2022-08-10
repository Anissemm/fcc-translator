const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let translate = require('../components/translator.js');

suite('Functional Tests', () => {
    suite('Translation with =>', () => {
        test('Text and locale fields', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    locale: 'american-to-british',
                    text: 'I ate yogurt for breakfast.'
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    const expectedOutput = translate('I ate yogurt for breakfast.', 'american-to-british').translationWithHighlight;
                    assert.isObject(res.body, 'translation response must be an object');
                    assert.property(res.body, 'text', 'response object must have a \'text\' property');
                    assert.property(res.body, 'translation', 'response object must have a \'translation\' property');
                    assert.isString(res.body.text, 'text property must be of type string');
                    assert.isString(res.body.text, 'translation property must be of type string');
                    assert.equal(res.body.text, 'I ate yogurt for breakfast.');
                    assert.equal(res.body.translation, expectedOutput);
                    done();
                });
        });

        test('Text and invalid locale field', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    locale: 'american-to-french',
                    text: 'I ate yogurt for breakfast.'
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    assert.isObject(res.body, 'translation response must be an object');
                    assert.property(res.body, 'error', 'response object must have a \'error\' property');
                    assert.isString(res.body.error, 'error property must be of type string');
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                });
        });

        test('Missing text field', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    assert.isObject(res.body, 'translation response must be an object');
                    assert.property(res.body, 'error', 'response object must have a \'error\' property');
                    assert.isString(res.body.error, 'error property must be of type string');
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('Missing locale field', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'I ate yogurt for breakfast.'
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    assert.isObject(res.body, 'translation response must be an object');
                    assert.property(res.body, 'error', 'response object must have a \'error\' property');
                    assert.isString(res.body.error, 'error property must be of type string');
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('Empty text', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    locale: 'american-to-british',
                    text: ''
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    assert.isObject(res.body, 'translation response must be an object');
                    assert.property(res.body, 'error', 'response object must have a \'error\' property');
                    assert.isString(res.body.error, 'error property must be of type string');
                    assert.equal(res.body.error, 'No text to translate');
                    done();
                });
        });

        test('Text that needs no translation', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    locale: 'american-to-british',
                    text: 'no need to translate'
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    assert.isObject(res.body, 'translation response must be an object');
                    assert.property(res.body, 'text', 'response object must have a \'text\' property');
                    assert.property(res.body, 'translation', 'response object must have a \'translation\' property');
                    assert.isString(res.body.text, 'text property must be of type string');
                    assert.isString(res.body.text, 'translation property must be of type string');
                    assert.equal(res.body.text, 'no need to translate');
                    assert.equal(res.body.translation, 'Everything looks good to me!');
                    done();
                });
        });
    });
});
