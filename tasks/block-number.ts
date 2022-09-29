import  {task} from "hardhat/config"


//first in task function we name the task and int the second arguments we add the description 
//then we use setAction to set an action to perform by this task 
export default task("block-number","Prints the current block number").setAction(
    async (tasksArgs,hre) =>{
        const blockNumber = await hre.ethers.provider.getBlockNumber();  
        console.log(blockNumber); 
    }
)
