import React, { useEffect, useState } from "react";
import { ApiSdk } from "@bandada/api-sdk";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router
import { ethers } from "ethers";
import { supabase } from "./supabaseClient";

const apiSdk = new ApiSdk();

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  const adminId =
    "0x078ca966cb82a1b9efa8c6e8a3c5129cbbb2b768c9ae96d43805651675cccf32"; // Admin ID

  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Fetch groups by adminId when component mounts
    const fetchGroups = async () => {
      try {
        const fetchedGroups = await apiSdk.getGroupsByAdminId(adminId);
        setGroups(fetchedGroups); // Set the groups data in state
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false); // Loading is complete
      }
    };

    fetchGroups();
  }, [adminId]);

    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserAddress(accounts[0]); // Store user's wallet address
      } else {
        console.error("Ethereum provider not found");
      }
    };

 const handleJoinGroup = async (groupId) => {
   try {
     const { data: groupData, error } = await supabase
       .from("groups")
       .select("*")
       .eq("id", groupId)
       .single(); // Get group details from Supabase

     if (error) {
       console.error("Error fetching group data:", error);
       return;
     }

     const { min_balance, network } = groupData; // Extract required balance and network

     // Get user's balance on the required network
     const provider = new ethers.providers.JsonRpcProvider(
       network === "Sepolia"
         ? "https://rpc.sepolia.org"
         : "https://mainnet.infura.io/v3/YOUR_INFURA_KEY"
     );
     const userBalance = await provider.getBalance(userAddress);
     const formattedBalance = ethers.utils.formatEther(userBalance);

     if (parseFloat(formattedBalance) < parseFloat(min_balance)) {
       console.error("Insufficient balance to join the group");
       return;
     }

     const credentials = {
       id: "BLOCKCHAIN_BALANCE",
       criteria: {
         minBalance: min_balance,
         network,
       },
     };

     // Use Bandada to generate a Merkle proof
     const proof = await apiSdk.generateMerkleProof({
       credentialId: credentials.id,
       criteria: credentials.criteria,
       address: userAddress,
     });

     // Store the proof or mark the user as a member in Supabase
     const { error: supabaseError } = await supabase
       .from("group_members")
       .insert({
         group_id: groupId,
         user_address: userAddress,
         proof, // Store the proof for future validation
       });

     if (supabaseError) {
       console.error(
         "Error storing membership data in Supabase:",
         supabaseError
       );
     } else {
       console.log("User joined the group successfully!");
     }
   } catch (error) {
     console.error("Error during group join process:", error);
   }
 };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 my-6">All Groups</h1>


      {loading ? (
        <p className="text-gray-500">Loading groups...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {groups.length === 0 ? (
            <p className="text-gray-500">No groups found.</p>
          ) : (
            groups.map((group) => (
              <div
                key={group.id}
                className="bg-white shadow-md rounded-lg p-4 max-w-sm w-full"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {group.name}
                </h2>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>
                    <strong>Network: Sepolia</strong>
                  </p>
                  <p>
                    <strong>Min Balance:</strong> 0.1 ETH
                  </p>
                </div>
                <button
                  onClick={() => handleJoinGroup(group.id)}
                  className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Join Group
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllGroups;
