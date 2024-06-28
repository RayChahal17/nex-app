import React, { useState, useEffect } from 'react';
import { Button, Select, Label, Card, Alert, TextInput, Textarea } from 'flowbite-react';
import { PlusIcon, TrashIcon } from '@heroicons/react/solid';

export default function DashCostCalculator() {
   const [area, setArea] = useState(0);
   const [digArea, setDigArea] = useState(0);
   const [depth, setDepth] = useState(2);
   const [slabThickness, setSlabThickness] = useState(4);
   const [binType, setBinType] = useState('5-yard');
   const [reinforcementType, setReinforcementType] = useState('mesh');
   const [rodCount, setRodCount] = useState(0);
   const [meshCount, setMeshCount] = useState(0);
   const [concreteLoad, setConcreteLoad] = useState(0);
   const [generalLaborDays, setGeneralLaborDays] = useState(0);
   const [generalLaborWorkers, setGeneralLaborWorkers] = useState(0);
   const [generalLaborCost, setGeneralLaborCost] = useState(110);
   const [supervisoryLaborDays, setSupervisoryLaborDays] = useState(0);
   const [supervisoryLaborWorkers, setSupervisoryLaborWorkers] = useState(0);
   const [supervisoryLaborCost, setSupervisoryLaborCost] = useState(135);
   const [gravelType, setGravelType] = useState('clean');
   const [gravelYards, setGravelYards] = useState(0);
   const [gravelCost, setGravelCost] = useState(55);
   const [extraCosts, setExtraCosts] = useState([]);
   const [totalCost, setTotalCost] = useState(0);
   const [details, setDetails] = useState('');

   useEffect(() => {
      if (area > 0) {
         calculateReinforcement();
         calculateConcreteLoad();
         calculateGravelYards();
         calculateBins();
         calculateTotalCost();
      }
   }, [area, slabThickness, reinforcementType, gravelType, depth, digArea, generalLaborDays, generalLaborWorkers, supervisoryLaborDays, supervisoryLaborWorkers, extraCosts]);

   const calculateReinforcement = () => {
      if (reinforcementType === 'mesh') {
         const meshCoverage = 32;
         const requiredMesh = Math.ceil(area / meshCoverage);
         setMeshCount(requiredMesh);
         setRodCount(0);
      } else {
         const rodsPerSqFt = 1 / 10;
         const requiredRods = Math.ceil(area * rodsPerSqFt);
         setRodCount(requiredRods);
         setMeshCount(0);
      }
   };

   const calculateConcreteLoad = () => {
      const thicknessInFeet = slabThickness / 12;
      const volume = area * thicknessInFeet * 0.0125;
      setConcreteLoad(volume);
   };

   const calculateGravelYards = () => {
      const gravelVolume = area * 0.00333;
      setGravelYards(gravelVolume);
   };

   const handleGravelTypeChange = (e) => {
      const type = e.target.value;
      setGravelType(type);
      switch (type) {
         case 'clean':
            setGravelCost(55);
            break;
         case 'recycled':
            setGravelCost(25);
            break;
         case 'crushed':
            setGravelCost(30);
            break;
         case 'below-pavers':
            setGravelCost(40);
            break;
         default:
            setGravelCost(55);
      }
   };

   const calculateBins = () => {
      const depthInFeet = depth / 12;
      const volume = digArea * depthInFeet;

      let binCapacity;
      switch (binType) {
         case '5-yard':
            binCapacity = 5 * 27;
            break;
         case '10-yard':
            binCapacity = 10 * 27;
            break;
         case '14-yard':
            binCapacity = 14 * 27;
            break;
         default:
            binCapacity = 5 * 27;
      }

      const numberOfBins = Math.ceil(volume / binCapacity);
      return numberOfBins;
   };

   const calculateTotalCost = () => {
      let binCost;
      const numberOfBins = calculateBins();

      switch (binType) {
         case '5-yard':
            binCost = 400 * numberOfBins;
            break;
         case '10-yard':
            binCost = 450 * numberOfBins;
            break;
         case '14-yard':
            binCost = 550 * numberOfBins;
            break;
         default:
            binCost = 400 * numberOfBins;
      }

      const rodCost = rodCount * 3;
      const meshCost = meshCount * 6;
      const concreteCost = concreteLoad * 245;

      const totalGeneralLaborCost = generalLaborDays * generalLaborWorkers * generalLaborCost;
      const totalSupervisoryLaborCost = supervisoryLaborDays * supervisoryLaborWorkers * supervisoryLaborCost;

      const extraCostTotal = extraCosts.reduce((total, cost) => total + parseFloat(cost.cost || 0), 0);

      const gravelTotalCost = gravelYards * gravelCost;
      const total = binCost + rodCost + meshCost + concreteCost + totalGeneralLaborCost + totalSupervisoryLaborCost + gravelTotalCost + extraCostTotal;
      setTotalCost(total);
      generateDetails(binCost, rodCost, meshCost, concreteCost, totalGeneralLaborCost, totalSupervisoryLaborCost, gravelTotalCost, extraCostTotal, numberOfBins);
   };

   const generateDetails = (binCost, rodCost, meshCost, concreteCost, totalGeneralLaborCost, totalSupervisoryLaborCost, gravelTotalCost, extraCostTotal, numberOfBins) => {
      let details = `
      <h2 class="text-2xl font-bold mb-4 text-gray-700">Summary</h2>
      <h3 class="text-xl font-semibold mb-2 text-gray-600">Project Area Details</h3>
      <table class="table-auto w-full mb-4">
        <tbody>
          <tr>
            <td class="border px-4 py-2">Total Area</td>
            <td class="border px-4 py-2">${area} sq ft</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Slab Thickness</td>
            <td class="border px-4 py-2">${slabThickness} inches</td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 mb-4 rounded-lg bg-gray-100">
        <h4 class="text-lg font-semibold mb-2">Formulas:</h4>
        <p>Total Area (sq meters) × 10.764 = Total Area (sq ft)</p>
      </div>
      <h3 class="text-xl font-semibold mb-2 text-gray-600">Concrete Details</h3>
      <table class="table-auto w-full mb-4">
        <tbody>
          <tr>
            <td class="border px-4 py-2">Concrete Load</td>
            <td class="border px-4 py-2">${concreteLoad.toFixed(2)} cubic meters</td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 mb-4 rounded-lg bg-gray-100">
        <h4 class="text-lg font-semibold mb-2">Formulas:</h4>
        <p>Slab Thickness (inches) / 12 = Slab Thickness (feet)</p>
        <p>Total Area (sq ft) × Slab Thickness (feet) × 0.0125 = Concrete Load (cubic meters)</p>
      </div>
      <h3 class="text-xl font-semibold mb-2 text-gray-600">Digging and Bin Details</h3>
      <table class="table-auto w-full mb-4">
        <tbody>
          <tr>
            <td class="border px-4 py-2">Dig Area</td>
            <td class="border px-4 py-2">${digArea} sq ft</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Depth for Bins</td>
            <td class="border px-4 py-2">${depth} inches</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Bin Type</td>
            <td class="border px-4 py-2">${binType}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Number of Bins</td>
            <td class="border px-4 py-2">${numberOfBins}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Bin Cost</td>
            <td class="border px-4 py-2">$${binCost}</td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 mb-4 rounded-lg bg-gray-100">
        <h4 class="text-lg font-semibold mb-2">Formulas:</h4>
        <p>Depth (inches) / 12 = Depth (feet)</p>
        <p>Dig Area (sq ft) × Depth (feet) = Volume (cubic feet)</p>
        <p>5 Yard Bin = 5 × 27 = 135 cubic feet</p>
        <p>Number of 5 Yard Bins = Volume (cubic feet) / 135</p>
        <p>10 Yard Bin = 10 × 27 = 270 cubic feet</p>
        <p>Number of 10 Yard Bins = Volume (cubic feet) / 270</p>
        <p>14 Yard Bin = 14 × 27 = 378 cubic feet</p>
        <p>Number of 14 Yard Bins = Volume (cubic feet) / 378</p>
      </div>
      <h3 class="text-xl font-semibold mb-2 text-gray-600">Reinforcement Details</h3>
      <table class="table-auto w-full mb-4">
        <tbody>
          <tr>
            <td class="border px-4 py-2">Reinforcement Type</td>
            <td class="border px-4 py-2">${reinforcementType}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Wire Mesh Count</td>
            <td class="border px-4 py-2">${meshCount}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Rod Count</td>
            <td class="border px-4 py-2">${rodCount}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Reinforcement Cost</td>
            <td class="border px-4 py-2">$${reinforcementType === 'mesh' ? meshCount * 6 : rodCount * 3}</td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 mb-4 rounded-lg bg-gray-100">
        <h4 class="text-lg font-semibold mb-2">Formulas:</h4>
        <p>Wire Mesh Coverage = 32 sq ft per piece</p>
        <p>Required Wire Mesh = Total Area (sq ft) / 32</p>
        <p>Rods Coverage = 1 rod per 10 sq ft</p>
        <p>Required Rods = Total Area (sq ft) / 10</p>
      </div>
      <h3 class="text-xl font-semibold mb-2 text-gray-600">Labor Details</h3>
      <table class="table-auto w-full mb-4">
        <tbody>
          <tr>
            <td class="border px-4 py-2">General Labor Days</td>
            <td class="border px-4 py-2">${generalLaborDays}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">General Labor Workers</td>
            <td class="border px-4 py-2">${generalLaborWorkers}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">General Labor Cost</td>
            <td class="border px-4 py-2">$${totalGeneralLaborCost}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Supervisory Labor Days</td>
            <td class="border px-4 py-2">${supervisoryLaborDays}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Supervisory Labor Workers</td>
            <td class="border px-4 py-2">${supervisoryLaborWorkers}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Supervisory Labor Cost</td>
            <td class="border px-4 py-2">$${totalSupervisoryLaborCost}</td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 mb-4 rounded-lg bg-gray-100">
        <h4 class="text-lg font-semibold mb-2">Formulas:</h4>
        <p>Total General Labor Cost = General Labor Days × General Labor Workers × General Labor Cost</p>
        <p>Total Supervisory Labor Cost = Supervisory Labor Days × Supervisory Labor Workers × Supervisory Labor Cost</p>
      </div>
      <h3 class="text-xl font-semibold mb-2 text-gray-600">Gravel Details</h3>
      <table class="table-auto w-full mb-4">
        <tbody>
          <tr>
            <td class="border px-4 py-2">Gravel Type</td>
            <td class="border px-4 py-2">${gravelType}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Gravel Yards</td>
            <td class="border px-4 py-2">${gravelYards.toFixed(2)}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Gravel Cost</td>
            <td class="border px-4 py-2">$${gravelYards * gravelCost}</td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 mb-4 rounded-lg bg-gray-100">
        <h4 class="text-lg font-semibold mb-2">Formulas:</h4>
        <p>Gravel Volume (cubic yards) = Total Area (sq ft) × 0.00333</p>
        <p>Total Gravel Cost = Gravel Volume × Gravel Cost</p>
      </div>
      <h3 class="text-xl font-semibold mb-2 text-gray-600">Extra Costs</h3>
      <table class="table-auto w-full mb-4">
        <tbody>
          ${extraCosts.map(cost => `
            <tr>
              <td class="border px-4 py-2">${cost.name}</td>
              <td class="border px-4 py-2">$${cost.cost}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="p-4 mb-4 rounded-lg bg-gray-100">
        <h4 class="text-lg font-semibold mb-2">Formulas:</h4>
        <p>Total Extra Costs = Sum of all extra costs</p>
      </div>
      <h3 class="text-xl font-semibold mb-2 text-gray-600">Total Cost</h3>
      <table class="table-auto w-full mb-4">
        <tbody>
          <tr>
            <td class="border px-4 py-2">Total Cost</td>
            <td class="border px-4 py-2">$${totalCost.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 mb-4 rounded-lg bg-gray-100">
        <h4 class="text-lg font-semibold mb-2">Formulas:</h4>
        <p>Total Cost = Sum of all costs</p>
      </div>
    `;
      setDetails(details);
   };

   const addExtraCost = () => {
      setExtraCosts([...extraCosts, { id: Date.now(), name: '', cost: 0 }]);
   };

   const removeExtraCost = (id) => {
      setExtraCosts(extraCosts.filter((cost) => cost.id !== id));
   };

   const handleExtraCostChange = (id, type, value) => {
      const newExtraCosts = extraCosts.map((cost) => {
         if (cost.id === id) {
            return { ...cost, [type]: value };
         }
         return cost;
      });
      setExtraCosts(newExtraCosts);
   };

   return (
      <div className="container mx-auto p-6 bg-gray-100">
         <Card className="shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Concrete Cost Estimation</h2>
            <div className="space-y-8">
               <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-600">Project Area Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <Label htmlFor="area">Total Area (sq ft)</Label>
                        <TextInput id="area" type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Enter total area in sq ft" />
                     </div>
                     <div className="mt-4">
                        <Label htmlFor="slabThickness">Slab Thickness (inches)</Label>
                        <Select id="slabThickness" value={slabThickness} onChange={(e) => setSlabThickness(e.target.value)}>
                           <option value={4}>4 inches (default)</option>
                           <option value={5}>5 inches</option>
                        </Select>
                     </div>
                  </div>
               </div>

               <hr />

               <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-600">Concrete Details</h3>
                  <div>
                     <Label htmlFor="concreteLoad">Concrete Load (cubic meters)</Label>
                     <TextInput id="concreteLoad" type="number" value={concreteLoad.toFixed(2)} readOnly />
                  </div>
               </div>

               <hr />

               <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-600">Digging and Bin Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <Label htmlFor="digArea">Dig Area (sq ft)</Label>
                        <TextInput id="digArea" type="number" value={digArea} onChange={(e) => setDigArea(e.target.value)} placeholder="Enter dig area in sq ft" />
                     </div>
                     <div>
                        <Label htmlFor="depth">Depth for Bins (inches)</Label>
                        <TextInput id="depth" type="number" value={depth} onChange={(e) => setDepth(e.target.value)} placeholder="Enter depth in inches" />
                     </div>
                     <div>
                        <Label htmlFor="binType">Bin Type</Label>
                        <Select id="binType" value={binType} onChange={(e) => setBinType(e.target.value)}>
                           <option value="5-yard">5 Yard Bin - $400</option>
                           <option value="10-yard">10 Yard Bin - $450</option>
                           <option value="14-yard">14 Yard Bin - $550 (Brampton)</option>
                        </Select>
                     </div>
                     <div>
                        <Label htmlFor="binCount">Number of Bins</Label>
                        <TextInput id="binCount" type="number" value={calculateBins()} readOnly />
                     </div>
                     <div>
                        <Label htmlFor="binCost">Bin Cost ($)</Label>
                        <TextInput id="binCost" type="number" value={calculateBins() * (binType === '5-yard' ? 400 : binType === '10-yard' ? 450 : 550)} readOnly />
                     </div>
                  </div>
               </div>

               <hr />

               <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-600">Reinforcement Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <Label htmlFor="reinforcementType">Reinforcement Type</Label>
                        <Select id="reinforcementType" value={reinforcementType} onChange={(e) => setReinforcementType(e.target.value)}>
                           <option value="mesh">Wire Mesh</option>
                           <option value="rod">Rods</option>
                        </Select>
                     </div>
                     <div>
                        <Label htmlFor="meshCount">Wire Mesh Count</Label>
                        <TextInput id="meshCount" type="number" value={meshCount} readOnly />
                     </div>
                     <div>
                        <Label htmlFor="rodCount">Rod Count</Label>
                        <TextInput id="rodCount" type="number" value={rodCount} readOnly />
                     </div>
                  </div>
               </div>

               <hr />

               <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-600">Labor Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <Label>Number of General Labor Days</Label>
                        <TextInput type="number" value={generalLaborDays} onChange={(e) => setGeneralLaborDays(parseInt(e.target.value))} />
                     </div>
                     <div>
                        <Label>Number of General Labor Workers</Label>
                        <TextInput type="number" value={generalLaborWorkers} onChange={(e) => setGeneralLaborWorkers(parseInt(e.target.value))} />
                     </div>
                     <div>
                        <Label>General Labor Cost ($/day)</Label>
                        <TextInput type="number" value={generalLaborCost} onChange={(e) => setGeneralLaborCost(parseFloat(e.target.value))} />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                     <div>
                        <Label>Number of Supervisory Labor Days</Label>
                        <TextInput type="number" value={supervisoryLaborDays} onChange={(e) => setSupervisoryLaborDays(parseInt(e.target.value))} />
                     </div>
                     <div>
                        <Label>Number of Supervisory Labor Workers</Label>
                        <TextInput type="number" value={supervisoryLaborWorkers} onChange={(e) => setSupervisoryLaborWorkers(parseInt(e.target.value))} />
                     </div>
                     <div>
                        <Label>Supervisory Labor Cost ($/day)</Label>
                        <TextInput type="number" value={supervisoryLaborCost} onChange={(e) => setSupervisoryLaborCost(parseFloat(e.target.value))} />
                     </div>
                  </div>
               </div>

               <hr />

               <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-600">Gravel Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <Label htmlFor="gravelType">Gravel Type</Label>
                        <Select id="gravelType" value={gravelType} onChange={handleGravelTypeChange}>
                           <option value="clean">Clean Gravel - $55/yard (default)</option>
                           <option value="recycled">Recycled with Asphalt - $25/yard</option>
                           <option value="crushed">Recycled with Crushed Concrete - $30/yard</option>
                           <option value="below-pavers">Below Pavers (Gravel A) - $40/yard</option>
                        </Select>
                     </div>
                     <div>
                        <Label htmlFor="gravelYards">Gravel Yards</Label>
                        <TextInput id="gravelYards" type="number" value={gravelYards.toFixed(2)} readOnly />
                     </div>
                  </div>
               </div>

               <hr />

               <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-600">Extra Costs</h3>
                  {extraCosts.length > 0 && extraCosts.map((cost) => (
                     <div key={cost.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                           <Label>Extra Cost Name</Label>
                           <TextInput type="text" value={cost.name} onChange={(e) => handleExtraCostChange(cost.id, 'name', e.target.value)} />
                        </div>
                        <div>
                           <Label>Extra Cost ($)</Label>
                           <TextInput type="number" value={cost.cost} onChange={(e) => handleExtraCostChange(cost.id, 'cost', parseFloat(e.target.value))} />
                        </div>
                        <Button color="failure" onClick={() => removeExtraCost(cost.id)}><TrashIcon className="h-5 w-5" /></Button>
                     </div>
                  ))}
                  <Button onClick={addExtraCost}><PlusIcon className="h-5 w-5" /> Add Extra Cost</Button>
               </div>

               <hr />

               <div className="text-center">
                  <Button className="mt-6" onClick={calculateTotalCost}>Calculate Total Cost</Button>
                  <Alert className="mt-6" color="info">
                     <span className="font-bold">Total Cost: ${totalCost.toFixed(2)}</span>
                  </Alert>
                  <div dangerouslySetInnerHTML={{ __html: details }} className="mt-6" />
               </div>
            </div>
         </Card>
      </div>
   );
}
