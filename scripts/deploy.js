//imports
const {ethers,run,network} = require("hardhat")
//api key etherscan PTX6EPAXZR4R9Y2ZMM1FEFZEAJW287JSB2
//async main 

async function main(){
  const simpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
  )
  console.log("Deploying contract...")
  const simpleStorage = await simpleStorageFactory.deploy(); 
  await simpleStorage.deployed(); 

  //what's the private key
  //what's the rpc url 
  console.log(`Deployed contract to ${simpleStorage.address}`)
  if(network.config.chainId=== 5 && process.env.ETHERSCAN_API_KEY){
    await simpleStorage.deployTransaction.wait(6); 
    await verify(simpleStorage.address,[])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`current value ${currentValue}`)

  //update the currentValue 
  const transactionResponse = await simpleStorage.store(7); 
  await transactionResponse.wait(1); 
  const updatedValue = await simpleStorage.retrieve(); 
  console.log(`updated value ${updatedValue}`)

  //add person 
  const name = "pratik"
  const addPersonResponse = await simpleStorage.addPerson(name,1); 
  await addPersonResponse.wait(1);
  const favNumber = await simpleStorage.nameToFavoriteNumber(name);
  console.log(`favorite number of ${name} is ${favNumber}`)
}

async function verify(contractAddress,args){
  console.log("verifying contract...")
  try{
    await run("verify:verify",{
      address: contractAddress,
      constructorArguments: args,
    })
  }catch(err){
    if(err.message.toLowerCase().includes("already verified")){
      console.log("already verified")
    }else{
      console.log(err); 
    }
  }
}

//call main 

main()
.then(()=> process.exit(0))
.catch((error)=>{
  console.log(error);
  process.exit(1); 
})