from web3.auto import w3
import json

ABI = json.load(open('build/contracts/VotingOrganization.json'))["abi"]

def get_vote_count_at_block(contractAddress, proposalId, blockNumber):
    contract = w3.eth.contract(contractAddress, abi=ABI)
    return contract.functions.getVoteCount(proposalId).call(block_identifier=blockNumber)

def fetch_proposal(contractAddress, proposalId):
    contract = w3.eth.contract(contractAddress, abi=ABI)
    return contract.functions.fetchProposal(proposalId).call()

def get_final_vote_count(contractAddress, proposalId):
    final_block = fetch_proposal(contractAddress, proposalId)[3]
    return get_vote_count_at_block(contractAddress, proposalId, final_block -1)

if __name__ == '__main__':
    import sys
    address, id = sys.argv[1:3]
    print(get_final_vote_count(address, int(id)))