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
export interface ArtistBucket {
  'changeCanisterSize' : ActorMethod<[bigint], undefined>,
  'changeCycleAmount' : ActorMethod<[bigint], undefined>,
  'checkCyclesBalance' : ActorMethod<[], undefined>,
  'createProfileInfo' : ActorMethod<[[] | [ArtistAccountData]], boolean>,
  'deleteAccount' : ActorMethod<[Principal], undefined>,
  'editProfileInfo' : ActorMethod<[ArtistAccountData], boolean>,
  'getCanisterStatus' : ActorMethod<[], CanisterStatus>,
  'getCurrentCyclesBalance' : ActorMethod<[], bigint>,
  'getPrincipalThis' : ActorMethod<[], Principal>,
  'getProfileInfo' : ActorMethod<[UserId], [] | [ArtistAccountData]>,
  'getStatus' : ActorMethod<[[] | [StatusRequest]], [] | [StatusResponse]>,
  'transferCyclesToThisCanister' : ActorMethod<[], undefined>,
  'transferFreezingThresholdCycles' : ActorMethod<[], undefined>,
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
export interface PrincipalInfo {
  'createdAt' : Timestamp,
  'userPrincipal' : Principal,
}
export type ProfilePhoto = Uint8Array | number[];
export interface StatusRequest {
  'memory_size' : boolean,
  'version' : boolean,
  'cycles' : boolean,
  'heap_memory_size' : boolean,
}
export interface StatusResponse {
  'memory_size' : [] | [bigint],
  'version' : [] | [bigint],
  'cycles' : [] | [bigint],
  'heap_memory_size' : [] | [bigint],
}
export type Timestamp = bigint;
export type UserId = Principal;
export interface definite_canister_settings {
  'freezing_threshold' : bigint,
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface _SERVICE extends ArtistBucket {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
