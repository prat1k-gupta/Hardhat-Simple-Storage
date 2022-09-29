
const {ethers} = require("hardhat")
const {expect,assert} = require("chai")
describe("SimpleStorage",function (){
    let SimpleStorageFactory; 
    let simpleStorage; 
    beforeEach(async ()=>{
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage"); 
        simpleStorage = await SimpleStorageFactory.deploy(); 
        
    })

    it("Should start with a favorite number of 0",async function(){
        const currentValue = await simpleStorage.retrieve(); 
        const expectedValue = "0"; 
        //from chai we will import 
        //assert
        //expect 
        assert.equal(currentValue.toString(),expectedValue); 
    })

    it("Should update when we call store",async function(){
        const expectedValue = "7"; 
        const transactionResponse = await simpleStorage.store(expectedValue); 
        await transactionResponse.wait(1); 
        const currentValue = await simpleStorage.retrieve(); 
        assert.equal(currentValue.toString(),expectedValue); 
        //expect method
        // expect(currentValue.toString()).to.equal(expectedValue); 
    })

    it("Should return favorite number of the person",async function(){
        const name = "pratik"
        const number  = "6"
        const addPersonResponse = await simpleStorage.addPerson(name,number);
        await addPersonResponse.wait(1); 
        const currentNumber = await simpleStorage.nameToFavoriteNumber(name); 
        const expectedValue = "6"; 
        assert(currentNumber.toString(),expectedValue); 
    })

    //NOTE: 
    //We can run single test with two methods
    //terminal method where we can use 
    //yarn hardhat test --grep any test keyword like "store" in second test 
    //code method
    //we can write only keyword after it
    //it.only("Should start")
})