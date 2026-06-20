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

  // Imported from a vehicle dataset (Tesla, BYD, Hyundai, Kia, Genesis trims).
  // `batteryKwh` is the dataset's capacity; `consumptionKwhPer100Km` is derived
  // from capacity ÷ WLTP range; `chargePower10To80Kw` is *estimated* from the
  // pack's voltage architecture (the source had no charging-power figures).
  { id: 'byd-ev-86-4-kwh-517-ps-awd', name: 'BYD Tang (86.4 kWh, 517 PS)', batteryKwh: 86.4, consumptionKwhPer100Km: 21.6, chargePower10To80Kw: 190 },
  { id: 'byd-extended-range-60-48-kwh-204-ps-bev', name: 'BYD Atto 3 Extended Range (60.5 kWh, 204 PS)', batteryKwh: 60.5, consumptionKwhPer100Km: 14.4, chargePower10To80Kw: 75 },
  { id: 'byd-60-kwh-204-ps-bev', name: 'BYD Dolphin (60 kWh, 204 PS)', batteryKwh: 60.0, consumptionKwhPer100Km: 14.1, chargePower10To80Kw: 70 },
  { id: 'byd-standard-range-49-92-kwh-204-ps-bev', name: 'BYD Atto 3 Standard Range (49.9 kWh, 204 PS)', batteryKwh: 49.9, consumptionKwhPer100Km: 15.6, chargePower10To80Kw: 60 },
  { id: 'byd-45-12-kwh-177-ps-electric', name: 'BYD Atto 2 (45.1 kWh, 177 PS)', batteryKwh: 45.1, consumptionKwhPer100Km: 14.5, chargePower10To80Kw: 55 },
  { id: 'byd-44-9-kwh-136-ps-electric', name: 'BYD Dolphin (44.9 kWh, 136 PS)', batteryKwh: 44.9, consumptionKwhPer100Km: 19.3, chargePower10To80Kw: 55 },
  { id: 'byd-43-2-kwh-156-ps-electric', name: 'BYD Dolphin Surf (43.2 kWh, 156 PS)', batteryKwh: 43.2, consumptionKwhPer100Km: 13.9, chargePower10To80Kw: 50 },
  { id: 'byd-43-2-kwh-88-ps-electric', name: 'BYD Dolphin Surf (43.2 kWh, 88 PS)', batteryKwh: 43.2, consumptionKwhPer100Km: 13.4, chargePower10To80Kw: 50 },
  { id: 'byd-30-kwh-88-ps-electric', name: 'BYD Dolphin Surf (30 kWh, 88 PS)', batteryKwh: 30.0, consumptionKwhPer100Km: 13.6, chargePower10To80Kw: 40 },
  { id: 'genesis-electrified-87-2-kwh-370-ps-awd', name: 'Genesis Electrified G80 (87.2 kWh, 370 PS)', batteryKwh: 87.2, consumptionKwhPer100Km: 16.8, chargePower10To80Kw: 190 },
  { id: 'genesis-electrified-77-4-kwh-490-ps-awd', name: 'Genesis Electrified GV70 (77.4 kWh, 490 PS)', batteryKwh: 77.4, consumptionKwhPer100Km: 17.4, chargePower10To80Kw: 170 },
  { id: 'genesis-sport-plus-77-4-kwh-490-ps-bev-awd', name: 'Genesis GV60 Sport Plus (77.4 kWh, 490 PS)', batteryKwh: 77.4, consumptionKwhPer100Km: 16.6, chargePower10To80Kw: 170 },
  { id: 'hyundai-long-range-110-3-kwh-218-ps', name: 'Hyundai Ioniq 9 (110.3 kWh, 218 PS)', batteryKwh: 110.3, consumptionKwhPer100Km: 17.8, chargePower10To80Kw: 245 },
  { id: 'hyundai-longrange-77-4-kwh-229-ps-bev', name: 'Hyundai Ioniq 6 Long Range (77.4 kWh, 229 PS)', batteryKwh: 77.4, consumptionKwhPer100Km: 14.2, chargePower10To80Kw: 170 },
  { id: 'hyundai-longrange-77-4-kwh-325-ps-bev-awd', name: 'Hyundai Ioniq 6 Long Range AWD (77.4 kWh, 325 PS)', batteryKwh: 77.4, consumptionKwhPer100Km: 14.9, chargePower10To80Kw: 170 },
  { id: 'hyundai-long-range-72-6-kwh-217-ps-electric', name: 'Hyundai Ioniq 5 Long Range (72.6 kWh, 217 PS)', batteryKwh: 72.6, consumptionKwhPer100Km: 16.1, chargePower10To80Kw: 160 },
  { id: 'hyundai-long-range-72-6-kwh-305-ps-electric-awd', name: 'Hyundai Ioniq 5 Long Range AWD (72.6 kWh, 305 PS)', batteryKwh: 72.6, consumptionKwhPer100Km: 16.9, chargePower10To80Kw: 160 },
  { id: 'hyundai-67-kwh-204-ps-electric', name: 'Hyundai Kona Electric (67 kWh, 204 PS)', batteryKwh: 67.0, consumptionKwhPer100Km: 13.8, chargePower10To80Kw: 100 },
  { id: 'hyundai-long-range-67-kwh-204-ps-electric', name: 'Hyundai Kona Electric (67 kWh, 204 PS)', batteryKwh: 67.0, consumptionKwhPer100Km: 13.8, chargePower10To80Kw: 100 },
  { id: 'hyundai-long-range-65-4-kwh-218-ps-electric', name: 'Hyundai Kona Electric (2nd gen) (65.4 kWh, 218 PS)', batteryKwh: 65.4, consumptionKwhPer100Km: 14.7, chargePower10To80Kw: 100 },
  { id: 'hyundai-standard-range-58-kwh-170-ps-electric', name: 'Hyundai Ioniq 5 Standard Range (58 kWh, 170 PS)', batteryKwh: 58.0, consumptionKwhPer100Km: 15.1, chargePower10To80Kw: 85 },
  { id: 'hyundai-standard-range-58-kwh-235-ps-electric-awd', name: 'Hyundai Ioniq 5 Standard Range AWD (58 kWh, 235 PS)', batteryKwh: 58.0, consumptionKwhPer100Km: 16.1, chargePower10To80Kw: 85 },
  { id: 'hyundai-standard-53-kwh-151-ps-bev', name: 'Hyundai Ioniq 6 Standard Range (53 kWh, 151 PS)', batteryKwh: 53.0, consumptionKwhPer100Km: 12.4, chargePower10To80Kw: 80 },
  { id: 'hyundai-long-range-49-kwh-115-ps-electric', name: 'Hyundai Inster Long Range (49 kWh, 115 PS)', batteryKwh: 49.0, consumptionKwhPer100Km: 13.8, chargePower10To80Kw: 75 },
  { id: 'hyundai-standard-range-48-4-kwh-156-ps-electric', name: 'Hyundai Kona Electric (2nd gen) Standard Range (48.4 kWh, 156 PS)', batteryKwh: 48.4, consumptionKwhPer100Km: 12.8, chargePower10To80Kw: 75 },
  { id: 'hyundai-42-kwh-136-ps-electric', name: 'Hyundai Kona Electric (42 kWh, 136 PS)', batteryKwh: 42.0, consumptionKwhPer100Km: 13.5, chargePower10To80Kw: 65 },
  { id: 'hyundai-standard-range-42-kwh-97-ps-electric', name: 'Hyundai Inster (42 kWh, 97 PS)', batteryKwh: 42.0, consumptionKwhPer100Km: 14.0, chargePower10To80Kw: 65 },
  { id: 'hyundai-standard-range-42-kwh-136-ps-electric', name: 'Hyundai Kona Electric (42 kWh, 136 PS)', batteryKwh: 42.0, consumptionKwhPer100Km: 13.8, chargePower10To80Kw: 65 },
  { id: 'hyundai-40-4-kwh-136-ps-electric', name: 'Hyundai Ioniq Electric (40.4 kWh, 136 PS)', batteryKwh: 40.4, consumptionKwhPer100Km: 13.0, chargePower10To80Kw: 60 },
  { id: 'kia-gt-99-8-kwh-508-ps-awd-electric-6-seat', name: 'Kia EV9 GT (6-seat) (99.8 kWh, 508 PS)', batteryKwh: 99.8, consumptionKwhPer100Km: 19.8, chargePower10To80Kw: 150 },
  { id: 'kia-gt-99-8-kwh-508-ps-awd-electric-7-seat', name: 'Kia EV9 GT (7-seat) (99.8 kWh, 508 PS)', batteryKwh: 99.8, consumptionKwhPer100Km: 19.8, chargePower10To80Kw: 150 },
  { id: 'kia-88-1-kwh-218-ps-long-range', name: 'Kia EV5 Long Range (88.1 kWh, 218 PS)', batteryKwh: 88.1, consumptionKwhPer100Km: 15.9, chargePower10To80Kw: 130 },
  { id: 'kia-88-1-kwh-313-ps-awd-long-range', name: 'Kia EV5 Long Range AWD (88.1 kWh, 313 PS)', batteryKwh: 88.1, consumptionKwhPer100Km: 18.7, chargePower10To80Kw: 130 },
  { id: 'kia-81-4-kwh-204-ps-long-range', name: 'Kia EV4 Long Range (81.4 kWh, 204 PS)', batteryKwh: 81.4, consumptionKwhPer100Km: 12.9, chargePower10To80Kw: 120 },
  { id: 'kia-71-2-kwh-163-ps-long-range', name: 'Kia PV5 (71.2 kWh, 163 PS)', batteryKwh: 71.2, consumptionKwhPer100Km: 17.9, chargePower10To80Kw: 105 },
  { id: 'kia-64-2-kwh-218-ps-standard-range', name: 'Kia EV5 Standard Range (64.2 kWh, 218 PS)', batteryKwh: 64.2, consumptionKwhPer100Km: 16.1, chargePower10To80Kw: 95 },
  { id: 'kia-58-3-kwh-204-ps-standard-range', name: 'Kia EV4 Standard Range (58.3 kWh, 204 PS)', batteryKwh: 58.3, consumptionKwhPer100Km: 13.6, chargePower10To80Kw: 85 },
  { id: 'kia-51-5-kwh-122-ps-standard-range', name: 'Kia PV5 Standard Range (51.5 kWh, 122 PS)', batteryKwh: 51.5, consumptionKwhPer100Km: 17.7, chargePower10To80Kw: 75 },
  { id: 'tesla-100d-100-kwh-422-ps-dual-motor-awd', name: 'Tesla Model X 100D (100 kWh, 422 PS)', batteryKwh: 100.0, consumptionKwhPer100Km: 19.1, chargePower10To80Kw: 160 },
  { id: 'tesla-long-range-100-kwh-541-ps-dual-motor-awd', name: 'Tesla Model S Long Range (100 kWh, 541 PS)', batteryKwh: 100.0, consumptionKwhPer100Km: 15.5, chargePower10To80Kw: 160 },
  { id: 'tesla-long-range-100-kwh-670-ps-dual-motor-awd', name: 'Tesla Model X Long Range (100 kWh, 670 PS)', batteryKwh: 100.0, consumptionKwhPer100Km: 17.9, chargePower10To80Kw: 160 },
  { id: 'tesla-p100d-100-kwh-611-ps-dual-motor-awd', name: 'Tesla Model S P100D (100 kWh, 611 PS)', batteryKwh: 100.0, consumptionKwhPer100Km: 20.4, chargePower10To80Kw: 160 },
  { id: 'tesla-performance-100-kwh-611-ps-dual-motor-awd', name: 'Tesla Model S Performance (100 kWh, 611 PS)', batteryKwh: 100.0, consumptionKwhPer100Km: 16.1, chargePower10To80Kw: 160 },
  { id: 'tesla-plaid-100-kwh-1020-ps-dual-motor-awd', name: 'Tesla Model X Plaid (100 kWh, 1020 PS)', batteryKwh: 100.0, consumptionKwhPer100Km: 18.7, chargePower10To80Kw: 160 },
  { id: 'tesla-long-range-82-kwh-498-ps-dual-motor-awd', name: 'Tesla Model 3 Long Range AWD (82 kWh, 498 PS)', batteryKwh: 82.0, consumptionKwhPer100Km: 13.0, chargePower10To80Kw: 130 },
  { id: 'tesla-long-range-80-5-kwh-441-ps-dual-motor-awd', name: 'Tesla Model 3 Long Range AWD (80.5 kWh, 441 PS)', batteryKwh: 80.5, consumptionKwhPer100Km: 13.1, chargePower10To80Kw: 130 },
  { id: 'tesla-long-range-80-5-kwh-514-ps-dual-motor-awd', name: 'Tesla Model Y Long Range AWD (80.5 kWh, 514 PS)', batteryKwh: 80.5, consumptionKwhPer100Km: 15.1, chargePower10To80Kw: 130 },
  { id: 'tesla-performance-80-5-kwh-513-ps-dual-motor-awd', name: 'Tesla Model 3 Performance (80.5 kWh, 513 PS)', batteryKwh: 80.5, consumptionKwhPer100Km: 14.2, chargePower10To80Kw: 130 },
  { id: 'tesla-performance-80-5-kwh-534-ps-dual-motor-awd', name: 'Tesla Model Y Performance (80.5 kWh, 534 PS)', batteryKwh: 80.5, consumptionKwhPer100Km: 15.7, chargePower10To80Kw: 130 },
  { id: 'tesla-long-range-79-kwh-283-ps', name: 'Tesla Model 3 Long Range (79 kWh, 283 PS)', batteryKwh: 79.0, consumptionKwhPer100Km: 12.3, chargePower10To80Kw: 125 },
  { id: 'tesla-performance-79-kwh-460-ps-dual-motor-awd', name: 'Tesla Model 3 Performance (79 kWh, 460 PS)', batteryKwh: 79.0, consumptionKwhPer100Km: 15.0, chargePower10To80Kw: 125 },
  { id: 'tesla-long-range-78-1-kwh-347-ps', name: 'Tesla Model Y Long Range (78.1 kWh, 347 PS)', batteryKwh: 78.1, consumptionKwhPer100Km: 13.8, chargePower10To80Kw: 125 },
  { id: 'tesla-long-range-75-kwh-287-ps', name: 'Tesla Model 3 Long Range (75 kWh, 287 PS)', batteryKwh: 75.0, consumptionKwhPer100Km: 12.5, chargePower10To80Kw: 120 },
  { id: 'tesla-long-range-75-kwh-351-ps-dual-motor-awd', name: 'Tesla Model Y Long Range AWD (75 kWh, 351 PS)', batteryKwh: 75.0, consumptionKwhPer100Km: 14.8, chargePower10To80Kw: 120 },
  { id: 'tesla-60-kwh-283-ps', name: 'Tesla Model 3 (60 kWh, 283 PS)', batteryKwh: 60.0, consumptionKwhPer100Km: 11.7, chargePower10To80Kw: 95 },
  { id: 'tesla-60-kwh-325-ps', name: 'Tesla Model 3 Standard Range (60 kWh, 325 PS)', batteryKwh: 60.0, consumptionKwhPer100Km: 12.2, chargePower10To80Kw: 95 },
  { id: 'tesla-standard-range-60-kwh-299-ps', name: 'Tesla Model Y Standard Range (60 kWh, 299 PS)', batteryKwh: 60.0, consumptionKwhPer100Km: 14.0, chargePower10To80Kw: 95 },
  { id: 'tesla-standard-plus-54-kwh-325-ps', name: 'Tesla Model 3 Standard Range Plus (54 kWh, 325 PS)', batteryKwh: 54.0, consumptionKwhPer100Km: 12.1, chargePower10To80Kw: 85 },
  { id: 'tesla-standard-range-50-kwh-204-ps', name: 'Tesla Model 3 Standard Range (50 kWh, 204 PS)', batteryKwh: 50.0, consumptionKwhPer100Km: 11.0, chargePower10To80Kw: 80 },

  // Ford Explorer Electric (MEB platform). Consumption derived from WLTP range;
  // charge power is the typical avg across the 10%-80% window.
  { id: 'ford-explorer-er-rwd', name: 'Ford Explorer Extended Range RWD (77 kWh, 286 PS)', batteryKwh: 77, consumptionKwhPer100Km: 12.8, chargePower10To80Kw: 100 },
  { id: 'ford-explorer-er-awd', name: 'Ford Explorer Extended Range AWD (79 kWh, 340 PS)', batteryKwh: 79, consumptionKwhPer100Km: 14, chargePower10To80Kw: 115 },
  { id: 'ford-explorer-sr-rwd', name: 'Ford Explorer Standard Range RWD (52 kWh, 170 PS)', batteryKwh: 52, consumptionKwhPer100Km: 13.9, chargePower10To80Kw: 80 },
]
