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
          .timeoutsImplicitWait(1000)
          .waitForElementVisible('.error.toasted', 1000)
          .verify.containsText('.error.toasted', "Enter your valid email");


      client
          .timeoutsImplicitWait(1000)
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
        .waitForElementVisible('input#email', 5000)
        .clearValue('input#email')
        .setValue('input#email', 'zhitkov100@gmail.com')
        .clearValue('input#password')
        .timeoutsImplicitWait(1000)
        .setValue('input#password', 'qweqweqwe')
        .click('button[name="submit"]')
        .waitForElementVisible('.toasted', 5000)
        .verify.containsText('.toasted', "Autharizathion access!");

    client
        .waitForElementVisible('div[type="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]')
        .click('div[type="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]')
        .click('button.buttons.btn-default')
        .waitForElementVisible('.v--modal-box.v--modal', 5000)
        .click('button#btnCopyAddress')
        .timeoutsImplicitWait(2000)
        .waitForElementVisible('.success', 5000)
        .verify.containsText('.success', "You have successfully copied the address of the wallet");
},

    'here we check wallet logic': function (client) {
        client
            .waitForElementVisible('div.wallet', 5000)
            .timeoutsImplicitWait(2000)
            .click('div[type="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]')
            .timeoutsImplicitWait(1000)
            .waitForElementVisible('button.buttons.btn-yellow', 5000)
            .click('button.buttons.btn-yellow')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .clearValue('input#amount')
            .setValue('input#amount', "2")
            .clearValue('input#address')
            .setValue('input#address', "7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR")
            .click('button#check-poss-send')
            .timeoutsImplicitWait(1000)
            .waitForElementVisible('.error', 5000)
            .verify.containsText('.error', "You can not send more coins than there are in your account")
            .clearValue('input#amount')
            .clearValue('input#address')
            .setValue('input#amount', "000000")
            .click('button#check-poss-send')
            .waitForElementVisible('.error', 5000)
            .verify.containsText('.error', "send greater than 0")
            .waitForElementVisible('.close', 5000)
            .click('.close');
    },

    'here we check sending coins from one my wallet to another my wallet': function (client) {
        client
            .waitForElementVisible('div.wallet', 5000)
            .timeoutsImplicitWait(2000)
            .waitForElementVisible('div[type="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ"]', 5000)
            .click('div[type="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ"]')
            .waitForElementVisible('button.buttons.btn-yellow', 5000)
            .timeoutsImplicitWait(2000)
            .click('button.buttons.btn-yellow')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .timeoutsImplicitWait(1000)
            .setValue('input#amount', "2")
            .setValue('input#address', "7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR")
            .waitForElementVisible('button#check-poss-send', 5000)
            .click('button#check-poss-send')
            .click('button#send-coins')
            .timeoutsImplicitWait(1000)
            .waitForElementVisible('.success', 5000)
            .verify.containsText('.success', "You have successfully copied the address of the wallet");

        client
            .click('div[type="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]')
            .waitForElementVisible('button.buttons.btn-yellow', 3000)
            .click('button.buttons.btn-yellow')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .setValue('input#amount', "2")
            .timeoutsImplicitWait(1000)
            .setValue('input#address', "7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR")
            .click('button#check-poss-send')
            .waitForElementVisible('.error', 5000)
            .verify.containsText('.error', "you cant send tockens to yourself")
            .click('button.buttons.btn-yellow')
            .timeoutsImplicitWait(1000)
            .setValue('input#address', "w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ")
            .click('button#check-poss-send')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .click('button#send-coins')
            .timeoutsImplicitWait(1000)
    },

    'here we sent from my wallet to wallet on another account': function (client) {
        client
            .click('.close')
            .timeoutsImplicitWait(2000)
            .waitForElementVisible('div[type="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ"]', 5000)
            .click('div[type="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ"]')
            .timeoutsImplicitWait(1000)
            .click('button.buttons.btn-yellow')
            .waitForElementVisible('.v--modal-box.v--modal', 5000)
            .setValue('input#amount', "2")
            .setValue('input#address', "B6oS7w1u9ue1p5TOAgu7190u1uL644fUVGMCuKYGzqSO6LP")
            .click('button#check-poss-send')
            .click('button#send-coins')
            .waitForElementVisible('.success', 5000)
            .verify.containsText('.success', "Successful transaction")
            .verify.containsText('div[type="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]>.wrap-in-wallet>.wallet', "98");




    client
        .pause(1000)
},
    after : function(client) {
        client.end();
    },
};



// // For authoring Nightwatch tests, see
// // http://nightwatchjs.org/guide#usage
//
// module.exports = {
//
//
//     before : function(client) {
//         client.globals.waitForConditionTimeout = 5000;
//     },
//
//     'default autharisation test': function (client) {
//         client
//             .url('http://localhost:8080')
//             .waitForElementVisible('#app', 5000)
//             .setValue('input#password', "-1")
//             .setValue('input#email', "-1")
//             .click('button[name="submit"]')
//             .timeoutsImplicitWait(1000)
//             .waitForElementVisible('.error.toasted', 1000)
//             .verify.containsText('.error.toasted', "Enter your valid email");
//
//
//         client
//             .timeoutsImplicitWait(1000)
//             .clearValue('input#password')
//             .setValue('input#password', "3453sssssss4")
//             .clearValue('input#email')
//             .setValue('input#email', 'zhitkov100@gmail.com')
//             .click('button[name="submit"]')
//             .waitForElementVisible('.error.toasted', 5000)
//             .verify.containsText('.error.toasted', "Enter your valid password");
//
//         client
//             .timeoutsImplicitWait(1000)
//             .clearValue('input#password')
//             .setValue('input#password', "34534")
//             .clearValue('input#email')
//             .setValue('input#email', 'zhitkov100@gmail.com')
//             .click('button[name="submit"]')
//             .waitForElementVisible('.error.toasted', 5000)
//             .verify.containsText('.error.toasted', "The password must be at least 8 characters in length");
//     },
//     'wallets': function (client) {
//
//         client
//             .timeoutsImplicitWait(1000)
//             .clearValue('input#email')
//             .setValue('input#email', 'zhitkov100@gmail.com')
//             .clearValue('input#password')
//             .setValue('input#password', 'qweqweqwe')
//             .click('button[name="submit"]')
//             .waitForElementVisible('.toasted', 5000)
//             .verify.containsText('.toasted', "Autharizathion access");
//
//         client
//             .waitForElementVisible('div.wallet', 5000)
//             .waitForElementVisible('div[type="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]')
//             .click('div[type="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]')
//             .click('button.buttons.btn-default')
//             .waitForElementVisible('.v--modal-box.v--modal', 5000)
//             .click('button#btnCopyAddress')
//             .timeoutsImplicitWait(2000)
//             .waitForElementVisible('.success', 5000)
//             .verify.containsText('.success', "You have successfully copied the address of the wallet");
//     },
//
//     'here we check wallet logic': function (client) {
//         client
//             .waitForElementVisible('div.wallet', 5000)
//             .timeoutsImplicitWait(2000)
//             .click('div[type="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ"]')
//             .timeoutsImplicitWait(1000)
//             .click('button.buttons.btn-yellow')
//             .waitForElementVisible('.v--modal-box.v--modal', 5000)
//             .clearValue('input#amount')
//             .setValue('input#amount', "2")
//             .clearValue('input#address')
//             .setValue('input#address', "w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ")
//             .click('button#check-poss-send')
//             .timeoutsImplicitWait(1000)
//             .waitForElementVisible('.error', 5000)
//             .verify.containsText('.error', "You can not send more coins than there are in your account")
//             .clearValue('input#amount')
//             .setValue('input#amount', "0-020")
//             .clearValue('input#address')
//             .setValue('input#amount', "as")
//             .click('button#check-poss-send')
//             .waitForElementVisible('.error', 5000)
//             .verify.containsText('.error', "You can not send more coins than there are in your account");
//     },
//
//     'here we check sending coins from one my wallet to another my wallet': function (client) {
//         client
//             .waitForElementVisible('div.wallet', 5000)
//             .timeoutsImplicitWait(2000)
//             .waitForElementVisible('div[type="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ"]', 5000)
//             .click('div[type="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ"]')
//             .timeoutsImplicitWait(1000)
//             .click('button.buttons.btn-yellow')
//             .waitForElementVisible('.v--modal-box.v--modal', 5000)
//             .timeoutsImplicitWait(1000)
//             .setValue('input#amount', 2)
//             .setValue('input#address', "7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR")
//             .click('button#check-poss-send')
//             .waitForElementVisible('.v--modal-box.v--modal', 5000)
//             .click('button#check-poss-send')
//             .click('button#send-coins')
//             .timeoutsImplicitWait(1000)
//             .waitForElementVisible('.success', 5000)
//             .verify.containsText('.success', "You have successfully copied the address of the wallet")
//
//             .click('div[type="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]')
//             .timeoutsImplicitWait(1000)
//             .click('button.buttons.btn-yellow')
//             .waitForElementVisible('.v--modal-box.v--modal', 5000)
//             .clearValue('input#amount')
//             .setValue('input#amount', "2")
//             .setValue('input#address', "7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR")
//             .click('button#check-poss-send')
//             .waitForElementVisible('.v--modal-box.v--modal', 5000)
//             .click('button#check-poss-send')
//             .click('button#send-coins')
//             .timeoutsImplicitWait(1000)
//     },
//
//     'here we sent from my wallet to wallet on another account': function (client) {
//         client
//             .click('.close')
//             .timeoutsImplicitWait(2000)
//             .waitForElementVisible('div[type="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ"]', 5000)
//             .click('div[type="w8LgnPbbwow26XUYg65zucnGVRxJCf6antc6HbSHnOLDUgZ"]')
//             .timeoutsImplicitWait(1000)
//             .click('button.buttons.btn-yellow')
//             .waitForElementVisible('.v--modal-box.v--modal', 5000)
//             .setValue('input#amount', "2")
//             .setValue('input#address', "B6oS7w1u9ue1p5TOAgu7190u1uL644fUVGMCuKYGzqSO6LP")
//             .click('button#check-poss-send')
//             .click('button#send-coins')
//             .waitForElementVisible('.success', 5000)
//             .verify.containsText('.success', "Successful transaction")
//             .verify.containsText('div[type="7LR41yw1OapLoYmxjYhXYpAdwyB9nMHbxpSScQOkYdL14KR"]>.wrap-in-wallet>.wallet', "98");
//
//
//
//
//         client
//             .pause(1000)
//     },
//     after : function(client) {
//         client.end();
//     },
// };
