import { createReactor } from "@ic-reactor/react"
import { manager, canisterId, idlFactory } from "../smart-contracts/declarations/manager"


export const { useActorStore, useAuth, useQueryCall } = createReactor<manager>({
  canisterId,
  idlFactory,
  host: "https://localhost:4943",
})