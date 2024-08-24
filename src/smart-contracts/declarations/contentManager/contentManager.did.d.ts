import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type CanisterId = Principal;
export interface ContentData {
  'title' : string,
  'contentId' : string,
  'duration' : bigint,
  'thumbnail' : Thumbnail,
  'userId' : UserId,
  'createdAt' : Timestamp,
  'size' : bigint,
  'contentCanisterId' : Principal,
  'fileType' : string,
  'playCount' : bigint,
  'chunkCount' : bigint,
  'isReleased' : boolean,
  'createdAt' : Timestamp,
}
export type ContentId = string;
export interface ContentInit {
  'title' : string,
  'duration' : bigint,
  'thumbnail' : Thumbnail,
  'userId' : UserId,
  'createdAt' : Timestamp,
  'size' : bigint,
  'fileType' : string,
  'chunkCount' : bigint,
  'isReleased' : boolean,
}
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
export interface Thumbnail {
  'file' : Uint8Array | number[],
  'fileType' : string,
}
export type Timestamp = bigint;
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'changeCanisterSize' : ActorMethod<[bigint], undefined>,
  'changeCycleAmount' : ActorMethod<[bigint], undefined>,
  'checkCyclesBalance' : ActorMethod<[], undefined>,
  'createContent' : ActorMethod<[ContentInit], [] | [[ContentId, Principal]]>,
  'cyclesBalance' : ActorMethod<[], bigint>,
  'deleteContentById' : ActorMethod<[string], boolean>,
  'deleteContentCanister' : ActorMethod<[Principal], boolean>,
  'getAllContentCanisters' : ActorMethod<[], Array<CanisterId>>,
  'getAllContentInfo' : ActorMethod<[boolean], Array<[ContentId, ContentData]>>,
  'getAllContentInfoByUserId' : ActorMethod<
    [UserId__1],
    Array<[ContentId, ContentData]>
  >,
  'getAvailableContentId' : ActorMethod<[], bigint>,
  'getCanisterOfContent' : ActorMethod<[ContentId], [] | [CanisterId]>,
  'getEntriesOfCanisterToContent' : ActorMethod<
    [],
    Array<[CanisterId, ContentId]>
  >,
  'getStatus' : ActorMethod<[[] | [StatusRequest]], [] | [StatusResponse]>,
  'increasePlayCount' : ActorMethod<[ContentId], undefined>,
  'installCode' : ActorMethod<
    [Principal, Uint8Array | number[], Uint8Array | number[]],
    undefined
  >,
  'registerContentInfo' : ActorMethod<[ContentData], [] | [ContentId]>,
  'releaseTrack' : ActorMethod<[ContentId, boolean], undefined>,
  'removeContent' : ActorMethod<[ContentId, bigint], undefined>,
  'transferCyclesToThisCanister' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
