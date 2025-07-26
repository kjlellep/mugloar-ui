<template>
  <StatusBar v-if="gameStarted" />
  <div :class="['outer-container', { centered: !gameStarted }]">
    <div class="game-container">
      <h1>Dragons of Mugloar</h1>

      <button @click="startGame" :disabled="isLoading">
        {{ isLoading ? 'Starting...' : gameStarted ? 'Restart Game' : 'Start Game' }}
      </button>

      <div v-if="gameStarted && !gameOver" class="game-panels">
        <div class="top-panels">
          <QuestsPanel />
        </div>
        <ShopPanel />
      </div>

      <GameOverPanel v-else-if="gameOver" />
    </div>
  </div>
</template>

<script setup>
import StatusBar from '@/components/StatusBar.vue'
import QuestsPanel from '@/components/QuestsPanel.vue'
import ShopPanel from '@/components/ShopPanel.vue'
import GameOverPanel from '@/components/GameOverPanel.vue'

import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

const gameStore = useGameStore()

const gameStarted = computed(() => gameStore.gameId !== null)
const isLoading = computed(() => gameStore.isLoading)
const lives = computed(() => gameStore.lives)
const gameOver = computed(() => gameStarted.value && lives.value === 0)

const startGame = async () => {
  if (gameStarted.value && !gameOver.value) {
    const confirmed = window.confirm(
      'Are you sure you want to restart the game? Current progress will be lost.',
    )
    if (!confirmed) return
  }
  await gameStore.startNewGame()
  await gameStore.fetchShop()
}
</script>
