import React from 'react'
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, sepolia } from "@reown/appkit/networks";
import { Link } from "react-router-dom";

// 1. Get projectId
const projectId = "969d6a38b82609c4f049137bab741923";

// 2. Set the networks
const networks = [sepolia, mainnet];


// 3. Create a metadata object - optional
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">CreSoc</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/create">Ceate Groups</Link>
            </li>
            <li>
              <w3m-button />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar
