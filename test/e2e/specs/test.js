// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    let tap = [' ', 0, -1, '', ['ss', 'asd', 0]];

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .setValue('input[name="password"]', tap)
      .setValue('input[name="login"]', tap)
      .click('button[name="submit"]')
      // .assert.elementPresent('hello')
      // // .assert.containsText('div[type="error"]', 'Enter your valid email')
      // .assert.elementCount('img', 1)
      .end()
  }
}
// import Vue from 'vue';
// import Login from '@/components/Login';
//
//
// describe('Login.vue', () => {
//
//     it('adds a new item to list on click', () => {
//
//         // build component
//         const Constructor = Vue.extend(Login);
//         const ListComponent = new Constructor().$mount();
//
//         // set value of new item
//         ListComponent.setData({
//             email: 'brush my teeth',
//         });
//
//         // find button
//         const button = ListComponent.find('btn-black')[0];
//         button.dispatch('click');
//
//         // assert list contains new item
//         expect(ListComponent.text()).to.contain('brush my teeth');
//         expect(ListComponent.data().authStatus).to.contain('Error');
//     })
// });
