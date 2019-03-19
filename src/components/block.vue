<template>
    <div class="margin">
        <h1> BLOCKCHAIN</h1>
        <div class="reset">
            DIFFICULTY
                <input v-model="BC_DIFFICULTY" type="text" />
                <b-button v-on:click="addOrReset('reset')" class="resetBtn">Reset</b-button>
        </div>
        
        
        <div v-for="block in blocks" :key="block.id" id="parentDiv">
            <b-card class="bcard">
                <b-card-title class="col-sm-3.5">{{block.blockTitle}} </b-card-title>
                <small class="text-muted col-sm-8">{{block.timestamp}}</small>
                <b-card-text>
                    <b-input-group prepend="Data"  > 
                        <b-form-input v-model="block.blockData" v-on:input="verifyBlock(block)" type="text"/>
                    </b-input-group>
                </b-card-text> 
                PREVIOUS HASH:<small class="validPrevHash"> {{block.prevHash}}</small> <br>
                HASH: <small :id="block.index" class="validHash">{{block.blockHash}}</small><br>
                <small class="text-muted" v-if="block.valid" id="nonce">{{block.nonce}}</small>
                <b-button v-on:click="remine(block)" v-else class="remine" ><img src="../assets/remine.png" class="remineImg"></b-button>
            </b-card>
        </div>
        <div class="addNewBlock">
            <b-card class="bcard">
                <b-input-group prepend="Data"  >
                     <b-form-input type="text" v-model="newBlockData" />
                </b-input-group>
                <b-button v-on:click="addOrReset('add')" class="addNewBtn">+ ADD NEW BLOCK </b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
import { ethers } from 'ethers'

export default {
    name: 'block',
    created: function() {
        this.addOrReset('reset')
    },
    data() {
        return {
            newBlockData: '',
            BC_DIFFICULTY: 2
        }
    },
    
    computed: {
        blocks() {
            return  this.$store.state.blocks
        }
    },

    methods: {
        addOrReset(action) {
            
            let blockData = ''
            if (action === 'add') {
                
                this.$store.commit('initialiseStore')
                blockData = this.newBlockData
            }
            else if (action === 'reset') {

                this.$store.state.blocks = []
                this.$store.commit('resetStore')
                blockData = 'Genesis Block'
            }
            
            this.$store.dispatch('createBlock', blockData)
            let data = {
                index: this.$store.state.block.index, 
                timestamp: this.$store.state.block.timestamp, 
                prevHash: this.$store.state.block.prevHash, 
                blockData: this.$store.state.block.blockData,
            }

            let returnData = this.calculateNonce(data) 
            let nonce = returnData.nonce
            
            let hash = this.hashBlock(returnData)
            this.$store.dispatch('addBlock', {nonce,hash})
            
            this.newBlockData = ''
        },
        
        verifyBlock(block) {
            
            let hashOfBl = block.blockHash
            let data = {
                index: block.index, 
                timestamp: block.timestamp, 
                prevHash: block.prevHash,
                blockData: block.blockData,
                nonce: block.nonce
            }
            
            let hash = this.hashBlock(data)
            let action = ( hashOfBl === hash) ? {action:'reset', hash: hashOfBl}:{action: 'change', hash: hash}
            
            this.changeOrResetElement(action.action, block.index, action.hash)
            
        },
        changeOrResetElement(action, index, hash) {
           
            let element = null
            element = document.getElementById(index)
            element.innerHTML = hash
            let valid
             if(action === 'change') {
                element.className = 'invalidHash'
                valid = false
            }
            else if(action === 'reset') {
                element.className = 'validHash'
                valid = true
            }
            
            this.$store.commit('setValidityByIndex', {index,valid})

            if(this.$store.state.blocks[index+1]) {
                this.changeOrResetNextElement(action, index+1,hash)
            
            }
            
        },
        
        changeOrResetNextElement(action, index, hash) {
            let parent = document.getElementById("parentDiv")
            let nextElementStr = parent
            for(let i=0; i < index; i++) {
                nextElementStr = nextElementStr.nextElementSibling
            }
            let prevHash = nextElementStr.lastElementChild.firstElementChild.children[3] 
            
            prevHash.innerHTML = hash
            if(action === 'change') {
                prevHash.className = 'invalidPrevHash'
            }
            else if(action === 'reset') {
                prevHash.className = 'validPrevHash'
            }
          
            let block = {
                index: index, 
                timestamp: this.$store.state.blocks[index].timestamp, 
                prevHash: hash,
                blockData: this.$store.state.blocks[index].blockData,
                blockHash: this.$store.state.blocks[index].blockHash,
                nonce: this.$store.state.blocks[index].nonce
            }
            
            this.verifyBlock(block)
        },
        
        hashBlock(bl) {
            let str = JSON.stringify(bl)
    
            var result = '';
            for (var i=0; i<str.length; i++) {
            result += str.charCodeAt(i).toString(16);
            }
    
            let hexifiedBl = result
            return ethers.utils.keccak256("0x" + hexifiedBl)
        },

        calculateNonce(data) {
            // https://stackoverflow.com/a/10869248
            debugger
            let clonedBl = JSON.parse(JSON.stringify(data))
            let nonce = 0
            clonedBl["nonce"] = nonce
            let hash = this.hashBlock(clonedBl)
            let zeroes = ''
            let diff = parseInt(this.BC_DIFFICULTY)
            for(let i =0; i < diff; i++) {
                zeroes = zeroes + '0'
               
            }
            while(!(hash.substring(2, diff+2) === zeroes)) {
                
                nonce++
                clonedBl["nonce"] = nonce
                hash = this.hashBlock(clonedBl)
            }
           data["nonce"] = nonce
            
            return data
        },
        remine(block) {
            
            let data = {
                index: block.index, 
                timestamp: block.timestamp, 
                prevHash: block.prevHash, 
                blockData: block.blockData,
            }
            let returnData = this.calculateNonce(data) 
            let nonce = returnData.nonce
            let index = data.index
            let hash = this.hashBlock(returnData)
            let blockData = data.blockData
           
            this.$store.commit('remineBlock', {index, hash,nonce,blockData})
            let action = 'reset'
            this.changeOrResetElement(action, index,hash)
        }
    }
}
    
    

</script>


<style scoped>
    .margin{
        max-width: 70%;
        margin: 5% 15% 5% 15%;
        
    }
    #parentDiv{
        margin: 5% 20% 5% 20%;
    }
    h4{
        float: left;
    }
    h1{
        text-align: center;
    }
    small{
        top: 2px;
    }
    #nonce{
        float: right;
        border: 1px solid;
        border-radius: 0.4em;
        border-color: rgba(0, 0, 0, 0.125);
        padding: 0.2em 0.8em 0.2em 0.8em;
    }
    .remine{
        float: right;
        background-color: white;
        border-radius: 50%;
        padding: 0;
        border: 0;     
    }
    .remineImg {
        
        width: 40px;
        height: 40px;
        
    }
    .invalid{
        color: red;
        border: 1px solid;
    }
    .validPrevHash {
        color: #52c41a;
    }
    .invalidPrevHash {
        color: #f5222d;
    }
    .validHash {
        color: #52c41a;
        background: #f6ffed;
        border-color: #b7eb8f;
        border-radius: 4px;
        border: 1px solid;
        padding: 0.2em 0.8em 0.2em 0.8em;
    }
    .invalidHash {
        color: #f5222d;
        background: #fff1f0;
        border-color: #ffa39e;
        border-radius: 4px;
        border: 1px solid;
        padding: 0.2em 0.8em 0.2em 0.8em;
    }
    .reset {
        width: 400px;
        text-align: center;
        margin-left: 35%;
        margin-top: 5%;
    }
    .resetBtn {
        background-color:white;
        color: #17a2b8;
        border: 2px solid;
        border-radius: 10%;
        border-color: #17a2b8;
        height: 40px;
        width: 70px;
        text-align: center;
        margin-left: 2%;
    }
    .addNewBlock{
        margin-left: 30%;
        margin-right: 30%;
    }
    .addNewBtn {
        margin: 10% 25% 5% 30%;
        border-bottom-left-radius:75px;
        border-bottom-right-radius:75px;
        border-top-left-radius:75px;
        border-top-right-radius:75px;
        border: 0px;
        padding: 15px 20px 15px 20px;
        background-color: red; /* For browsers that do not support gradients */
        background-image: linear-gradient(to top right, rgb(221, 40, 40), rgb(241, 238, 56)); 

    }
    div.bcard:hover{
        /* border: 2px solid;
        border-color: #17a2b8;
        border */
        box-shadow: 2px 2px 2px 2px gray;
    }
    
</style>

