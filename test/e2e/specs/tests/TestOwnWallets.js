// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Here we check wallets operations in particular:
// operations with own wallet, own wallets

var t = 5000;

module.exports = {

    before : function(client) {
        client.globals.waitForConditionTimeout = t;
    },

'wallets': function (client) {
    var data = client.globals;

    client
        .url(data.localhost)
        .waitForElementVisible('#app', t)
        .execute("localStorage.clear()")
        .waitForElementVisible('input#email', 5000)
        .setValue('input#email', "--error0--")
        .click('input#email')
        .keys([data.keys.CONTROL,'a'])
        .keys([data.keys.CONTROL,'c'])
        .clearValue('input#email')
        .setValue('input#email', data.user.one.mail)
        .clearValue('input#password')
        .timeoutsImplicitWait(t)
        .setValue('input#password', data.user.one.pass)
        .click('button[name="submit"]')
        // .waitForElementVisible('.success', 5000)
        .verify.containsText('.success', "Autharizathion access!");

    client
        // .waitForElementVisible('div[name="'+data.user.one.wId1+'"]')
        .execute("document.getElementById('"+data.user.one.wId1+"').click();")
        .click('button.buttons.btn-default')
        .waitForElementVisible('.v--modal-box.v--modal', 5000)
        .click('button#btnCopyAddress')
        .waitForElementVisible('.success', 5000)
        .assert.containsText('.success', "You have successfully copied the address of the wallet");
},

    'here we check wallet logic': function (client) {
        var data = client.globals;

        client
            .waitForElementVisible('div.wallet', 5000)
            .timeoutsImplicitWait(t)
            .execute("document.getElementById('"+data.user.one.wId1+"').click();")
            .timeoutsImplicitWait(t)
            .waitForElementVisible('button.buttons.btn-yellow', 5000)
            .click('button.buttons.btn-yellow')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .clearValue('input#amount')
            .setValue('input#amount', "2")
            .clearValue('input#address')
            .setValue('input#address', data.user.one.wId1)
            .click('button#check-poss-send')
            .waitForElementVisible('.error', 5000)
            .verify.containsText('.error', "You can not send coins to your account");

        client
            .clearValue('input#amount')
            .clearValue('input#address')
            .setValue('input#amount', "000000")
            .setValue('input#address', data.user.one.wId1)
            .click('button#check-poss-send')
            .waitForElementVisible('.error', 5000)
            .verify.containsText('.error', "send greater than 0");

        client
            .clearValue('input#amount')
            .clearValue('input#address')
            .setValue('input#address', data.user.one.wId1)
            .click('input#amount')
            .keys([data.keys.CONTROL,'v'])
            .pause(1000)
            .waitForElementVisible('.error', 5000)
            .verify.containsText('.error', "You cannot send coins to yourself")
    },

    'here we check sending coins from one my wallet to another my wallet': function (client) {
        var data = client.globals;

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

        // <-

        client
        // .waitForElementVisible('div[name="'+data.user.one.wId2+'"]', 5000)
            .execute("document.getElementById('"+data.user.one.wId2+"').click();")
            .click('button.buttons.btn-default')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .click('button#btnCopyAddress')
            .waitForElementVisible('.success', 5000)
            .assert.containsText('.success', "You have successfully copied the address of the wallet");

        client
            .execute("document.getElementById('"+data.user.one.wId2+"').click();")
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
            .verify.containsText('.success', "You have successfully send coins to the wallet");

        // ->

        client
        // .waitForElementVisible('div[name="'+data.user.one.wId2+'"]', 5000)
            .execute("document.getElementById('"+data.user.one.wId2+"').click();")
            .click('button.buttons.btn-default')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .click('button#btnCopyAddress')
            .waitForElementVisible('.success', 5000)
            .verify.containsText('.success', "You have successfully copied the address of the wallet");

        client
            .execute("document.getElementById('"+data.user.one.wId1+"').click();")
            .waitForElementVisible('button.buttons.btn-yellow', 3000)
            .click('button.buttons.btn-yellow')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .setValue('input#amount', "2")
            .timeoutsImplicitWait(t)
            .setValue('input#address', data.user.one.wId2)
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
