<script setup>
import PanelSeries from './PanelSeries.vue'
import { ref, computed } from 'vue'

const props = defineProps({
    index: Number,
    panel: {
        type: Object,
        default(rawProps) {
            return {
                downstreamVoltage: 0,
                openVoltage: '',
                current: '',
                brand: ''
            }
        }
    }
})

const emit = defineEmits(['removePanel', 'onChange', 'voltageChange', 'downstreamVoltageChange', 'removeSeries'])

const seriesVoltage = computed(() => {
    return parseInt(props.panel.openVoltage || 0) ?? 0
})

function handleOnChange(newPanel) {
    emit('onChange', newPanel)
}
function handleOnVoltageChange(value) {
    emit('voltageChange', parseInt(value || 0) ?? 0)
}
function handleDownstreamVoltageChange(voltage) {
    emit('downstreamVoltageChange', voltage)
}

function addSeries(panel) {
    panel.panels = []
    panel.panels.push({
        downstreamVoltage: 0,
        openVoltage: '',
        current: '',
        brand: ''
    })
}

function removeSeries(index) {
    emit('removeSeries', index)
}
</script>

<template>
    <div class="border-2 border-black rounded-md mb-2 p-2">
        <div class="flex">
            <input
                class="rounded-md shadow-sm border-0 ring-1 ring-inset ring-gray-300 py-1.5 pl-2 pr-20 mr-1" type="text" :id="`${index}-openVoltage`"
                :value="panel.openVoltage"
                @input="event => handleOnVoltageChange(event.target.value)"
                placeholder="Open Voltage"
            >
            <input
                class="rounded-md shadow-sm border-0 ring-1 ring-inset ring-gray-300 py-1.5 pl-2 pr-20 mr-1" type="text" :id="`${index}-openVoltage`"
                :value="panel.current"
                @input="event => handleOnChange({...panel, current: event.target.value })"
                placeholder="Current"
            >
            <input
                class="rounded-md shadow-sm border-0 ring-1 ring-inset ring-gray-300 py-1.5 pl-2 pr-20 mr-1" type="text" :id="`${index}-brand`"
                :value="panel.brand"
                @input="event => handleOnChange({...panel, brand: event.target.value })"
                placeholder="Brand"
            >
            <button type="button" class="px-3 border-2 border-red-950 bg-red-500 shadow-md text-red-100 rounded-md mr-1" @click="emit('removePanel', index)">x</button>
            <button v-if="!panel.panels" type="button" class="px-2 border-2 border-black bg-yellow-200 shadow-md rounded-md mr-1" @click="addSeries(panel)">Add Series</button>
            <button v-if="panel.panels" type="button" class="px-2 border-2 border-black bg-red-500 shadow-md rounded-md mr-1" @click="removeSeries(index)">Remove Series</button>
        </div>
        <div v-if="panel.panels" class="ml-5 mt-2">
            <PanelSeries
                @voltage-change="v => handleDownstreamVoltageChange(v)"
                @downstream-voltage-change="v => handleDownstreamVoltageChange(v)"
            />
        </div>
    </div>
</template>