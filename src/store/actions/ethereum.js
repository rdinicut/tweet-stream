export const ETH_CONNECT_TO_CONTRACTS = "ETH_CONNECT_TO_CONTRACTS";
export const ETH_CONTRACTS_CONNECTION_SUCCESSFUL = "ETH_CONTRACTS_CONNECTION_SUCCESSFUL";
export const ETH_CONTRACTS_CONNECTION_FAILED = "ETH_CONTRACTS_CONNECTION_FAILED";

export const connectToContracts = (networkId) => {
  return {
    type: ETH_CONNECT_TO_CONTRACTS,
    networkId
  }
};

export const connectionToContractsSuccesful = () => {
  return {
    type: ETH_CONTRACTS_CONNECTION_SUCCESSFUL
  }
};

export const connectionToContractsFailed = (error) => {
  console.log(error)
  return {
    type: ETH_CONTRACTS_CONNECTION_FAILED,
    error
  }
};
