// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {


    before : function(client) {
        client.globals.waitForConditionTimeout = 5000;
    },

  'default autharisation test': function (client) {
      client
          .url('http://localhost:8080')
          .waitForElementVisible('#app', 5000)
          .setValue('input#password', "-1")
          .setValue('input#email', "-1")
          .click('button[name="submit"]')
          .waitForElementVisible('.error.toasted', 1000)
          .verify.containsText('.error.toasted', "Enter your valid email");


      client
          .clearValue('input#password')
          .setValue('input#password', "3453sssssss4")
          .clearValue('input#email')
          .setValue('input#email', 'zhitkov100@gmail.com')
          .click('button[name="submit"]')
          .waitForElementVisible('.error.toasted', 5000)
          .verify.containsText('.error.toasted', "Enter your valid password");

      client
          .clearValue('input#password')
          .setValue('input#password', "34534")
          .clearValue('input#email')
          .setValue('input#email', 'zhitkov100@gmail.com')
          .click('button[name="submit"]')
          .waitForElementVisible('.error.toasted', 5000)
          .verify.containsText('.error.toasted', "The password must be at least 8 characters in length");
  },
'wallets': function (client) {

      client
            .clearValue('input#email')
            .setValue('input#email', 'zhitkov100@gmail.com')
            .clearValue('input#password')
            .setValue('input#password', 'qweqweqwe')
            .click('button[name="submit"]')
            .waitForElementVisible('.toasted', 5000)
            .verify.containsText('.toasted', "Autharizathion access")
      client
            .waitForElementVisible('div.wallet', 5000)
          .waitForElementVisible('div[id="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]')
            .click('div[id="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]')
            .click('button.buttons.btn-default')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .click('button#btnCopyAddress')
          .timeoutsImplicitWait(2000)
            .waitForElementVisible('.success', 5000)
            .verify.containsText('.success', "You have successfully copied the address of the wallet");

    client
            .waitForElementVisible('div.wallet', 5000)
            .timeoutsImplicitWait(2000)
            .click('div[id="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ]"')
            .click('button.buttons.btn-yellow')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .setValue('input#amount', "0-12")
            // .click('input#address')
            .setValue('input#address', function(){
                document.querySelector('div').addEventListener('paste', (e) => {
                    console.log(e);
                    window.setTimeout(() => {

                    });
                });
             });
    client
        .pause(1000)
},
    after : function(client) {
        client.end();
    },
};
