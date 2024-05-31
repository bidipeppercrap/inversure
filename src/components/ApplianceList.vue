<script setup>
import { parseDelimit, toDelimit } from '@/numbering';
import { ref, reactive, computed } from 'vue';

const emit = defineEmits(['kwhChange'])

const kwh = computed(() => {
    if (appliances.some(a => isNaN(a.wattage))) return 'Invalid wattage'
    if (appliances.some(a => isNaN(a.hours) || a.hours.length < 1)) return 'Invalid hours'
    if (appliances.some(a => isNaN(a.qty))) return 'Invalid quantity'
    
    const total = toDelimit(appliances.reduce((acc, curr) => curr.enabled ? acc + (parseDelimit(curr.wattage) * parseDelimit(curr.hours) * parseDelimit(curr.qty)) : acc, 0) / 1_000)
    emit('kwhChange', total)

    return total
})
const appliances = reactive([])

function addAppliance() {
    appliances.push({
        enabled: true,
        wattage: '',
        hours: '',
        name: '',
        qty: 1
    })
}

function removeAppliance(index) {
    appliances.splice(index, 1)
}

</script>

<template>
    <div class="border-2 border-black rounded-lg p-5">
        <h1 class="mb-5 text-3xl">🔌 Appliance List</h1>
        <div class="rounded-md bg-blue-300 mb-3 p-3">
            Total kWh = <strong>{{ kwh }} kWh</strong>
        </div>
        <div v-for="appliance, i in appliances" :key="i" class="flex border-1 border-black rounded-sm mb-2">
            <input class="mr-3" type="checkbox" :id="`${i}-enabled`" v-model="appliance.enabled">
            <input class="rounded-md shadow-sm border-0 ring-1 ring-inset ring-gray-300 py-1.5 pl-2 pr-20 mr-1" type="text" :id="`${i}-name`" v-model="appliance.name" placeholder="Name">
            <input class="rounded-md shadow-sm border-0 ring-1 ring-inset ring-gray-300 py-1.5 pl-2 pr-20 mr-1" type="text" :id="`${i}-wattage`" v-model="appliance.wattage" placeholder="Wattage">
            <input class="rounded-md shadow-sm border-0 ring-1 ring-inset ring-gray-300 py-1.5 pl-2 pr-20 mr-1" type="text" :id="`${i}-qty`" v-model="appliance.qty" placeholder="Quantity">
            <input class="rounded-md shadow-sm border-0 ring-1 ring-inset ring-gray-300 py-1.5 pl-2 pr-20 mr-1" type="text" :id="`${i}-hours`" v-model="appliance.hours" placeholder="Hours">
            <button type="button" class="px-3 border-2 border-red-950 bg-red-500 shadow-md text-red-100 rounded-md mr-1" @click="removeAppliance(i)">x</button>
        </div>
        <button type="button" class="p-2 border-2 border-black bg-blue-300 rounded-md shadow-md" @click="addAppliance()">Add</button>
    </div>
</template>