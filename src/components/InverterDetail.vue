<script setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['efficiencyChange'])

const efficiencyPercentage = ref(0)

const inverterEfficiencyFactor = computed(() => {
    const factor = parseInt((efficiencyPercentage || 100) ?? 100) / 100
    emit('efficiencyChange', factor)
})
</script>

<template>
    <div class="border-2 border-black rounded-lg p-5">
        <h1 class="mb-5 text-3xl">🔀 Inverter</h1>
        <h6 class="text-sm mb-2">Efficiency (%)</h6>
        <input @input="event => emit('efficiencyChange', parseInt((event.target.value || 100) ?? 100) / 100)" class="border border-black rounded-md p-2" type="text" id="wattpeak" placeholder="Efficiency (%)">
    </div>
</template>