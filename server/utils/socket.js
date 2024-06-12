let io;
module.exports={
    init: httpServer=>{
         io = require('socket.io')(httpServer, {
            cors: {
                origin: '*',
            }
        });
        return io;
    },
    getIo:()=>{
        if(!io) throw new Error(`Socket.io Cannot be initialized or doesn't exist`)
        return io;
    }
}