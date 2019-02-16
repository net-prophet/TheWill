var VotingOrganization = artifacts.require("./VotingOrganization.sol");
var Token = artifacts.require("./audball.sol"); 
const shellExec = require('shell-exec');

contract('VotingOrganization', function(accounts) {

  const owner = accounts[0]
  const alice = accounts[1]
  const bob = accounts[2]
  const charlie = accounts[3]
  const dave = accounts[4]
  const helen = accounts[5]
  const susan = accounts[6] 
  const tom = accounts[7]
  const vera = accounts[8]
  const willy = accounts[9]

  // Create proposal test
  it("...should let a user create a proposal", async() => {
    const VotingOrganizationInstance = await VotingOrganization.deployed()

    const title = "Proposal1"
    const description = "This is proposal 1"
    const startBlock = await web3.eth.getBlockNumber()
    const endBlock = startBlock + 10

    // Create a proposal
    const tx = await VotingOrganizationInstance.createProposal(title, description, endBlock)

    // Emit an open event and capture proposalId
    if (tx.logs[0].event == "Open") {
        proposalId = tx.logs[0].args.proposalId.toString(10)
        eventEmitted = true
      }

    // Get proposal count and fetch proposal
    const proposalCount = await VotingOrganizationInstance.getProposalCount.call()
    const result = await VotingOrganizationInstance.fetchProposal.call(proposalId)

    // Make sure all the properties are what we expected
    assert.equal(result[0], proposalId, 'the proposalId does not match the expected value')
    assert.equal(result[1], title, 'the title does not match the expected value')
    assert.equal(result[2], description, 'the desription does not match the expected value')
    assert.equal(result[3], endBlock, 'the endBlock does not match the expected value')
    assert.equal(result[4], owner, 'the owner is the creator of the proposal')
    assert.equal(result[5].toString(10), 0, 'the state of the proposal should be "Open"')

    // Sanity check on count, ID, and that the event was emitted
    assert.equal(proposalCount, 1, 'proposal count should be 1')
    assert.equal(proposalId, 0, 'proposal Id should be 0')
    assert.equal(eventEmitted, true, 'creating a proposal should emit an Open event')
  })

  // Vote test
  it("...should let a user vote for, against, or abstain for an open proposal", async() => {
    const VotingOrganizationInstance = await VotingOrganization.deployed()

    const title = "Proposal1"
    const description = "This is proposal 1"
    const startBlock = await web3.eth.getBlockNumber()
    const endBlock = startBlock + 10

    // Create a proposal and capture proposalId
    const tx = await VotingOrganizationInstance.createProposal(title, description, endBlock)
    const proposalId = tx.logs[0].args.proposalId.toString(10)

    // Alice can't vote FIVE!!! 
    let failedTx = false;
        try {
            await VotingOrganizationInstance.vote(proposalId, 5, {from: alice})
        } catch (e) {
            failedTx = true;
        }
        assert.equal(failedTx, true);
    
    // But alice can vote 1 !!
    await VotingOrganizationInstance.vote(proposalId, 1, {from: alice})
    // Check numVoters = 1
    result = await VotingOrganizationInstance.fetchProposal.call(proposalId)
    assert.equal(result[6], 1, "The number of voters is 1")
    
    // Alice can change her vote
    await VotingOrganizationInstance.vote(proposalId, 2, {from: alice})
    // Check numVoters is still 1
    result = await VotingOrganizationInstance.fetchProposal.call(proposalId)
    assert.equal(result[6], 1, "The number of voters is 1")

    // Bob can vote 2 
    await VotingOrganizationInstance.vote(proposalId, 2, {from: bob})
    // Check numVoters = 2
    result = await VotingOrganizationInstance.fetchProposal.call(proposalId)
    assert.equal(result[6], 2, "The number of voters is 2")

    // Charlie can vote 3
    await VotingOrganizationInstance.vote(proposalId, 3, {from: charlie})
    // Check numVoters = 3
    result = await VotingOrganizationInstance.fetchProposal.call(proposalId)
    assert.equal(result[6], 3, "The number of voters is 3")

  })

  // Vote count test
  it("...should let a user view the votes and tokens for a proposal", async() => {
    const VotingOrganizationInstance = await VotingOrganization.deployed()
    const tokenInstance = await Token.deployed()

    const title = "Proposal1"
    const description = "This is proposal 1"
    const startBlock = await web3.eth.getBlockNumber()
    const endBlock = startBlock + 10

    // Create a proposal and capture proposalId
    const tx = await VotingOrganizationInstance.createProposal(title, description, endBlock)
    const proposalId = tx.logs[0].args.proposalId.toString(10)

    // Set the target coin and transfer coins to accounts
    await VotingOrganizationInstance.setTargetCoin(tokenInstance.address)
    await tokenInstance.transfer(alice, 10)
    await tokenInstance.transfer(bob, 11)
    await tokenInstance.transfer(charlie, 12)

    // Three accounts cast their votes
    await VotingOrganizationInstance.vote(proposalId, 1, {from: alice})
    await VotingOrganizationInstance.vote(proposalId, 2, {from: bob})
    await VotingOrganizationInstance.vote(proposalId, 3, {from: charlie})

    const results = await VotingOrganizationInstance.getVoteCount.call(proposalId)
    assert.equal(results[0], 1, "Number of votes for is 1")
    assert.equal(results[1], 10, "Number of tokens for is 10")
    assert.equal(results[2], 1, "Number of votes against is 1")
    assert.equal(results[3], 11, "Number of tokens againt is 11")
    assert.equal(results[4], 1, "Number of votes abstain is 1")
    assert.equal(results[5], 12, "Number of tokens abstain is 12")

  })

  it("...should let a user view the number of proposals for a voting organization", async() => {
    const VotingOrganizationInstance = await VotingOrganization.deployed()

    const oldCount = await VotingOrganizationInstance.getProposalCount.call()

    const title1 = "Proposal1"
    const description1 = "This is proposal 1"
    const startBlock1 = await web3.eth.getBlockNumber()
    const endBlock1 = startBlock1 + 10

    // Create a proposal1 and capture proposalId1
    const tx1 = await VotingOrganizationInstance.createProposal(title1, description1, endBlock1)
    const proposalId1 = tx1.logs[0].args.proposalId.toString(10)

    const title2 = "Proposal2"
    const description2 = "This is proposal 2"
    const startBlock2 = await web3.eth.getBlockNumber()
    const endBlock2 = startBlock2 + 10

    // Create a proposal2 and capture proposalId2
    const tx2 = await VotingOrganizationInstance.createProposal(title2, description2, endBlock2)
    const proposalId2 = tx2.logs[0].args.proposalId.toString(10)

    const title3 = "Proposal3"
    const description3 = "This is proposal 3"
    const startBlock3 = await web3.eth.getBlockNumber()
    const endBlock3 = startBlock3 + 10

    // Create a proposal3 and capture proposalId3
    const tx3 = await VotingOrganizationInstance.createProposal(title3, description3, endBlock3)
    const proposalId3 = tx3.logs[0].args.proposalId.toString(10)

    // Get the count of all proposals
    newCount = await VotingOrganizationInstance.getProposalCount.call()
    // Proposal count is correct
    assert.equal(newCount, oldCount.toNumber() + 3)
  })

  it("...should let a board member add another board member", async() => {
    const VotingOrganizationInstance = await VotingOrganization.deployed()

    // Alice is not a board member
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(alice), false)
    // Add Alice as a board member
    await VotingOrganizationInstance.addBoardMember(alice)
    // Check that Alice is a board member now
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(alice), true)

    // Bob is not a board member
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(bob), false)

    // Bob cannot add Charlie as a board member because he is not a board member
    let failedAdd = false;
        try {
            await VotingOrganizationInstance.addBoardMember(charlie, {from: bob})
        } catch (e) {
            failedAdd = true;
        }
        assert.equal(failedAdd, true);

    // Alice can add Charlie as a board member because she is a board member
    await VotingOrganizationInstance.addBoardMember(charlie, {from: alice})
    // Check that Charlie is a board member now
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(charlie), true)

  })

  it("...should let a board member remove another board member", async() => {
    const VotingOrganizationInstance = await VotingOrganization.deployed()

    // Dave is not a board member
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(dave), false)
    // Add Dave as a board member
    await VotingOrganizationInstance.addBoardMember(dave)
    // Check that Dave is a board member now
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(dave), true)

    // Helen is not a board member
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(helen), false)
    // Dave adds Helen as a board member
    await VotingOrganizationInstance.addBoardMember(helen, {from:dave})
    // Helen is a board member now
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(helen), true)
    // Helen can remove Dave because she is a board member
    await VotingOrganizationInstance.removeBoardMember(dave, {from:helen})
    // Dave is no longer a board member
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(dave), false)

  })

  it("...shouldn't let anyone vote for a closed proposal", async() => {
    const VotingOrganizationInstance = await VotingOrganization.deployed()

    const title = "Proposal1"
    const description = "This is proposal 1"
    const startBlock = await web3.eth.getBlockNumber()
    const endBlock = startBlock + 3

    // Create a proposal and capture proposalId
    const tx = await VotingOrganizationInstance.createProposal(title, description, endBlock)
    const proposalId = tx.logs[0].args.proposalId.toString(10)

    // Make sure it is not past the end block and Alice votes
    assert.equal(await VotingOrganizationInstance.isPastEndBlock.call(proposalId), false)
    await VotingOrganizationInstance.vote(proposalId, 1, {from: alice})

    assert.equal(await VotingOrganizationInstance.isPastEndBlock.call(proposalId), true)

    // It is now past the end block so Bob is unable to vote
    let failedVote = false;
        try {
            await VotingOrganizationInstance.vote(proposalId, 2, {from: bob})
        } catch (e) {
            failedVote = true;
        }
        assert.equal(failedVote, true);
    
  })

  it("...should let a board member submit results of a vote", async() => {
    const VotingOrganizationInstance = await VotingOrganization.deployed()
    const tokenInstance = await Token.deployed()

    const title = "Proposal1"
    const description = "This is proposal 1"
    const startBlock = await web3.eth.getBlockNumber()
    const endBlock = startBlock + 10

    // BLOCK N + 1
    // Create a proposal and capture proposalId
    const tx = await VotingOrganizationInstance.createProposal(title, description, endBlock)
    const proposalId = tx.logs[0].args.proposalId.toString(10)

    // BLOCK N + 2
    // Add Susan as a board member
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(susan), false)
    await VotingOrganizationInstance.addBoardMember(susan)
    assert.equal(await VotingOrganizationInstance.isBoardMember.call(susan), true)

    // BLOCK N + 3
    // Set target coin
    await VotingOrganizationInstance.setTargetCoin(tokenInstance.address)

    // BLOCK N + 4..9
    // Transfer tokens to accounts and all accounts vote
    await tokenInstance.transfer(dave, 12)
    await tokenInstance.transfer(helen, 11)
    await tokenInstance.transfer(susan, 10)
    await VotingOrganizationInstance.vote(proposalId, 1, {from: dave})
    await VotingOrganizationInstance.vote(proposalId, 2, {from: helen})
    await VotingOrganizationInstance.vote(proposalId, 3, {from: susan})

    // VOTING ENDS AT BLOCK 10
    assert.equal(await VotingOrganizationInstance.isPastEndBlock.call(proposalId), true)

    // Block 11: Voting is closed and Dave transfers all of his tokens to Helen
    await tokenInstance.transfer(helen, 12, {from: dave})

    // There is no web3js API to call a function *AT A PRIOR BLOCK HEIGHT*
    // But there is in web3py, so we must execute using python
    let output = await shellExec(`python3 final_vote_count.py ${VotingOrganizationInstance.address} ${proposalId}`)
    // Votes are equal to amounts at the endBlock
    assert.equal(output.stdout, "[1, 12, 1, 11, 1, 10]\n")

    await VotingOrganizationInstance.submitResults(proposalId, 1, 12, 1, 11, 1, 10, 1)

  

  })

  it("...should let a delegate vote in place of a user", async() => {
    const VotingOrganizationInstance = await VotingOrganization.deployed()
    const tokenInstance = await Token.deployed()

    const title = "Proposal1"
    const description = "This is proposal 1"
    const startBlock = await web3.eth.getBlockNumber()
    const endBlock = startBlock + 20

    // Create a proposal and capture proposalId
    const tx = await VotingOrganizationInstance.createProposal(title, description, endBlock)
    const proposalId = tx.logs[0].args.proposalId.toString(10)
    
    // Set willy as a delegate for tom and vera
    await VotingOrganizationInstance.setDelegate(willy, {from: tom})
    await VotingOrganizationInstance.setDelegate(willy, {from: vera})

    // Set target coin and transfer tokens
    await VotingOrganizationInstance.setTargetCoin(tokenInstance.address)
    await tokenInstance.transfer(tom, 12)
    await tokenInstance.transfer(vera, 11)
    await tokenInstance.transfer(willy, 10)

    // Willy votes for, vera votes against
    await VotingOrganizationInstance.vote(proposalId, 1, {from: willy})
    await VotingOrganizationInstance.vote(proposalId, 2, {from: vera})

    const results = await VotingOrganizationInstance.getVoteCount.call(proposalId)
    // Tom doesn't vote, so his vote and token get added with his delegate, willy.
    assert.equal(results[0], 2, "There are 2 votes for")
    assert.equal(results[1], 22, "There are 22 tokens for")
    assert.equal(results[2], 1, "There is 1 vote against")
    assert.equal(results[3], 11, "There are 11 tokens against")
    assert.equal(results[4], 0, "There are 0 votes abstain")
    assert.equal(results[5], 0, "There are 0 tokens abstain")

  })



})