var VoteCoinFactory = artifacts.require("./VoteCoinFactory.sol")
var VoteCoin = artifacts.require("./VoteCoin.sol")

contract('VoteCoinFactory', function(accounts) {

    const owner = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]
    const charlie = accounts[3]
    const dave = accounts[4]
    const helen = accounts[5]
    const susan = accounts[6]
    
    // Let's test that a bounty can be created under normal conditions
    it("...should let a user create a Vote Coin.", async() => {
        const coinInstance = await VoteCoin.deployed();

        await coinInstance.mint(alice, 1)
        await coinInstance.mint(bob, 1)

        assert.equal(await coinInstance.balanceOf.call(alice), 1)
        assert.equal(await coinInstance.balanceOf.call(bob), 1)

        let failed = false;
        try {
            await coinInstance.transfer(bob, 1, {from: alice})
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        assert.equal(await coinInstance.balanceOf.call(alice), 1)
        assert.equal(await coinInstance.balanceOf.call(bob), 1)
        

    })


})