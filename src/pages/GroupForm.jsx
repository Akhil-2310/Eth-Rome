import React, { useState } from "react";
import { ApiSdk } from "@bandada/api-sdk";

const apiSdk = new ApiSdk();

const GroupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    minBalance: "",
    network: "Sepolia", // Default network, can be changed if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = "70f07d0d-6aa2-4fe1-b4b9-06c271a641dc";

    try {
    //   const bandadaSDK = new BandadaApiSDK(apiKey);

      const credentials = {
        id: "BLOCKCHAIN_BALANCE",
        criteria: {
          minBalance: formData.minBalance,
          network: formData.network,
        },
      };

      const groupCreateDetails = {
        name: formData.name,
        description: formData.description,
        treeDepth: 16,
        fingerprintDuration: 3600,
        credentials: [credentials],
      };

      const apiKey = "0925b7bc-ef61-436d-a587-57328b19b814";

      const group = await apiSdk.createGroup(groupCreateDetails, apiKey);

      console.log("Group created successfully:", group);
      // Handle successful group creation (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error("Error creating group:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Ether Balance Group
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Group Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter group name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Group Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter group description"
              rows={3}
              required
            />
          </div>
          <div>
            <label
              htmlFor="minBalance"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Minimum Ether Balance
            </label>
            <input
              type="text"
              id="minBalance"
              name="minBalance"
              value={formData.minBalance}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter minimum Ether balance required"
              required
            />
          </div>
          <div>
            <label
              htmlFor="network"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Network
            </label>
            <select
              id="network"
              name="network"
              value={formData.network}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Sepolia">Sepolia</option>
              <option value="Ethereum">Ethereum</option>
              {/* Add other networks as needed */}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Create Ether Balance Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
