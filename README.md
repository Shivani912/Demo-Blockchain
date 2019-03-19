# my_blockchain
## Made By ``` Shivani Joshi ```

### About the project
``` This is a front-end demo of a basic blockchain application. The app is implemented using Vuejs, Vuex and BootStrap-vue. 

The blockchain is initialized when the page loads and a default Genesis Block is mined by default. Every block in the Blockchain is a set of following attributes: 

	- Block Title
	- Timestamp
	- Block Data
	- Previous Hash
	- Block Hash
	- Nonce

A new block with user data is added to the Blockchain when the "ADD NEW BLOCK" button is clicked. The onClick event of the button handles the hashing and mining of the new block. 

Validations are added to the data field of blocks which checks for changes in data and rehashes the block. As a result, the new hash of the block will be invalid and this information will be passed down to all the blocks after the current one. Valid and invalid hashes are represented by green and red colours, respectively.

When a block becomes invalid, the nonce is replaced with a Remine button. Remining a block only rehashes the current block and does not validate the consecutive ones.

The DIFFICULTY field defines the difficulty of the mining process. For example, a difficulty of 3 requires every block's hash to have 3 leading zeroes. 

The Reset Button reinitializes the blockchain with the difficulty, if specified.
```



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).





