export const idlFactory = ({ IDL }) => {
  const Timestamp = IDL.Int;
  const PrincipalInfo = IDL.Record({
    'createdAt' : Timestamp,
    'userPrincipal' : IDL.Principal,
  });
  const ProfilePhoto = IDL.Vec(IDL.Nat8);
  const ArtistAccountData = IDL.Record({
    'userName' : IDL.Text,
    'displayName' : IDL.Text,
    'createdAt' : Timestamp,
    'fileType' : IDL.Opt(IDL.Text),
    'updatedAt' : Timestamp,
    'userPrincipal' : IDL.Principal,
    'avatar' : IDL.Opt(ProfilePhoto),
  });
  const definite_canister_settings = IDL.Record({
    'freezing_threshold' : IDL.Nat,
    'controllers' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'memory_allocation' : IDL.Nat,
    'compute_allocation' : IDL.Nat,
  });
  const CanisterStatus = IDL.Record({
    'status' : IDL.Variant({
      'stopped' : IDL.Null,
      'stopping' : IDL.Null,
      'running' : IDL.Null,
    }),
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : definite_canister_settings,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const UserId = IDL.Principal;
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
  const ArtistBucket = IDL.Service({
    'changeCanisterSize' : IDL.Func([IDL.Nat], [], ['oneway']),
    'changeCycleAmount' : IDL.Func([IDL.Nat], [], ['oneway']),
    'checkCyclesBalance' : IDL.Func([], [], []),
    'createProfileInfo' : IDL.Func(
        [IDL.Opt(ArtistAccountData)],
        [IDL.Bool],
        [],
      ),
    'deleteAccount' : IDL.Func([IDL.Principal], [], []),
    'editProfileInfo' : IDL.Func([ArtistAccountData], [IDL.Bool], []),
    'getCanisterStatus' : IDL.Func([], [CanisterStatus], []),
    'getCurrentCyclesBalance' : IDL.Func([], [IDL.Nat], []),
    'getPrincipalThis' : IDL.Func([], [IDL.Principal], ['query']),
    'getProfileInfo' : IDL.Func(
        [UserId],
        [IDL.Opt(ArtistAccountData)],
        ['query'],
      ),
    'getStatus' : IDL.Func(
        [IDL.Opt(StatusRequest)],
        [IDL.Opt(StatusResponse)],
        ['query'],
      ),
    'transferCyclesToThisCanister' : IDL.Func([], [], []),
    'transferFreezingThresholdCycles' : IDL.Func([], [], []),
  });
  return ArtistBucket;
};
export const init = ({ IDL }) => {
  const Timestamp = IDL.Int;
  const PrincipalInfo = IDL.Record({
    'createdAt' : Timestamp,
    'userPrincipal' : IDL.Principal,
  });
  return [IDL.Opt(PrincipalInfo), IDL.Principal, IDL.Principal];
};
