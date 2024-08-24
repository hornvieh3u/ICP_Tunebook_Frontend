import { useContext } from 'react';
import {APIContext} from '../context/ApiContext';

const useApi = () => {
    const context = useContext(APIContext);

    if (!context) throw new Error('context must be use inside provider');

    return context;
};

export default useApi;
