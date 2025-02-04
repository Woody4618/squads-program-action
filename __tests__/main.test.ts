/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'

// Mock the squad-upgrade module
const mockSquadUpgrade = jest.fn()
jest.unstable_mockModule('../src/squad-upgrade.js', () => ({
  main: mockSquadUpgrade
}))

// Mock the core module
jest.unstable_mockModule('@actions/core', () => ({
  getInput: jest.fn(),
  setFailed: jest.fn()
}))

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    // Mock input values
    core.getInput.mockImplementation((name: string) => {
      switch (name) {
        case 'rpc':
          return 'https://api.devnet.solana.com'
        case 'program':
          return 'Prog1111111111111111111111111111111111111'
        case 'buffer':
          return 'Buff1111111111111111111111111111111111111'
        case 'keypair':
          return '[56,15,11,137,47,252,230,29,60,105,12,129,253,186,225,199,160,157,16,79,222,226,70,130,56,42,247,34,19,187,254,119,9,116,146,104,82,128,64,56,117,132,104,202,240,134,101,60,202,123,191,98,9,197,126,206,157,140,136,237,37,166,57,23]'
        default:
          return ''
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Successfully creates upgrade transaction', async () => {
    mockSquadUpgrade.mockImplementation(() => Promise.resolve())
    await run()
    expect(mockSquadUpgrade).toHaveBeenCalled()
  })
})
