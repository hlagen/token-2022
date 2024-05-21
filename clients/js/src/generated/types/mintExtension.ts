/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  Address,
  Codec,
  Decoder,
  Encoder,
  GetDiscriminatedUnionVariant,
  GetDiscriminatedUnionVariantContent,
  Option,
  OptionOrNullable,
  ReadonlyUint8Array,
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getI16Decoder,
  getI16Encoder,
  getMapDecoder,
  getMapEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  getUnitDecoder,
  getUnitEncoder,
  getUtf8Decoder,
  getUtf8Encoder,
  getZeroableOptionDecoder,
  getZeroableOptionEncoder,
} from '@solana/web3.js';
import {
  AccountState,
  AccountStateArgs,
  DecryptableBalance,
  DecryptableBalanceArgs,
  EncryptedBalance,
  EncryptedBalanceArgs,
  TransferFee,
  TransferFeeArgs,
  getAccountStateDecoder,
  getAccountStateEncoder,
  getDecryptableBalanceDecoder,
  getDecryptableBalanceEncoder,
  getEncryptedBalanceDecoder,
  getEncryptedBalanceEncoder,
  getTransferFeeDecoder,
  getTransferFeeEncoder,
} from '.';

export type MintExtension =
  | { __kind: 'Uninitialized' }
  | {
      __kind: 'TransferFeeConfig';
      /** Optional authority to set the fee. */
      transferFeeConfigAuthority: Address;
      /** Withdraw from mint instructions must be signed by this key. */
      withdrawWithheldAuthority: Address;
      /** Withheld transfer fee tokens that have been moved to the mint for withdrawal. */
      withheldAmount: bigint;
      /** Older transfer fee, used if the current epoch < newerTransferFee.epoch. */
      olderTransferFee: TransferFee;
      /** Newer transfer fee, used if the current epoch >= newerTransferFee.epoch. */
      newerTransferFee: TransferFee;
    }
  | {
      __kind: 'TransferFeeAmount';
      /** Withheld transfer fee tokens that can be claimed by the fee authority. */
      withheldAmount: bigint;
    }
  | { __kind: 'MintCloseAuthority'; closeAuthority: Address }
  | {
      __kind: 'ConfidentialTransferMint';
      /**
       * Authority to modify the `ConfidentialTransferMint` configuration and to
       * approve new accounts (if `auto_approve_new_accounts` is true).
       *
       * The legacy Token Multisig account is not supported as the authority.
       */
      authority: Option<Address>;
      /**
       * Indicate if newly configured accounts must be approved by the
       * `authority` before they may be used by the user.
       *
       * * If `true`, no approval is required and new accounts may be used immediately.
       * * If `false`, the authority must approve newly configured accounts (see
       *   `ConfidentialTransferInstruction::ConfigureAccount`).
       */
      autoApproveNewAccounts: boolean;
      /** Authority to decode any transfer amount in a confidential transfer. */
      auditorElgamalPubkey: Option<Address>;
    }
  | {
      __kind: 'ConfidentialTransferAccount';
      /**
       * `true` if this account has been approved for use. All confidential
       * transfer operations for the account will fail until approval is granted.
       */
      approved: boolean;
      /** The public key associated with ElGamal encryption. */
      elgamalPubkey: Address;
      /** The low 16 bits of the pending balance (encrypted by `elgamal_pubkey`). */
      pendingBalanceLow: EncryptedBalance;
      /** The high 48 bits of the pending balance (encrypted by `elgamal_pubkey`). */
      pendingBalanceHigh: EncryptedBalance;
      /** The available balance (encrypted by `encrypiton_pubkey`). */
      availableBalance: EncryptedBalance;
      /** The decryptable available balance. */
      decryptableAvailableBalance: DecryptableBalance;
      /** If `false`, the extended account rejects any incoming confidential transfers. */
      allowConfidentialCredits: boolean;
      /** If `false`, the base account rejects any incoming transfers. */
      allowNonConfidentialCredits: boolean;
      /** The total number of `Deposit` and `Transfer` instructions that have credited `pending_balance`. */
      pendingBalanceCreditCounter: bigint;
      /**
       * The maximum number of `Deposit` and `Transfer` instructions that can
       * credit `pending_balance` before the `ApplyPendingBalance`
       * instruction is executed.
       */
      maximumPendingBalanceCreditCounter: bigint;
      /**
       * The `expected_pending_balance_credit_counter` value that was included in
       * the last `ApplyPendingBalance` instruction.
       */
      expectedPendingBalanceCreditCounter: bigint;
      /**
       * The actual `pending_balance_credit_counter` when the last
       * `ApplyPendingBalance` instruction was executed.
       */
      actualPendingBalanceCreditCounter: bigint;
    }
  | { __kind: 'DefaultAccountState'; state: AccountState }
  | { __kind: 'ImmutableOwner' }
  | {
      __kind: 'MemoTransfer';
      /** Require transfers into this account to be accompanied by a memo. */
      requireIncomingTransferMemos: boolean;
    }
  | { __kind: 'NonTransferable' }
  | {
      __kind: 'InterestBearingConfig';
      rateAuthority: Address;
      initializationTimestamp: bigint;
      preUpdateAverageRate: number;
      lastUpdateTimestamp: bigint;
      currentRate: number;
    }
  | {
      __kind: 'CpiGuard';
      /** Lock certain token operations from taking place within CPI for this account. */
      lockCpi: boolean;
    }
  | { __kind: 'PermanentDelegate'; delegate: Address }
  | { __kind: 'NonTransferableAccount' }
  | {
      __kind: 'TransferHook';
      /** The transfer hook update authority. */
      authority: Address;
      /** The transfer hook program account. */
      programId: Address;
    }
  | {
      __kind: 'TransferHookAccount';
      /**
       * Whether or not this account is currently transferring tokens
       * True during the transfer hook cpi, otherwise false.
       */
      transferring: boolean;
    }
  | {
      __kind: 'ConfidentialTransferFee';
      /** Optional authority to set the withdraw withheld authority ElGamal key. */
      authority: Option<Address>;
      /**
       * Withheld fees from accounts must be encrypted with this ElGamal key.
       *
       * Note that whoever holds the ElGamal private key for this ElGamal public
       * key has the ability to decode any withheld fee amount that are
       * associated with accounts. When combined with the fee parameters, the
       * withheld fee amounts can reveal information about transfer amounts.
       */
      elgamalPubkey: Address;
      /** If `false`, the harvest of withheld tokens to mint is rejected. */
      harvestToMintEnabled: boolean;
      /**
       * Withheld confidential transfer fee tokens that have been moved to the
       * mint for withdrawal.
       */
      withheldAmount: EncryptedBalance;
    }
  | {
      __kind: 'ConfidentialTransferFeeAmount';
      /** Amount withheld during confidential transfers, to be harvest to the mint. */
      withheldAmount: EncryptedBalance;
    }
  | {
      __kind: 'MetadataPointer';
      /** Optional authority that can set the metadata address. */
      authority: Option<Address>;
      /** Optional Account Address that holds the metadata. */
      metadataAddress: Option<Address>;
    }
  | {
      __kind: 'TokenMetadata';
      /** The authority that can sign to update the metadata. */
      updateAuthority: Option<Address>;
      /** The associated mint, used to counter spoofing to be sure that metadata belongs to a particular mint. */
      mint: Address;
      /** The longer name of the token. */
      name: string;
      /** The shortened symbol for the token. */
      symbol: string;
      /** The URI pointing to richer metadata. */
      uri: string;
      /** Any additional metadata about the token as key-value pairs. */
      additionalMetadata: Map<string, string>;
    }
  | {
      __kind: 'GroupPointer';
      /** Optional authority that can set the group address. */
      authority: Option<Address>;
      /** Optional account address that holds the group. */
      groupAddress: Option<Address>;
    }
  | {
      __kind: 'TokenGroup';
      /** The authority that can sign to update the group. */
      updateAuthority: Option<Address>;
      /** The associated mint, used to counter spoofing to be sure that group belongs to a particular mint. */
      mint: Address;
      /** The current number of group members. */
      size: number;
      /** The maximum number of group members. */
      maxSize: number;
    }
  | {
      __kind: 'GroupMemberPointer';
      /** Optional authority that can set the member address. */
      authority: Option<Address>;
      /** Optional account address that holds the member. */
      memberAddress: Option<Address>;
    }
  | { __kind: 'TokenGroupMember'; data: ReadonlyUint8Array };

export type MintExtensionArgs =
  | { __kind: 'Uninitialized' }
  | {
      __kind: 'TransferFeeConfig';
      /** Optional authority to set the fee. */
      transferFeeConfigAuthority: Address;
      /** Withdraw from mint instructions must be signed by this key. */
      withdrawWithheldAuthority: Address;
      /** Withheld transfer fee tokens that have been moved to the mint for withdrawal. */
      withheldAmount: number | bigint;
      /** Older transfer fee, used if the current epoch < newerTransferFee.epoch. */
      olderTransferFee: TransferFeeArgs;
      /** Newer transfer fee, used if the current epoch >= newerTransferFee.epoch. */
      newerTransferFee: TransferFeeArgs;
    }
  | {
      __kind: 'TransferFeeAmount';
      /** Withheld transfer fee tokens that can be claimed by the fee authority. */
      withheldAmount: number | bigint;
    }
  | { __kind: 'MintCloseAuthority'; closeAuthority: Address }
  | {
      __kind: 'ConfidentialTransferMint';
      /**
       * Authority to modify the `ConfidentialTransferMint` configuration and to
       * approve new accounts (if `auto_approve_new_accounts` is true).
       *
       * The legacy Token Multisig account is not supported as the authority.
       */
      authority: OptionOrNullable<Address>;
      /**
       * Indicate if newly configured accounts must be approved by the
       * `authority` before they may be used by the user.
       *
       * * If `true`, no approval is required and new accounts may be used immediately.
       * * If `false`, the authority must approve newly configured accounts (see
       *   `ConfidentialTransferInstruction::ConfigureAccount`).
       */
      autoApproveNewAccounts: boolean;
      /** Authority to decode any transfer amount in a confidential transfer. */
      auditorElgamalPubkey: OptionOrNullable<Address>;
    }
  | {
      __kind: 'ConfidentialTransferAccount';
      /**
       * `true` if this account has been approved for use. All confidential
       * transfer operations for the account will fail until approval is granted.
       */
      approved: boolean;
      /** The public key associated with ElGamal encryption. */
      elgamalPubkey: Address;
      /** The low 16 bits of the pending balance (encrypted by `elgamal_pubkey`). */
      pendingBalanceLow: EncryptedBalanceArgs;
      /** The high 48 bits of the pending balance (encrypted by `elgamal_pubkey`). */
      pendingBalanceHigh: EncryptedBalanceArgs;
      /** The available balance (encrypted by `encrypiton_pubkey`). */
      availableBalance: EncryptedBalanceArgs;
      /** The decryptable available balance. */
      decryptableAvailableBalance: DecryptableBalanceArgs;
      /** If `false`, the extended account rejects any incoming confidential transfers. */
      allowConfidentialCredits: boolean;
      /** If `false`, the base account rejects any incoming transfers. */
      allowNonConfidentialCredits: boolean;
      /** The total number of `Deposit` and `Transfer` instructions that have credited `pending_balance`. */
      pendingBalanceCreditCounter: number | bigint;
      /**
       * The maximum number of `Deposit` and `Transfer` instructions that can
       * credit `pending_balance` before the `ApplyPendingBalance`
       * instruction is executed.
       */
      maximumPendingBalanceCreditCounter: number | bigint;
      /**
       * The `expected_pending_balance_credit_counter` value that was included in
       * the last `ApplyPendingBalance` instruction.
       */
      expectedPendingBalanceCreditCounter: number | bigint;
      /**
       * The actual `pending_balance_credit_counter` when the last
       * `ApplyPendingBalance` instruction was executed.
       */
      actualPendingBalanceCreditCounter: number | bigint;
    }
  | { __kind: 'DefaultAccountState'; state: AccountStateArgs }
  | { __kind: 'ImmutableOwner' }
  | {
      __kind: 'MemoTransfer';
      /** Require transfers into this account to be accompanied by a memo. */
      requireIncomingTransferMemos: boolean;
    }
  | { __kind: 'NonTransferable' }
  | {
      __kind: 'InterestBearingConfig';
      rateAuthority: Address;
      initializationTimestamp: number | bigint;
      preUpdateAverageRate: number;
      lastUpdateTimestamp: number | bigint;
      currentRate: number;
    }
  | {
      __kind: 'CpiGuard';
      /** Lock certain token operations from taking place within CPI for this account. */
      lockCpi: boolean;
    }
  | { __kind: 'PermanentDelegate'; delegate: Address }
  | { __kind: 'NonTransferableAccount' }
  | {
      __kind: 'TransferHook';
      /** The transfer hook update authority. */
      authority: Address;
      /** The transfer hook program account. */
      programId: Address;
    }
  | {
      __kind: 'TransferHookAccount';
      /**
       * Whether or not this account is currently transferring tokens
       * True during the transfer hook cpi, otherwise false.
       */
      transferring: boolean;
    }
  | {
      __kind: 'ConfidentialTransferFee';
      /** Optional authority to set the withdraw withheld authority ElGamal key. */
      authority: OptionOrNullable<Address>;
      /**
       * Withheld fees from accounts must be encrypted with this ElGamal key.
       *
       * Note that whoever holds the ElGamal private key for this ElGamal public
       * key has the ability to decode any withheld fee amount that are
       * associated with accounts. When combined with the fee parameters, the
       * withheld fee amounts can reveal information about transfer amounts.
       */
      elgamalPubkey: Address;
      /** If `false`, the harvest of withheld tokens to mint is rejected. */
      harvestToMintEnabled: boolean;
      /**
       * Withheld confidential transfer fee tokens that have been moved to the
       * mint for withdrawal.
       */
      withheldAmount: EncryptedBalanceArgs;
    }
  | {
      __kind: 'ConfidentialTransferFeeAmount';
      /** Amount withheld during confidential transfers, to be harvest to the mint. */
      withheldAmount: EncryptedBalanceArgs;
    }
  | {
      __kind: 'MetadataPointer';
      /** Optional authority that can set the metadata address. */
      authority: OptionOrNullable<Address>;
      /** Optional Account Address that holds the metadata. */
      metadataAddress: OptionOrNullable<Address>;
    }
  | {
      __kind: 'TokenMetadata';
      /** The authority that can sign to update the metadata. */
      updateAuthority: OptionOrNullable<Address>;
      /** The associated mint, used to counter spoofing to be sure that metadata belongs to a particular mint. */
      mint: Address;
      /** The longer name of the token. */
      name: string;
      /** The shortened symbol for the token. */
      symbol: string;
      /** The URI pointing to richer metadata. */
      uri: string;
      /** Any additional metadata about the token as key-value pairs. */
      additionalMetadata: Map<string, string>;
    }
  | {
      __kind: 'GroupPointer';
      /** Optional authority that can set the group address. */
      authority: OptionOrNullable<Address>;
      /** Optional account address that holds the group. */
      groupAddress: OptionOrNullable<Address>;
    }
  | {
      __kind: 'TokenGroup';
      /** The authority that can sign to update the group. */
      updateAuthority: OptionOrNullable<Address>;
      /** The associated mint, used to counter spoofing to be sure that group belongs to a particular mint. */
      mint: Address;
      /** The current number of group members. */
      size: number;
      /** The maximum number of group members. */
      maxSize: number;
    }
  | {
      __kind: 'GroupMemberPointer';
      /** Optional authority that can set the member address. */
      authority: OptionOrNullable<Address>;
      /** Optional account address that holds the member. */
      memberAddress: OptionOrNullable<Address>;
    }
  | { __kind: 'TokenGroupMember'; data: ReadonlyUint8Array };

export function getMintExtensionEncoder(): Encoder<MintExtensionArgs> {
  return getDiscriminatedUnionEncoder(
    [
      ['Uninitialized', getUnitEncoder()],
      [
        'TransferFeeConfig',
        addEncoderSizePrefix(
          getStructEncoder([
            ['transferFeeConfigAuthority', getAddressEncoder()],
            ['withdrawWithheldAuthority', getAddressEncoder()],
            ['withheldAmount', getU64Encoder()],
            ['olderTransferFee', getTransferFeeEncoder()],
            ['newerTransferFee', getTransferFeeEncoder()],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'TransferFeeAmount',
        addEncoderSizePrefix(
          getStructEncoder([['withheldAmount', getU64Encoder()]]),
          getU16Encoder()
        ),
      ],
      [
        'MintCloseAuthority',
        addEncoderSizePrefix(
          getStructEncoder([['closeAuthority', getAddressEncoder()]]),
          getU16Encoder()
        ),
      ],
      [
        'ConfidentialTransferMint',
        addEncoderSizePrefix(
          getStructEncoder([
            ['authority', getZeroableOptionEncoder(getAddressEncoder())],
            ['autoApproveNewAccounts', getBooleanEncoder()],
            [
              'auditorElgamalPubkey',
              getZeroableOptionEncoder(getAddressEncoder()),
            ],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'ConfidentialTransferAccount',
        addEncoderSizePrefix(
          getStructEncoder([
            ['approved', getBooleanEncoder()],
            ['elgamalPubkey', getAddressEncoder()],
            ['pendingBalanceLow', getEncryptedBalanceEncoder()],
            ['pendingBalanceHigh', getEncryptedBalanceEncoder()],
            ['availableBalance', getEncryptedBalanceEncoder()],
            ['decryptableAvailableBalance', getDecryptableBalanceEncoder()],
            ['allowConfidentialCredits', getBooleanEncoder()],
            ['allowNonConfidentialCredits', getBooleanEncoder()],
            ['pendingBalanceCreditCounter', getU64Encoder()],
            ['maximumPendingBalanceCreditCounter', getU64Encoder()],
            ['expectedPendingBalanceCreditCounter', getU64Encoder()],
            ['actualPendingBalanceCreditCounter', getU64Encoder()],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'DefaultAccountState',
        addEncoderSizePrefix(
          getStructEncoder([['state', getAccountStateEncoder()]]),
          getU16Encoder()
        ),
      ],
      [
        'ImmutableOwner',
        addEncoderSizePrefix(getStructEncoder([]), getU16Encoder()),
      ],
      [
        'MemoTransfer',
        addEncoderSizePrefix(
          getStructEncoder([
            ['requireIncomingTransferMemos', getBooleanEncoder()],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'NonTransferable',
        addEncoderSizePrefix(getStructEncoder([]), getU16Encoder()),
      ],
      [
        'InterestBearingConfig',
        addEncoderSizePrefix(
          getStructEncoder([
            ['rateAuthority', getAddressEncoder()],
            ['initializationTimestamp', getU64Encoder()],
            ['preUpdateAverageRate', getI16Encoder()],
            ['lastUpdateTimestamp', getU64Encoder()],
            ['currentRate', getI16Encoder()],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'CpiGuard',
        addEncoderSizePrefix(
          getStructEncoder([['lockCpi', getBooleanEncoder()]]),
          getU16Encoder()
        ),
      ],
      [
        'PermanentDelegate',
        addEncoderSizePrefix(
          getStructEncoder([['delegate', getAddressEncoder()]]),
          getU16Encoder()
        ),
      ],
      [
        'NonTransferableAccount',
        addEncoderSizePrefix(getStructEncoder([]), getU16Encoder()),
      ],
      [
        'TransferHook',
        addEncoderSizePrefix(
          getStructEncoder([
            ['authority', getAddressEncoder()],
            ['programId', getAddressEncoder()],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'TransferHookAccount',
        addEncoderSizePrefix(
          getStructEncoder([['transferring', getBooleanEncoder()]]),
          getU16Encoder()
        ),
      ],
      [
        'ConfidentialTransferFee',
        addEncoderSizePrefix(
          getStructEncoder([
            ['authority', getZeroableOptionEncoder(getAddressEncoder())],
            ['elgamalPubkey', getAddressEncoder()],
            ['harvestToMintEnabled', getBooleanEncoder()],
            ['withheldAmount', getEncryptedBalanceEncoder()],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'ConfidentialTransferFeeAmount',
        addEncoderSizePrefix(
          getStructEncoder([['withheldAmount', getEncryptedBalanceEncoder()]]),
          getU16Encoder()
        ),
      ],
      [
        'MetadataPointer',
        addEncoderSizePrefix(
          getStructEncoder([
            ['authority', getZeroableOptionEncoder(getAddressEncoder())],
            ['metadataAddress', getZeroableOptionEncoder(getAddressEncoder())],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'TokenMetadata',
        addEncoderSizePrefix(
          getStructEncoder([
            ['updateAuthority', getZeroableOptionEncoder(getAddressEncoder())],
            ['mint', getAddressEncoder()],
            ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
            ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
            ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
            [
              'additionalMetadata',
              getMapEncoder(
                addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder()),
                addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())
              ),
            ],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'GroupPointer',
        addEncoderSizePrefix(
          getStructEncoder([
            ['authority', getZeroableOptionEncoder(getAddressEncoder())],
            ['groupAddress', getZeroableOptionEncoder(getAddressEncoder())],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'TokenGroup',
        addEncoderSizePrefix(
          getStructEncoder([
            ['updateAuthority', getZeroableOptionEncoder(getAddressEncoder())],
            ['mint', getAddressEncoder()],
            ['size', getU32Encoder()],
            ['maxSize', getU32Encoder()],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'GroupMemberPointer',
        addEncoderSizePrefix(
          getStructEncoder([
            ['authority', getZeroableOptionEncoder(getAddressEncoder())],
            ['memberAddress', getZeroableOptionEncoder(getAddressEncoder())],
          ]),
          getU16Encoder()
        ),
      ],
      [
        'TokenGroupMember',
        addEncoderSizePrefix(
          getStructEncoder([['data', getBytesEncoder()]]),
          getU16Encoder()
        ),
      ],
    ],
    { size: getU16Encoder() }
  );
}

export function getMintExtensionDecoder(): Decoder<MintExtension> {
  return getDiscriminatedUnionDecoder(
    [
      ['Uninitialized', getUnitDecoder()],
      [
        'TransferFeeConfig',
        addDecoderSizePrefix(
          getStructDecoder([
            ['transferFeeConfigAuthority', getAddressDecoder()],
            ['withdrawWithheldAuthority', getAddressDecoder()],
            ['withheldAmount', getU64Decoder()],
            ['olderTransferFee', getTransferFeeDecoder()],
            ['newerTransferFee', getTransferFeeDecoder()],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'TransferFeeAmount',
        addDecoderSizePrefix(
          getStructDecoder([['withheldAmount', getU64Decoder()]]),
          getU16Decoder()
        ),
      ],
      [
        'MintCloseAuthority',
        addDecoderSizePrefix(
          getStructDecoder([['closeAuthority', getAddressDecoder()]]),
          getU16Decoder()
        ),
      ],
      [
        'ConfidentialTransferMint',
        addDecoderSizePrefix(
          getStructDecoder([
            ['authority', getZeroableOptionDecoder(getAddressDecoder())],
            ['autoApproveNewAccounts', getBooleanDecoder()],
            [
              'auditorElgamalPubkey',
              getZeroableOptionDecoder(getAddressDecoder()),
            ],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'ConfidentialTransferAccount',
        addDecoderSizePrefix(
          getStructDecoder([
            ['approved', getBooleanDecoder()],
            ['elgamalPubkey', getAddressDecoder()],
            ['pendingBalanceLow', getEncryptedBalanceDecoder()],
            ['pendingBalanceHigh', getEncryptedBalanceDecoder()],
            ['availableBalance', getEncryptedBalanceDecoder()],
            ['decryptableAvailableBalance', getDecryptableBalanceDecoder()],
            ['allowConfidentialCredits', getBooleanDecoder()],
            ['allowNonConfidentialCredits', getBooleanDecoder()],
            ['pendingBalanceCreditCounter', getU64Decoder()],
            ['maximumPendingBalanceCreditCounter', getU64Decoder()],
            ['expectedPendingBalanceCreditCounter', getU64Decoder()],
            ['actualPendingBalanceCreditCounter', getU64Decoder()],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'DefaultAccountState',
        addDecoderSizePrefix(
          getStructDecoder([['state', getAccountStateDecoder()]]),
          getU16Decoder()
        ),
      ],
      [
        'ImmutableOwner',
        addDecoderSizePrefix(getStructDecoder([]), getU16Decoder()),
      ],
      [
        'MemoTransfer',
        addDecoderSizePrefix(
          getStructDecoder([
            ['requireIncomingTransferMemos', getBooleanDecoder()],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'NonTransferable',
        addDecoderSizePrefix(getStructDecoder([]), getU16Decoder()),
      ],
      [
        'InterestBearingConfig',
        addDecoderSizePrefix(
          getStructDecoder([
            ['rateAuthority', getAddressDecoder()],
            ['initializationTimestamp', getU64Decoder()],
            ['preUpdateAverageRate', getI16Decoder()],
            ['lastUpdateTimestamp', getU64Decoder()],
            ['currentRate', getI16Decoder()],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'CpiGuard',
        addDecoderSizePrefix(
          getStructDecoder([['lockCpi', getBooleanDecoder()]]),
          getU16Decoder()
        ),
      ],
      [
        'PermanentDelegate',
        addDecoderSizePrefix(
          getStructDecoder([['delegate', getAddressDecoder()]]),
          getU16Decoder()
        ),
      ],
      [
        'NonTransferableAccount',
        addDecoderSizePrefix(getStructDecoder([]), getU16Decoder()),
      ],
      [
        'TransferHook',
        addDecoderSizePrefix(
          getStructDecoder([
            ['authority', getAddressDecoder()],
            ['programId', getAddressDecoder()],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'TransferHookAccount',
        addDecoderSizePrefix(
          getStructDecoder([['transferring', getBooleanDecoder()]]),
          getU16Decoder()
        ),
      ],
      [
        'ConfidentialTransferFee',
        addDecoderSizePrefix(
          getStructDecoder([
            ['authority', getZeroableOptionDecoder(getAddressDecoder())],
            ['elgamalPubkey', getAddressDecoder()],
            ['harvestToMintEnabled', getBooleanDecoder()],
            ['withheldAmount', getEncryptedBalanceDecoder()],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'ConfidentialTransferFeeAmount',
        addDecoderSizePrefix(
          getStructDecoder([['withheldAmount', getEncryptedBalanceDecoder()]]),
          getU16Decoder()
        ),
      ],
      [
        'MetadataPointer',
        addDecoderSizePrefix(
          getStructDecoder([
            ['authority', getZeroableOptionDecoder(getAddressDecoder())],
            ['metadataAddress', getZeroableOptionDecoder(getAddressDecoder())],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'TokenMetadata',
        addDecoderSizePrefix(
          getStructDecoder([
            ['updateAuthority', getZeroableOptionDecoder(getAddressDecoder())],
            ['mint', getAddressDecoder()],
            ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
            ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
            ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
            [
              'additionalMetadata',
              getMapDecoder(
                addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder()),
                addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())
              ),
            ],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'GroupPointer',
        addDecoderSizePrefix(
          getStructDecoder([
            ['authority', getZeroableOptionDecoder(getAddressDecoder())],
            ['groupAddress', getZeroableOptionDecoder(getAddressDecoder())],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'TokenGroup',
        addDecoderSizePrefix(
          getStructDecoder([
            ['updateAuthority', getZeroableOptionDecoder(getAddressDecoder())],
            ['mint', getAddressDecoder()],
            ['size', getU32Decoder()],
            ['maxSize', getU32Decoder()],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'GroupMemberPointer',
        addDecoderSizePrefix(
          getStructDecoder([
            ['authority', getZeroableOptionDecoder(getAddressDecoder())],
            ['memberAddress', getZeroableOptionDecoder(getAddressDecoder())],
          ]),
          getU16Decoder()
        ),
      ],
      [
        'TokenGroupMember',
        addDecoderSizePrefix(
          getStructDecoder([['data', getBytesDecoder()]]),
          getU16Decoder()
        ),
      ],
    ],
    { size: getU16Decoder() }
  );
}

export function getMintExtensionCodec(): Codec<
  MintExtensionArgs,
  MintExtension
> {
  return combineCodec(getMintExtensionEncoder(), getMintExtensionDecoder());
}

// Data Enum Helpers.
export function mintExtension(
  kind: 'Uninitialized'
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'Uninitialized'>;
export function mintExtension(
  kind: 'TransferFeeConfig',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'TransferFeeConfig'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'TransferFeeConfig'
>;
export function mintExtension(
  kind: 'TransferFeeAmount',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'TransferFeeAmount'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'TransferFeeAmount'
>;
export function mintExtension(
  kind: 'MintCloseAuthority',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'MintCloseAuthority'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'MintCloseAuthority'
>;
export function mintExtension(
  kind: 'ConfidentialTransferMint',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'ConfidentialTransferMint'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'ConfidentialTransferMint'
>;
export function mintExtension(
  kind: 'ConfidentialTransferAccount',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'ConfidentialTransferAccount'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'ConfidentialTransferAccount'
>;
export function mintExtension(
  kind: 'DefaultAccountState',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'DefaultAccountState'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'DefaultAccountState'
>;
export function mintExtension(
  kind: 'ImmutableOwner',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'ImmutableOwner'
  >
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'ImmutableOwner'>;
export function mintExtension(
  kind: 'MemoTransfer',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'MemoTransfer'
  >
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'MemoTransfer'>;
export function mintExtension(
  kind: 'NonTransferable',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'NonTransferable'
  >
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'NonTransferable'>;
export function mintExtension(
  kind: 'InterestBearingConfig',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'InterestBearingConfig'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'InterestBearingConfig'
>;
export function mintExtension(
  kind: 'CpiGuard',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'CpiGuard'
  >
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'CpiGuard'>;
export function mintExtension(
  kind: 'PermanentDelegate',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'PermanentDelegate'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'PermanentDelegate'
>;
export function mintExtension(
  kind: 'NonTransferableAccount',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'NonTransferableAccount'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'NonTransferableAccount'
>;
export function mintExtension(
  kind: 'TransferHook',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'TransferHook'
  >
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'TransferHook'>;
export function mintExtension(
  kind: 'TransferHookAccount',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'TransferHookAccount'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'TransferHookAccount'
>;
export function mintExtension(
  kind: 'ConfidentialTransferFee',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'ConfidentialTransferFee'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'ConfidentialTransferFee'
>;
export function mintExtension(
  kind: 'ConfidentialTransferFeeAmount',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'ConfidentialTransferFeeAmount'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'ConfidentialTransferFeeAmount'
>;
export function mintExtension(
  kind: 'MetadataPointer',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'MetadataPointer'
  >
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'MetadataPointer'>;
export function mintExtension(
  kind: 'TokenMetadata',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'TokenMetadata'
  >
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'TokenMetadata'>;
export function mintExtension(
  kind: 'GroupPointer',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'GroupPointer'
  >
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'GroupPointer'>;
export function mintExtension(
  kind: 'TokenGroup',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'TokenGroup'
  >
): GetDiscriminatedUnionVariant<MintExtensionArgs, '__kind', 'TokenGroup'>;
export function mintExtension(
  kind: 'GroupMemberPointer',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'GroupMemberPointer'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'GroupMemberPointer'
>;
export function mintExtension(
  kind: 'TokenGroupMember',
  data: GetDiscriminatedUnionVariantContent<
    MintExtensionArgs,
    '__kind',
    'TokenGroupMember'
  >
): GetDiscriminatedUnionVariant<
  MintExtensionArgs,
  '__kind',
  'TokenGroupMember'
>;
export function mintExtension<K extends MintExtensionArgs['__kind'], Data>(
  kind: K,
  data?: Data
) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isMintExtension<K extends MintExtension['__kind']>(
  kind: K,
  value: MintExtension
): value is MintExtension & { __kind: K } {
  return value.__kind === kind;
}
