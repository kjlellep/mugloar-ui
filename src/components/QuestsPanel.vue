<template>
  <div class="quests-panel">
    <div class="quests-header">
      <h2>Available Quests</h2>
      <button @click="fetchQuests" :disabled="isLoading">Refresh</button>
    </div>

    <ul class="quests-grid">
      <li
        v-for="quest in sortedQuests"
        :key="quest.adId"
        class="quest-item"
        :class="{ locked: quest.encrypted }"
      >
        <template v-if="quest.encrypted">
          <p><strong>Secret mission</strong></p>
          <p>Unlocks in {{ quest.encrypted }} turn(s)</p>
        </template>

        <template v-else>
          <p class="quest-message">{{ quest.message }}</p>
          <p><strong>Reward:</strong> {{ quest.reward }}</p>
          <p><strong>Expires in:</strong> {{ quest.expiresIn }} turn(s)</p>
          <p><strong>Chance:</strong> {{ quest.probability }}</p>
        </template>

        <button @click="solveQuest(quest.adId)" :disabled="isLoading || quest.encrypted">
          Attempt Quest
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

const gameStore = useGameStore()

const isLoading = computed(() => gameStore.isLoading)
const fetchQuests = () => gameStore.fetchQuests()
const solveQuest = (adId) => gameStore.solveQuest(adId)

const sortedQuests = computed(() => {
  return [...gameStore.messages].sort((a, b) => {
    if (a.encrypted && !b.encrypted) return 1
    if (!a.encrypted && b.encrypted) return -1
    return b.reward - a.reward
  })
})
</script>
