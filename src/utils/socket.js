import io from 'socket.io-client';

// Export individual socket connections
// export const crashSocket = io(`${process.env.REACT_APP_SOCKET_API_URL}/crash`);

// // Export all socket connections
// export const sockets = [crashSocket];

// // Authenticate websocket connections
// export const authenticateSockets = (token) => {
//     console.log('[WS] Authenticating...');

//     // Emit auth event for all sockets
//     sockets.forEach((socket) => socket.emit('auth', token));
// };
