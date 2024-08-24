export const idlFactory = ({ IDL }) => {
  const Thumbnail = IDL.Record({
    'file' : IDL.Vec(IDL.Nat8),
    'fileType' : IDL.Text,
  });
  const UserId = IDL.Principal;
  const Timestamp = IDL.Int;
  const ContentInit = IDL.Record({
    'title' : IDL.Text,
    'duration' : IDL.Nat,
    'thumbnail' : Thumbnail,
    'userId' : UserId,
    'createdAt' : Timestamp,
    'size' : IDL.Nat,
    'fileType' : IDL.Text,
    'chunkCount' : IDL.Nat,
    'isReleased' : IDL.Bool,
  });
  const ContentId = IDL.Text;
  const CanisterId = IDL.Principal;
  const ContentData = IDL.Record({
    'title' : IDL.Text,
    'contentId' : IDL.Text,
    'duration' : IDL.Nat,
    'thumbnail' : Thumbnail,
    'userId' : UserId,
    'createdAt' : Timestamp,
    'size' : IDL.Nat,
    'contentCanisterId' : IDL.Principal,
    'fileType' : IDL.Text,
    'playCount' : IDL.Nat,
    'chunkCount' : IDL.Nat,
    'isReleased' : IDL.Bool,
    'createdAt' : Timestamp,
  });
  const UserId__1 = IDL.Principal;
  const StatusRequest = IDL.Record({
    'memory_size' : IDL.Bool,
    'version' : IDL.Bool,
    'cycles' : IDL.Bool,
    'heap_memory_size' : IDL.Bool,
  });
  const StatusResponse = IDL.Record({
    'memory_size' : IDL.Opt(IDL.Nat),
    'version' : IDL.Opt(IDL.Nat),
    'cycles' : IDL.Opt(IDL.Nat),
    'heap_memory_size' : IDL.Opt(IDL.Nat),
  });
  return IDL.Service({
    'changeCanisterSize' : IDL.Func([IDL.Nat], [], ['oneway']),
    'changeCycleAmount' : IDL.Func([IDL.Nat], [], ['oneway']),
    'checkCyclesBalance' : IDL.Func([], [], []),
    'createContent' : IDL.Func(
        [ContentInit],
        [IDL.Opt(IDL.Tuple(ContentId, IDL.Principal))],
        [],
      ),
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'deleteContentById' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'deleteContentCanister' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'getAllContentCanisters' : IDL.Func([], [IDL.Vec(CanisterId)], ['query']),
    'getAllContentInfo' : IDL.Func(
        [IDL.Bool],
        [IDL.Vec(IDL.Tuple(ContentId, ContentData))],
        ['query'],
      ),
    'getAllContentInfoByUserId' : IDL.Func(
        [UserId__1],
        [IDL.Vec(IDL.Tuple(ContentId, ContentData))],
        ['query'],
      ),
    'getAvailableContentId' : IDL.Func([], [IDL.Nat], ['query']),
    'getCanisterOfContent' : IDL.Func(
        [ContentId],
        [IDL.Opt(CanisterId)],
        ['query'],
      ),
    'getEntriesOfCanisterToContent' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CanisterId, ContentId))],
        ['query'],
      ),
    'getStatus' : IDL.Func(
        [IDL.Opt(StatusRequest)],
        [IDL.Opt(StatusResponse)],
        ['query'],
      ),
    'increasePlayCount' : IDL.Func([ContentId], [], ['oneway']),
    'installCode' : IDL.Func(
        [IDL.Principal, IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [],
        [],
      ),
    'registerContentInfo' : IDL.Func([ContentData], [IDL.Opt(ContentId)], []),
    'releaseTrack' : IDL.Func([ContentId, IDL.Bool], [], ['oneway']),
    'removeContent' : IDL.Func([ContentId, IDL.Nat], [], []),
    'transferCyclesToThisCanister' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
