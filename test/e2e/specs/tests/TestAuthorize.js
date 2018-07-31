// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Here we check authorisation

var t = 5000;

module.exports = {

    before : function(client) {
        client.globals.waitForConditionTimeout = t;
    },

  'default autharisation test': function (client) {
      var data = client.globals;

      client
          .url(data.localhost)
          .waitForElementVisible('#app', t)
          .execute("localStorage.clear()")
          .setValue('input#password', "-1")
          .setValue('input#email', "-1")
          .click('button[name="submit"]')
          .timeoutsImplicitWait(t);


      client
          .clearValue('input#password')
          .setValue('input#password', "3453sssssss4")
          .clearValue('input#email')
          .setValue('input#email', data.user.one.mail)
          .click('button[name="submit"]')
          .waitForElementVisible('.error-block', 5000)
          .verify.containsText('.error-block', 'Login or password is incorrect');

      client
          .clearValue('input#password')
          .setValue('input#password', "34534")
          .clearValue('input#email')
          .setValue('input#email', data.user.one.mail)
          .click('button[name="submit"]')
          .waitForElementVisible('.error-block', 5000)
          .verify.containsText('.error-block', 'password must be 8 symbols length');

      client
          .waitForElementVisible('input#email', 5000)
          .clearValue('input#email')
          .setValue('input#email', data.user.one.mail)
          .clearValue('input#password')
          .timeoutsImplicitWait(t)
          .setValue('input#password', data.user.one.pass)
          .click('button[name="submit"]')
          .waitForElementVisible('.success', 5000)
          .timeoutsImplicitWait(t)
          .verify.containsText('.success', "Autharizathion access!")
          .waitForElementVisible('.waitForAppearTheWalletAccount', 5000)
          .end();
  }
};
