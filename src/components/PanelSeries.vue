<script setup>
import PanelForm from './PanelForm.vue'
import { ref, computed } from 'vue'

const emit = defineEmits(['voltageChange', 'downstreamVoltageChange'])

const panels = ref([])

const wattPeak = computed(() => {
    if (panels.value.some(panel => isNaN(panel.openVoltage))) return 'Invalid open voltage'
    if (panels.value.some(panel => isNaN(panel.current))) return 'Invalid current'

    return panels.value.reduce((acc, curr) => acc + parseInt((curr.openVoltage || 0) ?? 0) * parseInt((curr.current || 0) ?? 0), 0)
})
const totalAmperage = computed(() => {
    if (panels.value.some(panel => isNaN(panel.current))) return 'Invalid current'

    return panels.value.reduce((acc, curr) => acc + parseInt((curr.current || 0) ?? 0), 0)
})
const lowestVoltage = computed(() => {
    if (!panels.value.length) return 0

    let voltages = panels.value.map(panel => parseInt((panel.openVoltage || 0) ?? 0) + parseInt((panel.downstreamVoltage || 0) ?? 0))

    const minimum = Math.min(...voltages)

    return minimum
})

function addParallelPanel() {
    panels.value.push({
        downstreamVoltage: 0,
        openVoltage: '',
        current: '',
        brand: ''
    })
}

function removePanel(index) {
    panels.value.splice(index, 1)
}

function removeSeries(index) {
    panels.value[index] = {...panels.value[index], panels: undefined, downstreamVoltage: 0}
    emit('voltageChange', parseInt(panels.value[index].openVoltage || 0) ?? 0)
}

function handleOnInput(index, newPanel) {
    panels.value[index] = newPanel
}

function handleVoltageChange(index, voltage) {
    panels.value[index] = {...panels.value[index], openVoltage: parseInt(voltage || 0) ?? 0 }
    emit('voltageChange', parseInt(voltage || 0) ?? 0)
}

function handleDownstreamVoltageChange(index, voltage) {
    panels.value[index] = {...panels.value[index], downstreamVoltage: parseInt(voltage || 0) ?? 0 }
    emit('voltageChange', voltage + parseInt(panels.value[index].openVoltage || 0) ?? 0)
}
</script>

<template>
    <div class="text-xs mb-3">
        Watt Peak = {{ wattPeak }}<br>
        Amperage = {{ totalAmperage }}<br>
        Voltage = {{ lowestVoltage }}
    </div>
    <PanelForm
        v-for="panel, i in panels" :key="i"
        @remove-panel="index => removePanel(index)"
        @on-change="newPanel => handleOnInput(i, newPanel)"
        @voltage-change="v => handleVoltageChange(i, v)"
        @downstream-voltage-change="v => handleDownstreamVoltageChange(i, v)"
        @remove-series="index => removeSeries(index)"
        :index="i"
        :panel="panel"
    />
    <button type="button" class="p-2 border-2 border-black bg-yellow-500 rounded-md shadow-md" @click="addParallelPanel">Add Parallel</button>
</template>