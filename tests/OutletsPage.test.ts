import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import OutletsPage from 'src/pages/OutletsPage.vue'

describe('OutletsPage', () => {
  it('renders outlet table', () => {
    const wrapper = mount(OutletsPage)
    expect(wrapper.exists()).toBe(true)
  })
})
