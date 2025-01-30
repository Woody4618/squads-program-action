import * as core from '@actions/core'
import { main as squadUpgradeMain } from './squad-upgrade.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Retrieve inputs
    const rpc = core.getInput('rpc')
    const program = core.getInput('program')
    const buffer = core.getInput('buffer')
    const idlBuffer = core.getInput('idl-buffer')
    const multisig = core.getInput('multisig')
    const keypair = core.getInput('keypair')
    const pdaTx = core.getInput('pda-tx')

    // Call the squad-upgrade main function with the inputs
    await squadUpgradeMain({
      rpc,
      program,
      buffer,
      idlBuffer,
      multisig,
      keypair,
      pdaTx
    })
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
