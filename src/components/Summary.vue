<script setup>
import { ref, computed } from 'vue';
import { toDelimit } from '@/numbering';

const props = defineProps({
    generatedKwh: {
        type: Number,
        default: 0
    },
    batteryKwh: {
        type: Number,
        default: 0
    },
    appliancesKwh: {
        type: Number,
        default: 0
    },
    inverterEfficiency: {
        type: Number,
        default: 1
    }
})

const chargedKwh = computed(() => {
    return toDelimit(props.generatedKwh >= props.batteryKwh ? props.batteryKwh : props.generatedKwh)
})
const chargedBattery = computed(() => {
    const chargedPercentage = chargedKwh.value >= props.batteryKwh ? 100 : (chargedKwh.value / props.batteryKwh * 100)

    return `${toDelimit(chargedKwh.value)} kWh (${toDelimit(chargedPercentage)}%)`
})
const chargingSurplus = computed(() => {
    const surplusKwh = props.generatedKwh > props.batteryKwh ? props.generatedKwh - props.batteryKwh : 0

    return toDelimit(surplusKwh)
})
const consumption = computed(() => {
    const loss = props.appliancesKwh - (props.appliancesKwh * props.inverterEfficiency)
    return toDelimit(props.appliancesKwh + loss)
})
const capacity = computed(() => {
    return toDelimit(chargedKwh.value - consumption.value)
})
const surplusRemaining = computed(() => {
    return toDelimit(chargingSurplus.value + capacity.value)
})
</script>

<template>
    <div class="border-2 border-black rounded-lg p-5">
        <h1 class="mb-5 text-3xl">Summary</h1>
        <div class="rounded-lg bg-gray-300 mb-3 p-3">
            ☀️ Generated kWh = <strong>{{ generatedKwh }} kWh</strong><br>
            🪫 Battery Capacity = <strong>{{ batteryKwh }} kWh</strong><br>
            <hr class="my-2 border-black">
            🔋 Charged = <strong>{{ chargedBattery }}</strong><br>
            ⚡ Consumption ({{ appliancesKwh }} kWh + {{ inverterEfficiency * 100 }}% Efficiency) = <strong>{{ consumption }} kWh</strong>
        </div>
        <div v-if="capacity < 0" class="rounded-lg bg-red-100 p-3">
            🪫 Capacity Required = <strong>{{ capacity * -1 }} kWh</strong>
        </div>
        <div v-if="capacity >= 0" class="rounded-lg bg-green-100 p-3">
            🔋 Capacity Left = <strong>{{ capacity }} kWh</strong>
        </div>
        <div v-if="chargingSurplus > 0" class="rounded-lg bg-yellow-100 p-3 mt-3">
            🌞 Surplus = <strong>{{ chargingSurplus }} kWh</strong>
            <div v-if="capacity < 0">
                <hr class="my-2 border-black">
                <span v-if="surplusRemaining < 0" class="text-red-900">🔅 Surplus Required = <strong>{{ surplusRemaining * -1 }} kWh</strong></span>
                <span v-if="surplusRemaining >= 0" class="text-green-900">⚡ Surplus Left = <strong>{{ surplusRemaining }} kWh</strong></span>
            </div>
        </div>
    </div>
</template>