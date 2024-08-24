export const idlFactory = ({ IDL }) => {
  const Timestamp = IDL.Int;
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
  const UserId = IDL.Principal;
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
  return IDL.Service({
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'editProfileInfo' : IDL.Func([ArtistAccountData], [IDL.Bool], []),
    'getArtistList' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(UserId, ArtistAccountData))],
        ['query'],
      ),
    'getCanisterStatus' : IDL.Func([], [CanisterStatus], []),
    'getCanisterWtihAvailableMemory' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Nat)],
        [],
      ),
    'getProfileInfo' : IDL.Func(
        [UserId],
        [IDL.Opt(ArtistAccountData)],
        ['query'],
      ),
    'getTotalAccounts' : IDL.Func([], [IDL.Nat], ['query']),
    'installCode' : IDL.Func(
        [IDL.Principal, IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [],
        [],
      ),
    'transferCyclesToCanister' : IDL.Func([IDL.Principal, IDL.Nat], [], []),
    'updateCanisterSize' : IDL.Func([IDL.Nat], [], ['oneway']),
    'updateCycleAmount' : IDL.Func([IDL.Nat], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
