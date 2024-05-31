<script setup>
import PanelInput from './components/PanelInput.vue'
import InverterDetail from './components/InverterDetail.vue'
import BatteryDetail from './components/BatteryDetail.vue'
import ApplianceList from './components/ApplianceList.vue';
import Summary from './components/Summary.vue'

import { ref } from 'vue';

const generatedKwh = ref(0)
const batteryKwh = ref(0)
const applianceKwh = ref(0)
const inverterEfficiency = ref(0)
</script>

<template>
  <main class="p-5">
    <Summary
      :generatedKwh="generatedKwh"
      :batteryKwh="batteryKwh"
      :appliances-kwh="applianceKwh"
      :inverter-efficiency="inverterEfficiency"
    />
    <div class="mb-5"></div>
    <InverterDetail @efficiency-change="value => inverterEfficiency = value" />
    <div class="mb-5"></div>
    <BatteryDetail @kwh-change="value => batteryKwh = value" />
    <div class="mb-5"></div>
    <PanelInput @generated-kwh-change="value => generatedKwh = value" />
    <div class="mb-5"></div>
    <ApplianceList @kwh-change="value => applianceKwh = value" />
  </main>
</template>
