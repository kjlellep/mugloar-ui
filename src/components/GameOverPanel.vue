<template>
  <div class="game-over">
    <h2>Game Over</h2>
    <p>{{ lastResult?.message || 'You have been defeated.' }}</p>
    <p><strong>Score:</strong> {{ score }}</p>
    <p><strong>Turn Reached:</strong> {{ turn }}</p>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

const gameStore = useGameStore()
const score = computed(() => gameStore.score)
const turn = computed(() => gameStore.turn)
const lastResult = computed(() => gameStore.lastQuestResult)
</script>
