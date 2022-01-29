import {Touch} from './Touch.mjs'
import {PointScore} from '../PointScore.mjs'
import {GameInstance} from './GameInstance.mjs'

export class Enclume extends GameInstance {
    /**
     * @type {Lobby}
     */
    lobby
    /**
     * @type {number}
     */
    seconds
    /**
     * @type {Touch[]}
     */
    touchs

    constructor(lobby) {
        super()
        this.lobby = lobby
    }

<<<<<<< HEAD
start() {
    this
.
    lobby
.

    emitPlayers(

    'rules'
,
    'Dans quelques secondes, une enclume va vous tomber sur la tête. À vous de l\'arrêter au plus tard pour un maximum de points !'
)
=======

    initGame() {
        this.touchs = []
        this.seconds = Math.floor(Math.random() * 7) + 3
    }

    /**
     * @param {function} endRulesclb
     */
    rules(endRulesclb) {
        this.lobby.emitPlayers('rules', 'Dans quelques secondes, une enclume va vous tomber sur la tete. À vous de l\'arreter au plus tard pour un maximum de points !')
        >>> >>> > b0d9daa86aaf926f74f0905ce383279e44471983
        setTimeout(() => {
            this.lobby.emitPlayers('rules', 'Attention nous allons démarrer')
            setTimeout(() => {
                endRulesclb()
            }, 2000)
        }, 5000)
    }

    /**
     * @param {function} endStartGameClb
     */
    startGame(endStartGameClb) {
        this.lobby.emitPlayers('startEnclume', this.seconds)
        setTimeout(() => endStartGameClb(), this.seconds + 2000)
        for (const player of this.lobby.players) {
            player.socket.on('touch', delta => {
                player.socket.off('touch')
                const touch = new Touch(player, delta)
                this.lobby.emitPlayers('playerTouch', touch)
                this.touchs.push(touch)
            })
        }
    }

    /**
     * @param {function} endEndGameClb
     */
    endGame(endEndGameClb) {
        for (const player of this.lobby.players) {
            player.socket.off('touch')
        }
        setTimeout(() => endEndGameClb(), 3000)
    }

    /**
     * @param {function} endLeaderBoardCLb
     */
    leaderBoard(endLeaderBoardCLb) {
        for (const player of this.lobby.players) {
            let isPresent = false
            for (const touch of this.touchs) {
                if (touch.player.id === player.id) {
                    isPresent = true
                }
            }
            if (!isPresent) {
                this.touchs.push(new Touch(player, -Infinity))
            }
        }
        const touchsSorted = this.touchs.sort((touchA, touchB) => touchB.delta - touchA.delta)
        const leaderBoard = []
        let position = 1
        for (const touch of touchsSorted) {
            if (touch.delta >= 0) {
                leaderBoard.push(PointScore.pointsFor(touch.player, position))
            } else {
                leaderBoard.push(PointScore.pointsForNonFinisher(touch.player, position))
            }
            position++
        }
        this.lobby.emitPlayers('leaderBoardGame', leaderBoard.map(p => p.encode()))
        setTimeout(() => endLeaderBoardCLb(), 3000)
    }
}
