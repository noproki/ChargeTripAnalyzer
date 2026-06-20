import type { Vehicle } from '../types'

/**
 * A curated set of popular electric cars.
 *
 * `consumptionKwhPer100Km` is a real-world reference figure (interpreted at the
 * model's reference speed). `chargePower10To80Kw` is the *average* DC power
 * sustained across the 10%–80% state-of-charge window, which is what matters for
 * trip planning — not the headline peak power. `batteryKwh` is usable capacity.
 *
 * Figures are approximate and meant as sensible starting points; users can
 * always switch to manual entry and fine-tune.
 */
export const VEHICLES: Vehicle[] = [
  { id: 'tesla-model-3-lr', name: 'Tesla Model 3 Long Range', batteryKwh: 75, consumptionKwhPer100Km: 16, chargePower10To80Kw: 150 },
  { id: 'tesla-model-y-lr', name: 'Tesla Model Y Long Range', batteryKwh: 75, consumptionKwhPer100Km: 17, chargePower10To80Kw: 155 },
  { id: 'tesla-model-s', name: 'Tesla Model S', batteryKwh: 95, consumptionKwhPer100Km: 18.5, chargePower10To80Kw: 160 },
  { id: 'vw-id3-pro', name: 'Volkswagen ID.3 Pro', batteryKwh: 58, consumptionKwhPer100Km: 16.5, chargePower10To80Kw: 100 },
  { id: 'vw-id4-pro', name: 'Volkswagen ID.4 Pro', batteryKwh: 77, consumptionKwhPer100Km: 18, chargePower10To80Kw: 120 },
  { id: 'hyundai-ioniq5', name: 'Hyundai Ioniq 5 (77.4 kWh)', batteryKwh: 74, consumptionKwhPer100Km: 18, chargePower10To80Kw: 175 },
  { id: 'kia-ev6', name: 'Kia EV6 (77.4 kWh)', batteryKwh: 74, consumptionKwhPer100Km: 17.5, chargePower10To80Kw: 185 },
  { id: 'bmw-i4-edrive40', name: 'BMW i4 eDrive40', batteryKwh: 81, consumptionKwhPer100Km: 17.5, chargePower10To80Kw: 150 },
  { id: 'bmw-ix3', name: 'BMW iX3', batteryKwh: 74, consumptionKwhPer100Km: 18.5, chargePower10To80Kw: 125 },
  { id: 'audi-q4-etron-40', name: 'Audi Q4 e-tron 40', batteryKwh: 77, consumptionKwhPer100Km: 18, chargePower10To80Kw: 120 },
  { id: 'mercedes-eqb-300', name: 'Mercedes EQB 300', batteryKwh: 66.5, consumptionKwhPer100Km: 19, chargePower10To80Kw: 100 },
  { id: 'polestar-2-lr', name: 'Polestar 2 Long Range', batteryKwh: 78, consumptionKwhPer100Km: 18, chargePower10To80Kw: 135 },
  { id: 'skoda-enyaq-80', name: 'Škoda Enyaq 80', batteryKwh: 77, consumptionKwhPer100Km: 17.5, chargePower10To80Kw: 120 },
  { id: 'porsche-taycan', name: 'Porsche Taycan (Perf. Battery+)', batteryKwh: 83.7, consumptionKwhPer100Km: 21, chargePower10To80Kw: 190 },
  { id: 'renault-megane-etech', name: 'Renault Mégane E-Tech EV60', batteryKwh: 60, consumptionKwhPer100Km: 16, chargePower10To80Kw: 85 },
  { id: 'renault-zoe', name: 'Renault Zoe R135', batteryKwh: 52, consumptionKwhPer100Km: 17, chargePower10To80Kw: 40 },
  { id: 'fiat-500e', name: 'Fiat 500e (42 kWh)', batteryKwh: 37.3, consumptionKwhPer100Km: 14.5, chargePower10To80Kw: 70 },
  { id: 'peugeot-e208', name: 'Peugeot e-208', batteryKwh: 46.3, consumptionKwhPer100Km: 15.5, chargePower10To80Kw: 85 },
  { id: 'cupra-born', name: 'Cupra Born 58', batteryKwh: 58, consumptionKwhPer100Km: 16.5, chargePower10To80Kw: 110 },
  { id: 'volvo-ex30', name: 'Volvo EX30 ER', batteryKwh: 64, consumptionKwhPer100Km: 16.5, chargePower10To80Kw: 140 },
  { id: 'mg4', name: 'MG4 64 kWh', batteryKwh: 61, consumptionKwhPer100Km: 16, chargePower10To80Kw: 120 },
  { id: 'byd-atto3', name: 'BYD Atto 3', batteryKwh: 60, consumptionKwhPer100Km: 16, chargePower10To80Kw: 80 },
  { id: 'nissan-leaf-eplus', name: 'Nissan Leaf e+', batteryKwh: 56, consumptionKwhPer100Km: 17, chargePower10To80Kw: 45 },
]
