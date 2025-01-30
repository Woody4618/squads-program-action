import { AddressLookupTableAccount, Commitment, Connection, Keypair, PublicKey, SignatureStatus, Transaction, TransactionInstruction } from '@solana/web3.js';
export declare const getSimulationComputeUnits: (connection: Connection, instructions: Array<TransactionInstruction>, payer: PublicKey, lookupTables: Array<AddressLookupTableAccount> | [], commitment?: Commitment) => Promise<number | null>;
/**
 * Constants for transaction retry configuration
 */
export declare const RETRY_INTERVAL_MS = 2000;
export declare const RETRY_INTERVAL_INCREASE = 200;
export declare const MAX_RETRIES = 15;
/**
 * Represents the different states of a transaction during its lifecycle
 * @property status - The current status of the transaction
 * @property signature - The transaction signature (only present when status is "sent")
 * @property result - The signature status (only present when status is "confirmed")
 */
export type TxStatusUpdate = {
    status: 'created';
} | {
    status: 'signed';
} | {
    status: 'sent';
    signature: string;
} | {
    status: 'retry';
    signature: string | null;
} | {
    status: 'confirmed';
    result: SignatureStatus;
};
/**
 * Configuration options for transaction retry mechanism
 * @property maxRetries - Maximum number of retry attempts
 * @property initialDelayMs - Delay between retries in milliseconds
 * @property commitment - Desired commitment level for the transaction
 * @property skipPreflight - Whether to skip transaction simulation
 * @property onStatusUpdate - Callback function to receive transaction status updates
 */
export type SendTransactionOptions = Partial<{
    maxRetries: number;
    initialDelayMs: number;
    commitment: Commitment;
    onStatusUpdate: (status: TxStatusUpdate) => void;
    skipPreflight: boolean;
}>;
/**
 * Configuration for compute unit buffer calculation
 * @property multiplier - Multiply simulated units by this value (e.g., 1.1 adds 10%)
 * @property fixed - Add this fixed amount of compute units
 */
export type ComputeUnitBuffer = {
    multiplier?: number;
    fixed?: number;
};
/**
 * Default configuration values for transaction sending
 */
export declare const DEFAULT_SEND_OPTIONS: Required<Omit<SendTransactionOptions, 'onStatusUpdate'>>;
/**
 * Prepares a transaction by adding compute budget instructions
 *
 * @param connection - The Solana connection object
 * @param tx - The transaction to prepare
 * @param payer - The public key of the transaction payer
 * @param priorityFee - Priority fee in microLamports (default: 10000 which is the minimum required for helius to see a transaction as priority)
 * @param computeUnitBuffer - Optional buffer to add to simulated compute units
 *
 * @remarks
 * This function:
 * 1. Adds a compute unit price instruction with the specified priority fee
 * 2. Simulates the transaction to determine required compute units
 * 3. Applies any specified compute unit buffers
 * 4. Adds a compute unit limit instruction based on the simulation
 *
 * The compute unit buffer can be specified as:
 * - A multiplier (e.g., 1.1 adds 10% to simulated units)
 * - A fixed value (e.g., 1000 adds 1000 compute units)
 * - Both (multiplier is applied first, then fixed value is added)
 *
 * Priority Fees:
 * To find an appropriate priority fee, refer to your RPC provider's documentation:
 * - Helius: https://docs.helius.dev/solana-apis/priority-fee-api
 * - Triton: https://docs.triton.one/chains/solana/improved-priority-fees-api
 * - Quicknode: https://www.quicknode.com/docs/solana/qn_estimatePriorityFees
 *
 * @throws If the transaction simulation fails
 *
 * @example
 * ```typescript
 * // Add 10% buffer plus 1000 fixed compute units
 * await prepareTransactionWithCompute(
 *   connection,
 *   transaction,
 *   payer.publicKey,
 *   1000,
 *   { multiplier: 1.1, fixed: 1000 }
 * );
 * ```
 */
export declare function prepareTransactionWithCompute(connection: Connection, tx: Transaction, payer: PublicKey, priorityFee?: number, computeUnitBuffer?: ComputeUnitBuffer, commitment?: Commitment): Promise<void>;
/**
 * Sends a transaction with compute unit optimization and automatic retries
 *
 * @param connection - The Solana connection object
 * @param transaction - The transaction to send
 * @param signers - Array of signers needed for the transaction
 * @param priorityFee - Priority fee in microLamports (default: 10000 which is the minimum required for helius to see a transaction as priority)
 * @param options - Optional configuration for retry mechanism and compute units
 * @returns Promise that resolves to the transaction signature
 *
 * @example
 * ```typescript
 * const signature = await sendTransaction(
 *   connection,
 *   transaction,
 *   [payer],
 *   10000,
 *   {
 *     computeUnitBuffer: { multiplier: 1.1 },
 *     onStatusUpdate: (status) => console.log(status),
 *   }
 * );
 * ```
 */
export declare function sendTransaction(connection: Connection, transaction: Transaction, signers: Keypair[], priorityFee?: number, options?: SendTransactionOptions & {
    computeUnitBuffer?: ComputeUnitBuffer;
}): Promise<string>;
