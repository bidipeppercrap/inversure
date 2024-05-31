<script setup>
import { parseDelimit, toDelimit } from '@/numbering';
import { ref, computed } from 'vue';

const emit = defineEmits(['generatedKwhChange'])

const wp = ref(0)
const runtime = ref(0)

const generatedKwh = computed(() => {
    if (isNaN(wp.value)) return 'Invalid watt peak'
    if (isNaN(runtime.value)) return 'Invalid runtime'

    const kwh = toDelimit(parseDelimit(wp.value) * parseDelimit(runtime.value) / 1_000)
    emit('generatedKwhChange', kwh)

    return `${kwh} kWh`
})
</script>

<template>
    <div class="border-2 border-black rounded-lg p-5">
        <h1 class="mb-5 text-3xl">☀️ Panel Installation</h1>
        <div class="bg-yellow-300 rounded-lg p-3 mb-3">
            Total Generated kWh = <strong>{{ generatedKwh }}</strong>
        </div>
        <div class="mb-3">
            <h6 class="text-sm mb-2">Watt Peak</h6>
            <input v-model="wp" class="border border-black rounded-md p-2" type="text" id="wattpeak" placeholder="Watt Peak">
        </div>
        <div>
            <h6 class="text-sm mb-2">Runtime (h)</h6>
            <input v-model="runtime" class="border border-black rounded-md p-2" type="text" id="wattpeak" placeholder="Runtime (h)">
        </div>
    </div>
</template>