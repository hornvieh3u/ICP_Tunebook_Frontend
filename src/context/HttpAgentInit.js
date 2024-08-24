import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../smart-contracts/backend.js';

async function HttpAgentInit() {
    const agent = new HttpAgent({ host: process.env.REACT_APP_PUBLIC_HOST });
    const actor = Actor.createActor(idlFactory, { agent,  canisterId: process.env.REACT_APP_CANISTER_ID });
    if(process.env.REACT_APP_DFX_NETWORK != "ic") {
        await agent.fetchRootKey();
    }

    return actor;
}

export default HttpAgentInit;