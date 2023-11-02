import { ethers } from "hardhat";
import { build } from "./deploy-cannon";
import synthetixDeployment from "../deployments/synthetix/CoreProxy.json";

// To run:
// cannon build ./scripts/synthetix-sandbox.toml --write-script ./scripts/cannon-deploy.ts
// cannon inspect synthetix-sandbox --write-deployments ./deployments
// npx hardhat node
// npx hardhat run --network localhost scripts/deploy.ts

async function main() {
  const [signer] = await ethers.getSigners();

  build(signer);

  const { address, abi } = synthetixDeployment;

  const coreProxy = new ethers.Contract(address, abi, signer);

  await coreProxy.createAccount();

  console.log("Successfully create account!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
