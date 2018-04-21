import Vue from 'vue'
import Summary from '@/components/Summary'

describe('Summary.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Summary);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.test-test').textContent)
      .to.equal('im testing')
  })
});
