// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    // let sas = ['c', 12, 0, -1, ''];
    // for (let i = 0; i++; i < sas.length){
  'default autharisation test': function (browser) {
        browser
            .url('http://localhost:8080')
            .waitForElementVisible('#app', 5000)
            .setValue('input[name="password"]', -1)
            .setValue('input[name="login"]', '')
            .click('button[name="submit"]')
            .waitForElementVisible('.toasted', 1000)
            .assert.containsText('.toasted', "Enter your valid email")


            .end();
    }
};
