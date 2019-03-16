<template>
    <div>
        <b-button v-on:click="resetBlockchain">Reset Blockchain </b-button>
        <div v-for="block in blocks" :key="block.id">
            <b-card>
                <b-card-title>{{block.blockTitle}} </b-card-title>
                <small class="text-muted">{{block.timestamp}}</small>
                <b-card-text>DATA <input type="text" v-model="block.blockData" v-on:input="verifyBlock(block.index)"></b-card-text> 
                <b-card-text>PREVIOUS HASH: {{block.prevHash}}</b-card-text>
                <b-card-text id="hash">HASH: {{block.blockHash}}</b-card-text>
                
            </b-card>
        </div>
        <div>
             <b-card-text>DATA <input type="text" v-model="newBlockData" ></b-card-text>
             <b-button v-on:click="addNewBlock">Add new Block </b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'block',
    created: function() {
        this.$store.commit('initialiseStore')
        if(!(this.$store.state.blocks.length >= 1)) {
            this.$store.dispatch('createGenesisBlock')
        }
        // this.$store.dispatch('addBlock')
    },
    data() {
        return {
            newBlockData: '',
            invalid: false
        }
    },
    
    computed: {
        blocks() {
            return  this.$store.state.blocks
        }
    },
    methods: {
        addNewBlock() {
            this.$store.commit('initialiseStore')
            this.$store.dispatch('createBlock', this.newBlockData)
            this.newBlockData = ''
        },
        resetBlockchain() {
            this.$store.state.blocks = []
            this.$store.commit('resetStore')
            this.$store.dispatch('createGenesisBlock')
            
        },
        verifyBlock(index) {
            var CryptoJS = require("crypto-js");
            let data = {index: index, prevHash: this.$store.state.blocks[index].prevHash, timestamp: this.$store.state.blocks[index].timestamp, blockData: this.$store.state.blocks[index].blockData}
            let hash = (CryptoJS.SHA3(JSON.stringify(data), { outputLength: 256 })).toString()
        if(this.$store.state.blocks[index].blockHash === hash) {
          return true
        }
        else {
          return false
        }
            // console.log(this.$store.commit('verifyBlock',index))
            // if(!this.$store.dispatch('verifyBlock', index)) {
                debugger
            //     let element = window.getElementById('hash')
            //     console.log(element)
            // }
        }
    }
    
    
}
</script>


<style scoped>
    div{
        max-width: 70%;
        margin: 5% 15% 5% 15%;
    }
    
</style>

