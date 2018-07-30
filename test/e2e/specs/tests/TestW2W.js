// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Here we check operations with two account wallet

var t = 5000;

module.exports = {

    before : function(client) {
        client.globals.waitForConditionTimeout = t;
    },




    'here we sent from my wallet to wallet on another account': function (client) {
        var data = client.globals;

        // <-

        client
            .url(data.localhost)
            .execute("localStorage.clear()")
            .waitForElementVisible('#app', t)
            .waitForElementVisible('input#email', 5000)
            .clearValue('input#email')
            .setValue('input#email', data.user.one.mail)
            .clearValue('input#password')
            .timeoutsImplicitWait(t)
            .setValue('input#password', data.user.one.pass)
            .click('button[name="submit"]')
            .verify.containsText('.success', "Autharizathion access!");


        // ->

        client
            .url(data.localhost)
            .waitForElementVisible('#app', t)
            .waitForElementVisible('input#email', 5000)
            .clearValue('input#email')
            .setValue('input#email', data.user.two.mail)
            .clearValue('input#password')
            .timeoutsImplicitWait(t)
            .setValue('input#password', data.user.two.pass)
            .click('button[name="submit"]')
            .verify.containsText('.success', "Autharizathion access!");


        client
            .execute("document.getElementById('"+data.user.two.wId2+"').click();")
            .waitForElementVisible('button.buttons.btn-yellow', 3000)
            .click('button.buttons.btn-yellow')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .setValue('input#amount', "2")
            .timeoutsImplicitWait(t)
            .setValue('input#address', data.user.one.wId1)
            .click('button#check-poss-send')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .click('button#send-coins')
            .waitForElementVisible('.success', 5000)
            .verify.containsText('.success', "You have successfully send coins to the wallet")
        // .verify.containsText('div[type="'+data.user.one.wId1+'"]>.wrap-in-wallet>.wallet', "0");
    },


    after: function (client) {
        client.end();
    }
};
