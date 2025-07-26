<template>
  <div class="status-bar">
    <span><strong>Lives:</strong> {{ lives }}</span>
    <span><strong>Gold:</strong> {{ gold }}</span>
    <span><strong>Score:</strong> {{ score }}</span>
    <span><strong>Turn:</strong> {{ turn }}</span>
    <span><strong>Level:</strong> {{ level }}</span>
    <span><strong>High Score:</strong> {{ highScore }}</span>

    <div v-if="lastResult" class="quest-status">
      <span class="result-message">{{ lastResult.message }}</span>
      <span :class="['status-label', lastResult.success ? 'success' : 'fail']">
        {{ lastResult.success ? 'Success' : 'Failure' }}
      </span>
    </div>

    <div v-if="!gameOver" class="dropdown">
      <button @click="toggleDropdown" class="dropdown-toggle">Reputation ▼</button>
      <div v-if="dropdownOpen" class="dropdown-content">
        <p><strong>People:</strong> {{ peopleRep }}</p>
        <p><strong>State:</strong> {{ stateRep }}</p>
        <p><strong>Underworld:</strong> {{ underworldRep }}</p>
        <div class="tooltip-container">
          <button class="investigation-button" @click="runInvestigation" :disabled="isLoading">
            Investigate
          </button>
          <span class="tooltip-text">Takes 1 turn</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const lives = computed(() => gameStore.lives)
const gold = computed(() => gameStore.gold)
const score = computed(() => gameStore.score)
const turn = computed(() => gameStore.turn)
const level = computed(() => gameStore.level)
const highScore = computed(() => gameStore.highScore)
const lastResult = computed(() => gameStore.lastQuestResult)
const peopleRep = computed(() => gameStore.peopleRep)
const stateRep = computed(() => gameStore.stateRep)
const underworldRep = computed(() => gameStore.underworldRep)
const isLoading = computed(() => gameStore.isLoading)
const gameStarted = computed(() => gameStore.gameId !== null)
const gameOver = computed(() => gameStarted.value && lives.value === 0)

const runInvestigation = async () => {
  await gameStore.runInvestigation()
}

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = (event) => {
  const dropdown = document.querySelector('.dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
