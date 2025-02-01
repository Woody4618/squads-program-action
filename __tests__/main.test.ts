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
          return 'https://api.mainnet-beta.solana.com'
        case 'program':
          return 'Prog1111111111111111111111111111111111111'
        case 'buffer':
          return 'Buff1111111111111111111111111111111111111'
        case 'keypair':
          return '[1,2,3]'
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
