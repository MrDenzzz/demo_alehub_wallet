var t = 5000;

module.exports = {

    before : function(client) {
        client.globals.waitForConditionTimeout = t;
    },

  'authorize': function (client) {
      var data = client.globals;

      client
          .url(data.localhost)
          .waitForElementVisible('#app', t)
          .execute("localStorage.clear();")
          .setValue('input#password', "qweqweqwe")
          .setValue('input#email', "zhitkov100@gmail.com")
          .click('button[name="submit"]')
          .timeoutsImplicitWait(t)
          .waitForElementVisible('#app')
          .pause(4000);
        },

  'test create offer': function (client) {
      var data = client.globals;

      client
          .url(data.offerLink)
          .waitForElementVisible('button.buttons.btn-yellow')
          .click('button.buttons.btn-yellow')
          .waitForElementVisible('input#offerName')
          .setValue('input#offerName', " qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe  qweqweqwe qweqweqwe ")
          .click("button.buttons.btn.btn-yellow")
          .verify.containsText('.error', "The name of the offer should be less than XXX symbols");

      client
          .clearValue('input#offerName')
          .setValue('input#offerName', "qweqweqwe")
          .click("button.buttons.btn.btn-yellow")
          .verify.containsText('.error', "You can't create offer without description")
          .waitForElementVisible('textarea#description')
          .setValue('textarea#description', 'qweqweqwe qweqweqwe fghfgh fghf vfcdgdfd')
          .click('input#datepicker-from')
          .execute('document.querySelectorAll("span.cell.month")[5].click()')
          .execute('document.querySelectorAll("span.cell.day")[7].click()')
          .pause(500)
          .execute('document.querySelectorAll("span.cell.month")[17].click()')
          .execute('document.querySelectorAll("span.cell.day")[40].click()')
          .verify.containsText('.error', "The Final Date can't be before Start Date");

      client
          .click('input#datepicker-from')
          .execute('document.querySelectorAll("span.cell.day")[7].click()')
          .pause(500)
          .execute('document.querySelectorAll("span.cell.day")[47].click()')
          .verify.containsText('.error', "Offer Price can't be empty");

      client
          .setValue('input#offerPrice', '-1')
          .click("button.buttons.btn.btn-yellow")
          .verify.containsText('.error', "Offer Price must be more than 0")
          .clearValue('input#offerPrice')
          .setValue('input#offerPrice', '0')
          .verify.containsText('.error', "Offer Price must be more than 0")
          .setValue('input#offerPrice', '1')
          .click("button.buttons.btn.btn-yellow")
          .verify.containsText('.success', "New Offer successfuly crete");
      },

      after: function (client) {
        client.end();
    }
};