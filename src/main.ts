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
    const priorityFee = parseInt(core.getInput('priority-fee') || '100000', 10)
    const vaultIndex = parseInt(core.getInput('vault-index') || '0', 10)
    const pdaTx = core.getInput('pda-tx')

    // Validate numeric inputs
    if (isNaN(priorityFee)) throw new Error('Invalid priority fee')
    if (isNaN(vaultIndex)) throw new Error('Invalid vault index')

    // Call the squad-upgrade main function with the inputs
    await squadUpgradeMain({
      rpc,
      program,
      buffer,
      idlBuffer,
      multisig,
      keypair,
      vaultIndex,
      priorityFee,
      pdaTx
    })
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
