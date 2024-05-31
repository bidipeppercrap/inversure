<script setup>
import { parseDelimit, toDelimit } from '@/numbering';
import { ref, computed } from 'vue'

const emit = defineEmits(['kwhChange'])

const ah = ref(0)
const voltage = ref(0)
const kwh = computed(() => {
    if (isNaN(ah.value)) return 'Invalid ampere hour'
    if (isNaN(voltage.value)) return 'Invalid voltage'

    const total = toDelimit(parseDelimit(ah.value) * parseDelimit(voltage.value) / 1_000)
    emit('kwhChange', total)

    return `${total} kWh`
})
</script>

<template>
    <div class="border-2 border-black rounded-lg p-5">
        <h1 class="mb-5 text-3xl">🔋 Battery</h1>
        <div class="bg-green-300 rounded-lg p-3 mb-3">
            Total kWh = <strong>{{ kwh }}</strong>
        </div>
        <h6 class="text-sm mb-2">Ampere hour (Ah)</h6>
        <input v-model="ah" class="border border-black rounded-md p-2" type="text" id="wattpeak" placeholder="Ampere hour (Ah)">
        <h6 class="text-sm mb-2">Voltage</h6>
        <input v-model="voltage" class="border border-black rounded-md p-2" type="text" id="wattpeak" placeholder="Voltage">
    </div>
</template>