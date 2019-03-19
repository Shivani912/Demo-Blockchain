import Vue from 'vue'
import Vuex from 'vuex'
// import { ethers } from 'ethers' 


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blocks: [],
    block: {
      index: 0,
      blockTitle: '',
      timestamp: '',
      blockData: '',
      prevHash: '',
      blockHash: '',
      nonce: '',
      valid: true
    }
  },
  mutations: {
    //from Vue.js Docs
    initialiseStore(state) {
			// Check if the ID exists
			if(sessionStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(sessionStorage.getItem('store')))
				);
			}
    },
    resetStore() {
      sessionStorage.clear()
			
    },
    resetState(state) {
      state.block = {
        index: 0,
        blockTitle: '',
        timestamp: '',
        blockData: '',
        prevHash: '',
        blockHash: '',
        nonce: '',
        valid: true
      }
      state.blocks = []
    },
    setIndex(state, payload) {
      state.block.index = payload
    },
    setBlockTitle(state, payload) {
      state.block.blockTitle = payload
    },
    setTimestamp(state, payload) {
      state.block.timestamp = payload
    },
    setBlockData(state, payload) {
      state.block.blockData = payload
    },setPrevHash(state, payload) {
      state.block.prevHash = payload
    },
    setBlockHash(state, payload) {
      state.block.blockHash = payload
    },
    setNonce(state, payload) {
      state.block.nonce = payload
    },
    addToBlocks(state, payload) {
      state.blocks.push(payload)
      // state.block.blockData = ''
    },
    setValidityByIndex(state, payload) {
      state.blocks[payload.index].valid = payload.valid
    },
    setValidity(state,payload) {
      state.block.valid = payload
    },
    
    remineBlock(state, payload) {
     
      state.blocks[payload.index].blockHash = payload.hash
      state.blocks[payload.index].nonce = payload.nonce
      state.blocks[payload.index].blockData = payload.blockData
      let today = new Date().toString().split(' ')
      let timestamp = "on "+today[0]+", "+today[2]+" "+today[1]+" "+today[3]+" "+today[4]+" "+today[5]
      state.blocks[payload.index].timestamp = timestamp
    }
  },
  getter: {
    

  },
  actions: {
  
    createBlock ({commit, state}, blockData) {
      
      let index = state.blocks.length
      commit('setIndex', index)
      if(index === 0)
      {
        
        commit('setBlockTitle', "Genesis Block")
        
        commit('setPrevHash', "0" )
      }
      else {
        
        commit('setBlockTitle', "Block#"+state.block.index)
       
        commit('setPrevHash', state.blocks[index - 1].blockHash )
      }
      commit('setBlockData', blockData)
      let today = new Date().toString().split(' ')
      let timestamp = "on "+today[0]+", "+today[2]+" "+today[1]+" "+today[3]+" "+today[4]+" "+today[5]

        
        
        commit('setTimestamp', timestamp)
        let valid = true
        commit('setValidity', valid)
     
        
        
        
    
    },
    addBlock({commit,state}, {nonce,hash}) {
      commit('setNonce', nonce)  
      commit('setBlockHash', hash)
      let newBlock = JSON.parse(JSON.stringify(state.block))
      commit('addToBlocks', newBlock)
    }
    
  }
})


