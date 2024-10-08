/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  getU16Decoder,
  getU16Encoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

/**
 * Extensions that can be applied to mints or accounts.  Mint extensions must
 * only be applied to mint accounts, and account extensions must only be
 * applied to token holding accounts.
 */

export enum ExtensionType {
  Uninitialized,
  TransferFeeConfig,
  TransferFeeAmount,
  MintCloseAuthority,
  ConfidentialTransferMint,
  ConfidentialTransferAccount,
  DefaultAccountState,
  ImmutableOwner,
  MemoTransfer,
  NonTransferable,
  InterestBearingConfig,
  CpiGuard,
  PermanentDelegate,
  NonTransferableAccount,
  TransferHook,
  TransferHookAccount,
  ConfidentialTransferFee,
  ConfidentialTransferFeeAmount,
  MetadataPointer,
  TokenMetadata,
  GroupPointer,
  TokenGroup,
  GroupMemberPointer,
  TokenGroupMember,
}

export type ExtensionTypeArgs = ExtensionType;

export function getExtensionTypeEncoder(): Encoder<ExtensionTypeArgs> {
  return getEnumEncoder(ExtensionType, { size: getU16Encoder() });
}

export function getExtensionTypeDecoder(): Decoder<ExtensionType> {
  return getEnumDecoder(ExtensionType, { size: getU16Decoder() });
}

export function getExtensionTypeCodec(): Codec<
  ExtensionTypeArgs,
  ExtensionType
> {
  return combineCodec(getExtensionTypeEncoder(), getExtensionTypeDecoder());
}
