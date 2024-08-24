import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ArtistAccountData {
  'userName' : string,
  'displayName' : string,
  'createdAt' : Timestamp,
  'fileType' : [] | [string],
  'updatedAt' : Timestamp,
  'userPrincipal' : Principal,
  'avatar' : [] | [ProfilePhoto],
}
export interface CanisterStatus {
  'status' : { 'stopped' : null } |
    { 'stopping' : null } |
    { 'running' : null },
  'memory_size' : bigint,
  'cycles' : bigint,
  'settings' : definite_canister_settings,
  'module_hash' : [] | [Uint8Array | number[]],
}
export type ProfilePhoto = Uint8Array | number[];
export type Timestamp = bigint;
export type UserId = Principal;
export interface definite_canister_settings {
  'freezing_threshold' : bigint,
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface _SERVICE {
  'cyclesBalance' : ActorMethod<[], bigint>,
  'editProfileInfo' : ActorMethod<[ArtistAccountData], boolean>,
  'getArtistList' : ActorMethod<[], Array<[UserId, ArtistAccountData]>>,
  'getCanisterStatus' : ActorMethod<[], CanisterStatus>,
  'getCanisterWtihAvailableMemory' : ActorMethod<[Principal], [] | [bigint]>,
  'getProfileInfo' : ActorMethod<[UserId], [] | [ArtistAccountData]>,
  'getTotalAccounts' : ActorMethod<[], bigint>,
  'installCode' : ActorMethod<
    [Principal, Uint8Array | number[], Uint8Array | number[]],
    undefined
  >,
  'transferCyclesToCanister' : ActorMethod<[Principal, bigint], undefined>,
  'updateCanisterSize' : ActorMethod<[bigint], undefined>,
  'updateCycleAmount' : ActorMethod<[bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
