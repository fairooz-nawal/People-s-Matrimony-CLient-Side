import React from 'react';
import { Label, Select, TextInput, Button } from 'flowbite-react';

const divisions = ['Dhaka', 'Chattagra', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'];

const Filter = ({ filters, onChange, onClear }) => {
  // Handle input changes and pass back to parent
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Age From */}
        <div>
          <Label  className="mb-1">
            Age From
          </Label>
          <TextInput
            id="ageFrom"
            name="ageFrom"
            type="number"
            min={18}
            // value={filters.ageFrom}
            onChange={handleChange}
            placeholder="18"
          />
        </div>

        {/* Age To */}
        <div>
          <Label  className="mb-1">
            Age To
          </Label>
          <TextInput
            id="ageTo"
            name="ageTo"
            type="number"
            min={18}
            // value={filters.ageTo}
            onChange={handleChange}
            placeholder="60"
          />
        </div>

        {/* Biodata Type */}
        <div>
          <Label  className="mb-1">
            Biodata Type
          </Label>
          <Select
            id="biodataType"
            name="biodataType"
            // value={filters.biodataType}
            onChange={handleChange}
            required={false}
          >
            <option value="">Select Type</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </div>

        {/* Division */}
        <div>
          <Label  className="mb-1">
            Division
          </Label>
          <Select
            id="division"
            name="division"
            // value={filters.division}
            onChange={handleChange}
            required={false}
          >
            <option value="">Select Division</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-4 flex justify-end">
        <Button color="gray" onClick={() => onClear()}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default Filter;
