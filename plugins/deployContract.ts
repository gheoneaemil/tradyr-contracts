import hre, { network } from 'hardhat'
import { ethers } from "ethers";
import { deploymentMessage } from "./deploymentMessage";
import { ContractParams } from '../common/dto/contracts/contractParams.dto';
import { TestLogger } from '../logs/test/printers/logs';
import DeploymentLogger from "../logs/deployment/printers/deployment";


export async function deployContract(contractParams: ContractParams): Promise<ethers.Contract> {
    const Contract: ethers.ContractFactory = await hre.ethers.getContractFactory(contractParams.name,contractParams.props);

    const contract: ethers.Contract = await Contract.deploy(...contractParams.constructor);
    await contract.deployed();
  
    if ( contractParams.logs ) {
      deploymentMessage(contractParams.name,contract.address);
    }

    TestLogger("Contract: " + contractParams.name + ", deployed at: " + contract.address);
    if ( network.name !== "hardhat" ) {
      DeploymentLogger('export ' + contractParams.name+ '=' + contract.address);
    }
    return contract;
  }