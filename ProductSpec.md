## Summary
Voting is one of the classic usecases of blockchain technology.
The immutability and cryptographic identities provide auditiablity
and certainty to participants, while maintaining a public ledger
of all historical votes, and a voting dApp is a common "hello world"
in learning how to write solidity. Despite this, dApp voting has yet
to permeate any mainstream communities because of classic blockchain
onboarding problems -- there's no simple voting dApp for small communities
that makes it easy to get started "just counting votes" for a group of
nontechnical users. On-chain governance is a roadblock because real world
organizations don't exist on-chain. We propose a straightforward and easy-to-use
dApp that any group, organization or government can implement straight away
to begin recording votes with blockchain, while still retaining their off-chain
governance structures. We introduce a voting mechanism that, using an external
token as a voting marker, can be used to implement either one-person-one-vote
structures or stake-weighted voting schemes, with support for a "liquid democracy"
delegation pattern.


**It's imperative to understand that our app is built around the "Verify, Don't Trust"
philosophy**, and explicitly eschews any on-chain governance mechanisms; nothing is
ever implemented automatically. At the end of each voting period, we don't even mark
a proposal as PASSED/FAILED until one of the Board Members returns after a proposal
closes and honestly reports the results (or, with a good reason, instead chooses
"FORCED" or "REJECTED" override). The tools are available for anyone to check the full
history of the vote and tally the final count, but trust in the board members to behave
honestly is implied. This is important for 2 main reasons. Firstly, on-chain governance
is largely incompatible with existing legal systems, because almost every organization
on Earth is accountable to some jurisdiction -- What if your smart contract votes in
favor of funding a nuclear program in a sanctioned country? Being a DAO doesn't suddenly
enable illegal activity or absolve the developer in a treason, terror or murder
investigation. Second, by refusing to address the topic of on-chain governance, we force
our application to be the purest version of what it is intended for, which is a historical
registry and trusted single source of truth, not a rigid robotic enforcer that must be
obeyed. If the people do not trust the government to execute their will, a dApp cannot fix this.
The Board Members must honestly implement The Will Of The People, because the
governance of a people must either be with their consent, or it faces their revolt.

## User Stories

-   As an organization leader, I should be able to deploy a new VotingOrganization contract where votes can be created, based on a given ERC20/ERC721 token, and appoint several board members as trustees.

-   As an organization leader, I should be able to issue a VoteCoin (non-tradable NFT) and mint the coin to destination addresses to give my members the ability to vote in my organization.

-   As an individual, I should be able to get a list of all the Topics for a VotingOrganization, and see which ones are opened and closed, and their results.

-   As an individual, I should be able to cast a vote on an open Topic as "for" or "against" or "abstain".

-   As an individual, I should be able to delegate my vote to another user in the event I don't otherwise cast a vote.

-   As an individual, I should be able to use a view function to see the current vote count of a Topic, which is the sum of the token balances held by each vote "for" and "against".

-   As a board member, I should be able to submit the total final vote tally for a Topic that has recently ended, and mark the Topic as resolved under one of the following statuses -- "PASSED", "AGAINST", "REJECTED", "FORCED".

-   As an individual, I should be able to create any Topic to be voted on.




## Functional Spec

### Users Signup And Frontend

-   "Anyone" and "Any ethereum account", used below, mean that a user could directly send transactions to our smart contracts, but they also can visit our web interface to perform all actions through a UI.

-   Account login will be provided by one of several service providers for ethereum wallets, and should be as straight forward as possible. The supported providers will be Portis.io, Metamask + BlockNative, Fortmatic and U-Port.





### Creating a Voting Organization

-   Any ethereum account should be able to create a Voting Organization using a Factory contract.

-   A Voting Organization has a Name, Target Coin, and list of Board Members.

- The Target Coin is the unit of power for voting in the ecosystem. It can be any contract with a `uint balanceOf(address)` function. If you don't have one, we can create a VoteCoin for you.

### Creating a VoteCoin

-   Any ethereum account should be able to issue a new VoteCoin using a Factory contract.

-   A VoteCoin is a typical ERC20 coin, except the transfer() function is disabled. A user might be issued one or several VoteCoins depending on the choices of the issuing authority (board members).

-   A VoteCoin also has TargetVotingOrganization and uint MaxCoinBalance members, set in the constructor.

-   A VoteCoin has a custom mint() function that can be used to issue more coins. Any board member is allowed to issue a coin to a user.

### Proposals

-   Anyone who holds at least 1 token should be allowed to create a proposal with a Title and Description and End Block.

-   Anyone who holds at least 1 token should be allowed to cast a vote "For" or "Against" or "Abstain" on any topic before it's End Block.

-   Any user should be able to nominate a Delegate, who will gain the user's voting power in any election that the user doesn't vote in.

-   Anyone should be able to use a view function to calculate vote totals by looping through all for- and against-votes and summing the total token balance of the voters.

-   Anyone should be able to list all the proposals for a Voting Organization and get the status of each proposal.


### Board Members

-   The creator should be added as a board member.

-   The creator and board members should have permission to add and remove board members.

-   After the End Block, a board member can submit final counts for "For", "against" and "abstain" vote totals (stake weighted), and change the Proposal status to any of "PASSED", "AGAINST", "REJECTED" or "FORCED".
