import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WelcomeView from '@/views/WelcomeView.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(WelcomeView)
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
