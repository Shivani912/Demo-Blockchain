import Vue from 'vue'
import Vuex from 'vuex'
var CryptoJS = require("crypto-js");


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
      nonce: ''
    }
  },
  mutations: {
    //from Vue.js Docs
    initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
    },
    resetStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign( JSON.parse(localStorage.getItem('store')),state)
				);
			}
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
    setGenesisTimestamp(state, payload) {
      state.blocks[0].timestamp = payload
    },
    setGenesisBlockHash(state, payload) {
      state.blocks[0].blockHash = payload
    },
    verifyBlock({state},index) {
      let data = {index: index, prevHash: state.blocks[index].prevHash, timestamp: state.blocks[index].timestamp, blockData: state.blocks[index].blockData}
      let hash = (CryptoJS.SHA3(JSON.stringify(data), { outputLength: 256 })).toString()
        if(state.blocks[index].blockHash === hash) {
          return true
        }
        else {
          return false
        }
    }
    // resetBlock(state) {
      
    // }
  },
  getter: {
    

  },
  actions: {
    createGenesisBlock({commit, state}) {
      commit('setIndex', 0)
        commit('setBlockTitle', "Genesis Block")
        commit('setBlockData', "This is a Blockchain Demo !")
        commit('setPrevHash', "0" )
      let today = new Date().toString().split(' ')
      let timestamp = "on "+today[0]+", "+today[2]+" "+today[1]+" "+today[3]+" "+today[4]+" "+today[5]
      commit('setTimestamp', timestamp)
      let data = {index: state.block.index, prevHash: state.block.prevHash, timestamp: state.block.timestamp, blockData: state.block.blockData}
        let hash = (CryptoJS.SHA3(JSON.stringify(data), { outputLength: 256 })).toString()
        commit('setBlockHash', hash)

        commit('addToBlocks', state.block)
    },
    createBlock ({commit, state}, blockData) {
     
      let today = new Date().toString().split(' ')
      let timestamp = "on "+today[0]+", "+today[2]+" "+today[1]+" "+today[3]+" "+today[4]+" "+today[5]

        
        commit('setIndex', state.blocks.length)
        commit('setBlockTitle', "Block#"+state.block.index)
        commit('setBlockData', blockData)
        commit('setPrevHash', state.blocks[state.blocks.length - 1].blockHash )
        commit('setTimestamp', timestamp)
        let data = {index: state.block.index, prevHash: state.block.prevHash, timestamp: state.block.timestamp, blockData: state.block.blockData}
        let hash = (CryptoJS.SHA3(JSON.stringify(data), { outputLength: 256 })).toString()
        commit('setBlockHash', hash)
     
        commit('addToBlocks', state.block)
        
        
    
    }
    
  }
})


