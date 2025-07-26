import { defineStore } from 'pinia'
import axios from 'axios'

export const useGameStore = defineStore('game', {
  state: () => ({
    gameId: null,
    lives: null,
    gold: null,
    score: null,
    highScore: null,
    level: null,
    turn: 0,
    messages: [],
    isLoading: false,
    lastQuestResult: null,
    shopItems: [],
    peopleRep: 0,
    stateRep: 0,
    underworldRep: 0,
  }),

  actions: {
    async startNewGame() {
      this.isLoading = true
      try {
        const response = await axios.post('https://dragonsofmugloar.com/api/v2/game/start')
        const data = response.data
        this.gameId = data.gameId
        this.lives = data.lives
        this.gold = data.gold
        this.score = data.score
        this.highScore = data.highScore
        this.level = data.level
        this.turn = data.turn
        this.lastQuestResult = null

        await this.fetchQuests()
      } catch (error) {
        console.error('Failed to start game:', error)
      } finally {
        this.isLoading = false
      }
    },

    async runInvestigation() {
      this.isLoading = true
      try {
        const response = await axios.post(
          `https://dragonsofmugloar.com/api/v2/${this.gameId}/investigate/reputation`,
        )
        const data = response.data
        this.peopleRep = data.people
        this.stateRep = data.state
        this.underworldRep = data.underworld
        this.turn += 1
      } catch (error) {
        console.error('Failed to get reputations:', error)
      } finally {
        await this.fetchQuests()
        this.isLoading = false
      }
    },

    async fetchQuests() {
      if (!this.gameId) return
      this.isLoading = true
      try {
        const response = await axios.get(
          `https://dragonsofmugloar.com/api/v2/${this.gameId}/messages`,
        )
        this.messages = response.data
      } catch (error) {
        console.error('Failed to fetch quests:', error)
      } finally {
        this.isLoading = false
      }
    },

    async solveQuest(adId) {
      if (!this.gameId) return
      this.isLoading = true
      try {
        const response = await axios.post(
          `https://dragonsofmugloar.com/api/v2/${this.gameId}/solve/${adId}`,
        )
        const result = response.data

        this.lives = result.lives
        this.gold = result.gold
        this.score = result.score
        this.highScore = result.highScore
        this.turn = result.turn

        this.lastQuestResult = result
      } catch (error) {
        console.error(`Failed to solve quest ${adId}:`, error)
      } finally {
        await this.fetchQuests()
        this.isLoading = false
      }
    },

    async fetchShop() {
      if (!this.gameId) return
      this.isLoading = true
      try {
        const response = await axios.get(`https://dragonsofmugloar.com/api/v2/${this.gameId}/shop`)
        this.shopItems = response.data
      } catch (error) {
        console.error('Failed to fetch shop items', error)
      } finally {
        this.isLoading = false
      }
    },

    async purchaseItem(itemId) {
      if (!this.gameId) return
      this.isLoading = true
      try {
        const response = await axios.post(
          `https://dragonsofmugloar.com/api/v2/${this.gameId}/shop/buy/${itemId}`,
        )
        const { gold, lives, level, turn } = response.data
        this.gold = gold
        this.lives = lives
        this.level = level
        this.turn = turn
      } catch (error) {
        console.error('Failed to purchase item', error)
      } finally {
        await this.fetchQuests()
        this.isLoading = false
      }
    },
  },
})
