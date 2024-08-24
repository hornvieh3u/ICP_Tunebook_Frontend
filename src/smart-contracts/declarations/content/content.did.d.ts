import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ArtistContentBucket {
  'changeCanisterSize' : ActorMethod<[bigint], undefined>,
  'changeCycleAmount' : ActorMethod<[bigint], undefined>,
  'checkCyclesBalance' : ActorMethod<[], undefined>,
  'createContent' : ActorMethod<
    [ContentInit, bigint],
    [] | [[ContentId, ContentData]]
  >,
  'getAllContentInfo' : ActorMethod<
    [ContentId],
    Array<[ContentId, ContentData]>
  >,
  'getCanisterStatus' : ActorMethod<[], CanisterStatus>,
  'getContentChunk' : ActorMethod<
    [ContentId, bigint],
    [] | [Uint8Array | number[]]
  >,
  'getContentInfo' : ActorMethod<[ContentId], [] | [ContentData]>,
  'getCurrentCyclesBalance' : ActorMethod<[], bigint>,
  'getPrincipalThis' : ActorMethod<[], Principal>,
  'getStatus' : ActorMethod<[[] | [StatusRequest]], [] | [StatusResponse]>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'putContentChunk' : ActorMethod<
    [ContentId, bigint, Uint8Array | number[]],
    bigint
  >,
  'removeContent' : ActorMethod<[ContentId, bigint], undefined>,
  'streamingCallback' : ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackResponse
  >,
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
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<[string, string]>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<[string, string]>,
  'status_code' : number,
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
export interface StreamingCallbackResponse {
  'token' : [] | [StreamingCallbackToken__1],
  'body' : Uint8Array | number[],
}
export interface StreamingCallbackToken {
  'key' : string,
  'sha256' : [] | [Uint8Array | number[]],
  'index' : bigint,
  'content_encoding' : string,
}
export interface StreamingCallbackToken__1 {
  'key' : string,
  'sha256' : [] | [Uint8Array | number[]],
  'index' : bigint,
  'content_encoding' : string,
}
export interface Thumbnail {
  'file' : Uint8Array | number[],
  'fileType' : string,
}
export type Timestamp = bigint;
export type UserId = Principal;
export interface definite_canister_settings {
  'freezing_threshold' : bigint,
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface _SERVICE extends ArtistContentBucket {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
