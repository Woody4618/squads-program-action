export declare function main({ rpc, program, buffer, idlBuffer, multisig: multisigAddress, keypair, vaultIndex, priorityFee, pdaTx }: {
    rpc: string;
    program: string;
    buffer: string;
    idlBuffer: string;
    multisig: string;
    keypair: string;
    vaultIndex: number;
    priorityFee: number;
    pdaTx?: string;
}): Promise<void>;
