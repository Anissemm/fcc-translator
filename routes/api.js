'use strict';

const translate = require('../components/translator');

module.exports = function (app) {
  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (!locale || text === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (text === '') {
        return res.json({ error: 'No text to translate' });
      }

      if (!['american-to-british', 'british-to-american'].includes(locale)) {
        return res.json({ error: 'Invalid value for locale field' });
      }

      const translation = translate(text, locale);

      if (!translation) {
        return res.send({ text, translation: "Everything looks good to me!" })

      }

      return res.send({ translation: translation.translationWithHighlight, text })
    });
};
