const chai = require('chai');
const assert = chai.assert;

const translate = require('../components/translator.js');

suite('Unit Tests', () => {
    suite('Translate to British English =>', () => {
        const locale = 'american-to-british'
        test('Mangoes are my favorite fruit.', (done) => {
            const expectedOutput = 'Mangoes are my favourite fruit.';
            assert.equal(translate('Mangoes are my favorite fruit.', locale)?.translation, expectedOutput);
            done();
        });

        test('I ate yogurt for breakfast.', (done) => {
            const expectedOutput = 'I ate yoghurt for breakfast.';
            assert.equal(translate('I ate yogurt for breakfast.', locale)?.translation, expectedOutput);
            done();
        });

        test('We had a party at my friend\'s condo.', (done) => {
            const expectedOutput = 'We had a party at my friend\'s flat.';
            assert.equal(translate('We had a party at my friend\'s condo.', locale)?.translation, expectedOutput);
            done();
        });

        test('Can you toss this in the trashcan for me?', (done) => {
            const expectedOutput = 'Can you toss this in the bin for me?';
            assert.equal(translate('Can you toss this in the trashcan for me?', locale)?.translation, expectedOutput);
            done();
        });

        test('The parking lot was full.', (done) => {
            const expectedOutput = 'The car park was full.';
            assert.equal(translate('The parking lot was full.', locale)?.translation, expectedOutput);
            done();
        });

        test('Like a high tech Rube Goldberg machine.', (done) => {
            const expectedOutput = 'Like a high tech Heath Robinson device.';
            assert.equal(translate('Like a high tech Rube Goldberg machine.', locale)?.translation, expectedOutput);
            done();
        });

        test('To play hooky means to skip class or work.', (done) => {
            const expectedOutput = 'To bunk off means to skip class or work.';
            assert.equal(translate('To play hooky means to skip class or work.', locale)?.translation, expectedOutput);
            done();
        });

        test('No Mr. Bond, I expect you to die.', (done) => {
            const expectedOutput = 'No Mr Bond, I expect you to die.';
            assert.equal(translate('No Mr. Bond, I expect you to die.', locale)?.translation, expectedOutput);
            done();
        });

        test('Dr. Grosh will see you now.', (done) => {
            const expectedOutput = 'Dr Grosh will see you now.';
            assert.equal(translate('Dr. Grosh will see you now.', locale)?.translation, expectedOutput);
            done();
        });

        test('Lunch is at 12:15 today.', (done) => {
            const expectedOutput = 'Lunch is at 12.15 today.';
            assert.equal(translate('Lunch is at 12:15 today.', locale)?.translation, expectedOutput);
            done();
        });
    });

    suite('Translate to American English =>', () => {
        const locale = 'british-to-american';

        test('We watched the footie match for a while.', (done) => {
            const expectedOutput = 'We watched the soccer match for a while.';
            assert.equal(translate('We watched the footie match for a while.', locale)?.translation, expectedOutput);
            done();
        });

        test('Paracetamol takes up to an hour to work.', (done) => {
            const expectedOutput = 'Tylenol takes up to an hour to work.';
            assert.equal(translate('Paracetamol takes up to an hour to work.', locale)?.translation, expectedOutput);
            done();
        });

        test('First, caramelise the onions.', (done) => {
            const expectedOutput = 'First, caramelize the onions.';
            assert.equal(translate('First, caramelise the onions.', locale)?.translation, expectedOutput);
            done();
        });

        test('I spent the bank holiday at the funfair.', (done) => {
            const expectedOutput = 'I spent the public holiday at the carnival.';
            assert.equal(translate('I spent the bank holiday at the funfair.', locale)?.translation, expectedOutput);
            done();
        });
        
        test('I had a bicky then went to the chippy.', (done) => {
            const expectedOutput = 'I had a cookie then went to the fish-and-chip shop.';
            assert.equal(translate('I had a bicky then went to the chippy.', locale)?.translation, expectedOutput);
            done();
        });

        test('I\'ve just got bits and bobs in my bum bag.', (done) => {
            const expectedOutput = 'I\'ve just got odds and ends in my fanny pack.';
            assert.equal(translate('I\'ve just got bits and bobs in my bum bag.', locale)?.translation, expectedOutput);
            done();
        });

        test('The car boot sale at Boxted Airfield was called off.', (done) => {
            const expectedOutput = 'The swap meet at Boxted Airfield was called off.';
            assert.equal(translate('The car boot sale at Boxted Airfield was called off.', locale)?.translation, expectedOutput);
            done();
        });

        test('Have you met Mrs Kalyani?', (done) => {
            const expectedOutput = 'Have you met Mrs. Kalyani?';
            assert.equal(translate('Have you met Mrs Kalyani?', locale)?.translation, expectedOutput);
            done();
        });

        test('Prof Joyner of King\'s College, London.', (done) => {
            const expectedOutput = 'Prof. Joyner of King\'s College, London.';
            assert.equal(translate('Prof Joyner of King\'s College, London.', locale)?.translation, expectedOutput);
            done();
        });

        test('Tea time is usually around 4 or 4.30.', (done) => {
            const expectedOutput = 'Tea time is usually around 4 or 4:30.';
            assert.equal(translate('Tea time is usually around 4 or 4.30.', locale)?.translation, expectedOutput);
            done();
        });
    });

    suite('Highlight translation =>', () => {
        test('Mangoes are my favorite fruit.', (done) => {
            const expectedOutput = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
            const locale = 'american-to-british';
            assert.equal(translate('Mangoes are my favorite fruit.', locale).translationWithHighlight, expectedOutput);
            done();
        });

        test('I ate yogurt for breakfast.', (done) => {
            const expectedOutput = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
            const locale = 'american-to-british';
            assert.equal(translate('I ate yogurt for breakfast.', locale).translationWithHighlight, expectedOutput);
            done();
        });

        test('We watched the footie match for a while.', (done) => {
            const expectedOutput = 'We watched the <span class="highlight">soccer</span> match for a while.';
            const locale = 'british-to-american';
            assert.equal(translate('We watched the footie match for a while.', locale).translationWithHighlight, expectedOutput);
            done();
        });

        test('Paracetamol takes up to an hour to work.', (done) => {
            const expectedOutput = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
            const locale = 'british-to-american';
            assert.equal(translate('Paracetamol takes up to an hour to work.', locale).translationWithHighlight, expectedOutput);
            done();
        });
    });
});
