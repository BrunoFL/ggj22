import { Lobby } from "./Lobby.mjs";
import { Player } from './Player.mjs';

export class GameServer {

    /**
     * @type {Emitter}
     */
    io
    /**
     * @type {Lobby[]}
     */
    lobbies

    /**
     * @param {Emitter} io
     */
    constructor(io) {
        this.io = io
        this.lobbies = []
        this.listen()
    }

    listen() {
        this.io.on('connection', socket => {
            const player = new Player(Math.random(), socket, socket.id)
            socket.on('createLobby', lobbyName => {
                console.log(`create lobby ${lobbyName}`);
                const lobby = new Lobby(this.io, this, lobbyName);
                this.lobbies.push(lobby)
                lobby.join(player)
            })

            socket.on('getLobbies', () => {
                socket.emit('listLobbies', this.encodeLobbies())
            })
        })
    }

    destroyLobby(lobby) {
        this.lobbies = this.lobbies.filter(l => l.id != lobby.id)
        this.io.emit('listLobbies', this.encodeLobbies())
    }

    encodeLobbies() {
        return this.lobbies.map(l => l.encode())
    }
}
