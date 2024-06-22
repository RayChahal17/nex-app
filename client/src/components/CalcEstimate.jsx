import React, { useState } from 'react';
import { Button, Label, TextInput, Card, Select } from 'flowbite-react';

function Section({ id, type, onAreaChange, onNameChange }) {
  const [values, setValues] = useState({ length: 0, width: 0, radius: 0, base1: 0, base2: 0, height: 0, area: 0 });
  const [area, setArea] = useState(0);
  const [name, setName] = useState('');

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
    <Card>
      <h2 className="text-xl font-bold mb-2">{type} Section</h2>
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

export default function CalcEstimate({ setSubmittedData }) {
  const [sections, setSections] = useState([]);
  const [totalArea, setTotalArea] = useState(0);
  const [additionalCosts, setAdditionalCosts] = useState({
    demolition: 0,
    bin: 0,
    labor: 0,
    ironMesh: 0,
    miscellaneous: 0,
  });
  const [costPerSqFeet, setCostPerSqFeet] = useState(6);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('percentage');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
  });
  const [formData, setFormData] = useState({
    sections: [],
    additionalCosts: {},
    costPerSqFeet: 6,
    discount: 0,
    discountType: 'percentage',
    customerInfo: {
      name: '',
      address: '',
      city: '',
      phone: '',
      email: '',
    },
  });

  const handleAddSection = (type) => {
    const id = sections.length;
    setSections([...sections, { id, type }]);
    setFormData({ ...formData, sections: [...formData.sections, { id, type, name: '', area: 0 }] });
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

  const calculateFinalEstimate = () => {
    const totalSqFeetCost = totalArea * costPerSqFeet;
    const additionalTotal = Object.values(additionalCosts).reduce((acc, cost) => acc + Number(cost), 0);
    const finalEstimate = totalSqFeetCost + additionalTotal;
    let discountedEstimate = finalEstimate;

    if (discountType === 'percentage') {
      discountedEstimate = finalEstimate - (finalEstimate * (discount / 100));
    } else if (discountType === 'fixed') {
      discountedEstimate = finalEstimate - discount;
    }

    return { finalEstimate, discountedEstimate };
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
        <Button onClick={() => handleAddSection('Box')}>Add Box Section</Button>
        <Button onClick={() => handleAddSection('Circle')}>Add Circle Section</Button>
        <Button onClick={() => handleAddSection('Median')}>Add Median Section</Button>
        <Button onClick={() => handleAddSection('Triangle')}>Add Triangle Section</Button>
        <Button onClick={() => handleAddSection('Calculated')}>Add Calculated Section</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            type={section.type}
            onAreaChange={handleAreaChange}
            onNameChange={handleNameChange}
          />
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <Label htmlFor="name" value="Name" />
            <TextInput id="name" type="text" name="name" required onChange={handleCustomerInfoChange} />
          </div>
          <div className="mb-2">
            <Label htmlFor="address" value="Address" />
            <TextInput id="address" type="text" name="address" required onChange={handleCustomerInfoChange} />
          </div>
          <div className="mb-2">
            <Label htmlFor="city" value="City" />
            <TextInput id="city" type="text" name="city" onChange={handleCustomerInfoChange} />
          </div>
          <div className="mb-2">
            <Label htmlFor="phone" value="Phone" />
            <TextInput id="phone" type="tel" name="phone" required onChange={handleCustomerInfoChange} />
          </div>
          <div className="mb-2">
            <Label htmlFor="email" value="Email" />
            <TextInput id="email" type="email" name="email" onChange={handleCustomerInfoChange} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Cost Per Square Feet</h2>
        <Select onChange={handleCostPerSqFeetChange} value={costPerSqFeet}>
          {[...Array(17)].map((_, i) => (
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
          <TextInput id="discount" type="number" name="discount" placeholder="Discount" onChange={handleDiscountChange} />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Additional Costs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <Label htmlFor="demolition" value="Demolition Charges" />
            <TextInput id="demolition" type="number" name="demolition" onChange={handleCostChange} />
          </div>
          <div className="mb-2">
            <Label htmlFor="bin" value="Bin Charges" />
            <TextInput id="bin" type="number" name="bin" onChange={handleCostChange} />
          </div>
          <div className="mb-2">
            <Label htmlFor="labor" value="Labor Charges" />
            <TextInput id="labor" type="number" name="labor" onChange={handleCostChange} />
          </div>
          <div className="mb-2">
            <Label htmlFor="ironMesh" value="Iron Mesh Charges" />
            <TextInput id="ironMesh" type="number" name="ironMesh" onChange={handleCostChange} />
          </div>
          <div className="mb-2">
            <Label htmlFor="miscellaneous" value="Miscellaneous Charges" />
            <TextInput id="miscellaneous" type="number" name="miscellaneous" onChange={handleCostChange} />
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

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Summary</h2>
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Customer Information</h3>
          <p><strong>Name:</strong> {formData.customerInfo.name}</p>
          <p><strong>Address:</strong> {formData.customerInfo.address}</p>
          <p><strong>City:</strong> {formData.customerInfo.city}</p>
          <p><strong>Phone:</strong> {formData.customerInfo.phone}</p>
          <p><strong>Email:</strong> {formData.customerInfo.email}</p>
          <h3 className="text-lg font-bold mb-2">Sections</h3>
          {formData.sections.map((section, index) => (
            <div key={index} className="mb-2">
              <p><strong>Name:</strong> {section.name || `Section ${index}`}</p>
              <p><strong>Type:</strong> {section.type}</p>
              <p><strong>Area:</strong> {section.area.toFixed(2)} sq ft</p>
            </div>
          ))}
          <h3 className="text-lg font-bold mb-2">Additional Costs</h3>
          <p><strong>Demolition Charges:</strong> ${formData.additionalCosts.demolition}</p>
          <p><strong>Bin Charges:</strong> ${formData.additionalCosts.bin}</p>
          <p><strong>Labor Charges:</strong> ${formData.additionalCosts.labor}</p>
          <p><strong>Iron Mesh Charges:</strong> ${formData.additionalCosts.ironMesh}</p>
          <p><strong>Miscellaneous Charges:</strong> ${formData.additionalCosts.miscellaneous}</p>
          <h3 className="text-lg font-bold mb-2">Cost Per Square Feet</h3>
          <p><strong>Cost Per Sq Ft:</strong> ${formData.costPerSqFeet}</p>
          {discount > 0 && (
            <>
              <h3 className="text-lg font-bold mb-2">Discount</h3>
              <p><strong>Discount Type:</strong> {formData.discountType}</p>
              <p><strong>Discount:</strong> {formData.discountType === 'percentage' ? `${formData.discount}%` : `$${formData.discount}`}</p>
              <h3 className="text-lg font-bold mb-2">Final Estimate</h3>
              <p className="text-lg line-through">${finalEstimate.toFixed(2)}</p>
              <p className="text-lg">${discountedEstimate.toFixed(2)}</p>
            </>
          )}
        </div>
      </div>

      <Button className="mt-4" onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
