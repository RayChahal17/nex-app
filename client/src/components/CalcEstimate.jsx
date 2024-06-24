import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Card, Select, Textarea } from 'flowbite-react';
import { FaSquare, FaCircle, FaRulerCombined, FaDrawPolygon, FaCalculator } from 'react-icons/fa';
import { IoTriangle } from "react-icons/io5";


function Section({ id, type, onAreaChange, onNameChange, initialData, index }) {
   const [values, setValues] = useState({
      length: initialData?.length || 0,
      width: initialData?.width || 0,
      radius: initialData?.radius || 0,
      base1: initialData?.base1 || 0,
      base2: initialData?.base2 || 0,
      height: initialData?.height || 0,
      area: initialData?.area || 0,
   });
   const [area, setArea] = useState(initialData?.area || 0);
   const [name, setName] = useState(initialData?.name || '');

   useEffect(() => {
      calculateArea();
   }, [values]);

   const handleInputChange = (e) => {
      setValues({ ...values, [e.target.name]: Number(e.target.value) });
   };

   const calculateArea = () => {
      let calculatedArea = 0;
      if (type === 'Box') {
         calculatedArea = values.length * values.width;
      } else if (type === 'Circle') {
         calculatedArea = Math.PI * values.radius * values.radius;
      } else if (type === 'Median') {
         calculatedArea = ((values.base1 + values.base2) / 2) * values.height;
      } else if (type === 'Triangle') {
         calculatedArea = (values.base * values.height) / 2;
      } else if (type === 'Calculated') {
         calculatedArea = values.area;
      }
      setArea(calculatedArea);
      onAreaChange(id, calculatedArea);
   };

   const handleNameChange = (e) => {
      setName(e.target.value);
      onNameChange(id, e.target.value);
   };

   return (
      <Card className="border-dotted border-2 border-gray-300 mb-4">
         <h2 className="text-xl font-bold mb-2">Section {index + 1}: {type}</h2>
         <TextInput
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={handleNameChange}
            className="mb-2"
         />
         {type === 'Box' && (
            <>
               <div className="mb-2">
                  <Label htmlFor={`length-${id}`} value="Length" />
                  <TextInput id={`length-${id}`} type="number" name="length" value={values.length} onChange={handleInputChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor={`width-${id}`} value="Width" />
                  <TextInput id={`width-${id}`} type="number" name="width" value={values.width} onChange={handleInputChange} />
               </div>
            </>
         )}
         {type === 'Circle' && (
            <div className="mb-2">
               <Label htmlFor={`radius-${id}`} value="Radius" />
               <TextInput id={`radius-${id}`} type="number" name="radius" value={values.radius} onChange={handleInputChange} />
            </div>
         )}
         {type === 'Median' && (
            <>
               <div className="mb-2">
                  <Label htmlFor={`base1-${id}`} value="Base 1" />
                  <TextInput id={`base1-${id}`} type="number" name="base1" value={values.base1} onChange={handleInputChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor={`base2-${id}`} value="Base 2" />
                  <TextInput id={`base2-${id}`} type="number" name="base2" value={values.base2} onChange={handleInputChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor={`height-${id}`} value="Height" />
                  <TextInput id={`height-${id}`} type="number" name="height" value={values.height} onChange={handleInputChange} />
               </div>
            </>
         )}
         {type === 'Triangle' && (
            <>
               <div className="mb-2">
                  <Label htmlFor={`base-${id}`} value="Base" />
                  <TextInput id={`base-${id}`} type="number" name="base" value={values.base} onChange={handleInputChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor={`height-${id}`} value="Height" />
                  <TextInput id={`height-${id}`} type="number" name="height" value={values.height} onChange={handleInputChange} />
               </div>
            </>
         )}
         {type === 'Calculated' && (
            <div className="mb-2">
               <Label htmlFor={`area-${id}`} value="Area (sq ft)" />
               <TextInput id={`area-${id}`} type="number" name="area" value={values.area} onChange={handleInputChange} />
            </div>
         )}
         <Button onClick={calculateArea}>Calculate Area</Button>
         {area > 0 && <p className="mt-2">Area: {area.toFixed(2)} sq ft</p>}
      </Card>
   );
}

export default function CalcEstimate({ setSubmittedData, initialData }) {
   const [sections, setSections] = useState(initialData?.sections || []);
   const [totalArea, setTotalArea] = useState(0);
   const [additionalCosts, setAdditionalCosts] = useState(initialData?.additionalCosts || {
      demolition: 0,
      bin: 0,
      labor: 0,
      ironMesh: 0,
      miscellaneous: 0,
   });
   const [stairs, setStairs] = useState(initialData?.stairs || { numberOfStairs: 0, costPerStair: 0, totalCost: 0 });
   const [costPerSqFeet, setCostPerSqFeet] = useState(initialData?.costPerSqFeet || 6);
   const [discount, setDiscount] = useState(initialData?.discount || 0);
   const [discountType, setDiscountType] = useState(initialData?.discountType || 'percentage');
   const [serviceType, setServiceType] = useState(initialData?.serviceType || 'Concrete');
   const [customerInfo, setCustomerInfo] = useState(initialData?.customerInfo || {
      name: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      note: '',
      customerId: Math.floor(1000000000 + Math.random() * 9000000000),
   });
   const [formData, setFormData] = useState({
      sections: initialData?.sections || [],
      additionalCosts: initialData?.additionalCosts || {},
      stairs: initialData?.stairs || { numberOfStairs: 0, costPerStair: 0, totalCost: 0 },
      costPerSqFeet: initialData?.costPerSqFeet || 6,
      discount: initialData?.discount || 0,
      discountType: initialData?.discountType || 'percentage',
      customerInfo: initialData?.customerInfo || {
         name: '',
         address: '',
         city: '',
         phone: '',
         email: '',
         note: '',
         customerId: Math.floor(1000000000 + Math.random() * 9000000000),
      },
      serviceType: initialData?.serviceType || 'Concrete',
   });

   useEffect(() => {
      const totalStairsCost = stairs.numberOfStairs * stairs.costPerStair;
      setStairs((prevState) => ({ ...prevState, totalCost: totalStairsCost }));
      setFormData((prevState) => ({
         ...prevState,
         stairs: { ...prevState.stairs, totalCost: totalStairsCost, numberOfStairs: stairs.numberOfStairs, costPerStair: stairs.costPerStair },
      }));
   }, [stairs.numberOfStairs, stairs.costPerStair]);

   const handleAddSection = (type) => {
      const id = sections.length;
      const newSection = { id, type, name: '', area: 0 };
      setSections([newSection, ...sections]);
      setFormData({ ...formData, sections: [newSection, ...formData.sections] });
   };

   const handleAreaChange = (id, area) => {
      const updatedSections = formData.sections.map((section) =>
         section.id === id ? { ...section, area } : section
      );
      setFormData({ ...formData, sections: updatedSections });
      setTotalArea(updatedSections.reduce((sum, section) => sum + section.area, 0));
   };

   const handleNameChange = (id, name) => {
      const updatedSections = formData.sections.map((section) =>
         section.id === id ? { ...section, name: name || `Section ${id}` } : section
      );
      setFormData({ ...formData, sections: updatedSections });
   };

   const handleCostChange = (e) => {
      setAdditionalCosts({ ...additionalCosts, [e.target.name]: Number(e.target.value) });
      setFormData({ ...formData, additionalCosts: { ...additionalCosts, [e.target.name]: Number(e.target.value) } });
   };

   const handleStairsChange = (e) => {
      const { name, value } = e.target;
      setStairs((prevState) => {
         const updatedStairs = {
            ...prevState,
            [name]: parseFloat(value),
         };
         return updatedStairs;
      });
   };

   const handleCostPerSqFeetChange = (e) => {
      setCostPerSqFeet(Number(e.target.value));
      setFormData({ ...formData, costPerSqFeet: Number(e.target.value) });
   };

   const handleDiscountChange = (e) => {
      setDiscount(Number(e.target.value));
      setFormData({ ...formData, discount: Number(e.target.value) });
   };

   const handleDiscountTypeChange = (e) => {
      setDiscountType(e.target.value);
      setFormData({ ...formData, discountType: e.target.value });
   };

   const handleCustomerInfoChange = (e) => {
      setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
      setFormData({ ...formData, customerInfo: { ...customerInfo, [e.target.name]: e.target.value } });
   };

   const handleServiceTypeChange = (e) => {
      setServiceType(e.target.value);
      setFormData({ ...formData, serviceType: e.target.value });
   };

   const calculateFinalEstimate = () => {
      const totalSqFeetCost = totalArea * costPerSqFeet;
      const additionalTotal = Object.values(additionalCosts).reduce((acc, cost) => acc + Number(cost), 0);
      const finalEstimate = totalSqFeetCost + additionalTotal + stairs.totalCost;
      let discountedEstimate = finalEstimate;

      if (discountType === 'percentage') {
         discountedEstimate = finalEstimate - (finalEstimate * (discount / 100));
      } else if (discountType === 'fixed') {
         discountedEstimate = finalEstimate - discount;
      }

      return { finalEstimate, discountedEstimate };
   };

   const handleRefresh = () => {
      setFormData({ ...formData, ...calculateFinalEstimate() });
   };

   const handleSubmit = () => {
      const finalData = { ...formData, ...calculateFinalEstimate() };
      setSubmittedData(finalData);
   };

   const { finalEstimate, discountedEstimate } = calculateFinalEstimate();

   return (
      <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Estimate Calculator</h1>
         <div className="flex gap-2 mb-4">
            <Button onClick={() => handleAddSection('Box')}><FaSquare className="mr-2 text-2xl" /> Add Box Section</Button>
            <Button onClick={() => handleAddSection('Circle')}><FaCircle className="mr-2 text-2xl" /> Add Circle Section</Button>
            <Button onClick={() => handleAddSection('Median')}><FaRulerCombined className="mr-2 text-2xl" /> Add Median Section</Button>
            <Button onClick={() => handleAddSection('Triangle')}><IoTriangle className="mr-2 text-2xl" /> Add Triangle Section</Button>
            <Button onClick={() => handleAddSection('Calculated')}><FaCalculator className="mr-2 text-2xl" /> Add Calculated Section</Button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
               <Section
                  key={section.id}
                  id={section.id}
                  type={section.type}
                  onAreaChange={handleAreaChange}
                  onNameChange={handleNameChange}
                  initialData={section}
                  index={index}
               />
            ))}
         </div>

         <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="mb-2">
                  <Label htmlFor="name" value="Name" />
                  <TextInput id="name" type="text" name="name" required value={customerInfo.name} onChange={handleCustomerInfoChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="address" value="Address" />
                  <TextInput id="address" type="text" name="address" required value={customerInfo.address} onChange={handleCustomerInfoChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="city" value="City" />
                  <TextInput id="city" type="text" name="city" value={customerInfo.city} onChange={handleCustomerInfoChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="phone" value="Phone" />
                  <TextInput id="phone" type="tel" name="phone" required value={customerInfo.phone} onChange={handleCustomerInfoChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="email" value="Email" />
                  <TextInput id="email" type="email" name="email" value={customerInfo.email} onChange={handleCustomerInfoChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="note" value="Note" />
                  <Textarea id="note" name="note" value={customerInfo.note} onChange={handleCustomerInfoChange} rows={4} />
               </div>
            </div>
         </div>

         <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Service Type</h2>
            <Select onChange={handleServiceTypeChange} value={serviceType}>
               <option value="Concrete">Concrete</option>
               <option value="Aggregate">Aggregate</option>
               <option value="Stamped Concrete">Stamped Concrete</option>
               <option value="Interlock">Interlock</option>
               <option value="Deck">Deck</option>
               <option value="Fence">Fence</option>
               <option value="Other">Other</option>
            </Select>
         </div>

         <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Cost Per Square Feet</h2>
            <Select onChange={handleCostPerSqFeetChange} value={costPerSqFeet}>
               {[...Array(89)].map((_, i) => (
                  <option key={i} value={6 + i * 0.5}>{`$${(6 + i * 0.5).toFixed(1)}`}</option>
               ))}
            </Select>
         </div>

         <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Discount</h2>
            <div className="flex gap-2 mb-2">
               <Select onChange={handleDiscountTypeChange} value={discountType}>
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
               </Select>
               <TextInput id="discount" type="number" name="discount" placeholder="Discount" value={discount} onChange={handleDiscountChange} />
            </div>
         </div>

         <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Additional Costs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="mb-2">
                  <Label htmlFor="demolition" value="Demolition Charges" />
                  <TextInput id="demolition" type="number" name="demolition" value={additionalCosts.demolition} onChange={handleCostChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="bin" value="Bin Charges" />
                  <TextInput id="bin" type="number" name="bin" value={additionalCosts.bin} onChange={handleCostChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="labor" value="Labor Charges" />
                  <TextInput id="labor" type="number" name="labor" value={additionalCosts.labor} onChange={handleCostChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="ironMesh" value="Iron Mesh and Reinforcements Charges" />
                  <TextInput id="ironMesh" type="number" name="ironMesh" value={additionalCosts.ironMesh} onChange={handleCostChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="miscellaneous" value="Miscellaneous Charges" />
                  <TextInput id="miscellaneous" type="number" name="miscellaneous" value={additionalCosts.miscellaneous} onChange={handleCostChange} />
               </div>
            </div>
         </div>

         <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Stairs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="mb-2">
                  <Label htmlFor="numberOfStairs" value="Number of Stairs" />
                  <TextInput id="numberOfStairs" type="number" name="numberOfStairs" value={stairs.numberOfStairs} onChange={handleStairsChange} />
               </div>
               <div className="mb-2">
                  <Label htmlFor="costPerStair" value="Cost Per Stair" />
                  <TextInput id="costPerStair" type="number" name="costPerStair" value={stairs.costPerStair} onChange={handleStairsChange} />
               </div>
            </div>
         </div>

         <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Total Estimate</h2>
            {discount > 0 ? (
               <div>
                  <p className="text-lg line-through">${finalEstimate.toFixed(2)}</p>
                  <p className="text-lg">${discountedEstimate.toFixed(2)}</p>
               </div>
            ) : (
               <p className="text-lg">${finalEstimate.toFixed(2)}</p>
            )}
         </div>

         <div className="mt-10">
            <Button outline gradientDuoTone="redToYellow" onClick={handleRefresh} className="mb-4 font-bold ">Refresh Summary</Button>
            <h2 className="text-4xl font-extrabold mb-2">Summary</h2>
            <div className="bg-gray-100 p-4 rounded">
               <h3 className="text-lg font-bold mb-2 underline">Customer Information</h3>
               <div className="grid grid-cols-2 gap-2">
                  <p><strong>Name:</strong> {formData.customerInfo.name}</p>
                  <p><strong>Address:</strong> {formData.customerInfo.address}</p>
                  <p><strong>City:</strong> {formData.customerInfo.city}</p>
                  <p><strong>Phone:</strong> {formData.customerInfo.phone}</p>
                  <p><strong>Email:</strong> {formData.customerInfo.email}</p>
                  <p><strong>Note:</strong> {formData.customerInfo.note}</p>
               </div><br></br>
               <h3 className="text-lg font-bold mb-2 underline">Sections</h3>
               <table className="min-w-full bg-white mb-8">
                  <thead>
                     <tr>
                        <th className="py-2 text-left">Name</th>
                        <th className="py-2 text-left">Type</th>
                        <th className="py-2 text-left">Area (sq ft)</th>
                     </tr>
                  </thead>
                  <tbody>
                     {formData.sections.map((section, index) => (
                        <tr key={index}>
                           <td className="py-2 border-t">{section.name || `Section ${index + 1}`}</td>
                           <td className="py-2 border-t">{section.type}</td>
                           <td className="py-2 border-t">{section.area.toFixed(2)}</td>
                        </tr>
                     ))}
                     <tr className='text-blue-600'>
                        <td className="py-2 border-t font-bold" colSpan="2">Total Area</td>
                        <td className="py-2 border-t font-bold">{totalArea.toFixed(2)} sq ft</td>
                     </tr>
                  </tbody>
               </table>
               <h3 className="text-lg font-bold mb-2 underline">Additional Costs</h3>
               <table className="min-w-full bg-white mb-8">
                  <thead>
                     <tr>
                        <th className="py-2 text-left">Description</th>
                        <th className="py-2 text-left">Amount</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className="py-2 border-t">Demolition Charges</td>
                        <td className="py-2 border-t">${formData.additionalCosts.demolition}</td>
                     </tr>
                     <tr>
                        <td className="py-2 border-t">Bin Charges</td>
                        <td className="py-2 border-t">${formData.additionalCosts.bin}</td>
                     </tr>
                     <tr>
                        <td className="py-2 border-t">Labor Charges</td>
                        <td className="py-2 border-t">${formData.additionalCosts.labor}</td>
                     </tr>
                     <tr>
                        <td className="py-2 border-t">Iron Mesh and Reinforcements Charges</td>
                        <td className="py-2 border-t">${formData.additionalCosts.ironMesh}</td>
                     </tr>
                     <tr>
                        <td className="py-2 border-t">Miscellaneous Charges</td>
                        <td className="py-2 border-t">${formData.additionalCosts.miscellaneous}</td>
                     </tr>
                  </tbody>
               </table>
               <h3 className="text-lg font-bold mb-2 underline">Stairs</h3>
               <p><strong>Number of Stairs:</strong> {formData.stairs.numberOfStairs}</p>
               <p><strong>Cost Per Stair:</strong> ${formData.stairs.costPerStair.toFixed(2)}</p>
               <p><strong>Total Cost of Stairs:</strong> ${formData.stairs.totalCost.toFixed(2)}</p><br></br>
               <h3 className="text-lg font-bold mb-2 underline">Cost Per Square Feet</h3>
               <p ><strong>Cost Per Sq Ft:</strong> ${formData.costPerSqFeet}</p><br></br>
               {discount > 0 && (
                  <>
                     <h3 className="text-lg font-bold mb-2 underline">Discount</h3>
                     <p><strong>Discount Type:</strong> {formData.discountType}</p>
                     <p><strong>Discount:</strong> {formData.discountType === 'percentage' ? `${formData.discount}%` : `$${formData.discount}`}</p>
                     <h3 className="text-lg font-bold mb-2 underline">Final Estimate</h3>
                     <p className="text-lg line-through">${finalEstimate.toFixed(2)}</p>
                     <p className="text-lg">${discountedEstimate.toFixed(2)}</p>
                  </>
               )}
               <h3 className="text-lg font-bold mb-2 underline text-green-600">Total Estimate without HST:</h3>
               <p className="text-green-600">${discountedEstimate.toFixed(2)}</p><br></br>
               <h3 className="text-lg font-bold mb-2 underline text-blue-600">Total Estimate with HST (13%):</h3>
               <p className="text-blue-600">${(discountedEstimate + discountedEstimate * 0.13).toFixed(2)}</p>
            </div>
         </div>

         <Button gradientDuoTone="tealToLime" className="mt-4" onClick={handleSubmit}>Submit Estimate</Button>
      </div>
   );
}
