<template>
  <div class="shop-panel">
    <div class="shop-header">
      <h2>Shop</h2>
    </div>
    <ul class="shop-grid">
      <li v-for="item in shopItems" :key="item.id" class="shop-item">
        <p>
          <strong>{{ item.name }}</strong>
        </p>
        <p>Cost: {{ item.cost }}</p>
        <button @click="purchaseItem(item.id)" :disabled="isLoading || gold < item.cost">
          Purchase
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

const gameStore = useGameStore()

const shopItems = computed(() => gameStore.shopItems)
const gold = computed(() => gameStore.gold)
const isLoading = computed(() => gameStore.isLoading)
const purchaseItem = (id) => gameStore.purchaseItem(id)
</script>
