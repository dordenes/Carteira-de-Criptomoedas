//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
const network = bitcoin.networks.testnet
//derivacao de carteiras
const Path = `m/49'/1'/0'/0`
//criando as palavras mnemonic para a seed(palavras de senhas)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)
//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)
//criando uma conta -par pvt e pub keys chaves publicas e privadas
let account = root.derivePath(Path)
//carteira raiz que deriva outras, conta nó a partir da raiz
let node = account.derive(0).derive(0)


//gerar endereço
let btcAddress = bitcoin.payments.p2pkh({
pubkey: node.publicKey,
network: network,
}).address

console.log ("carteira gerada")
console.log ("endereço: ", btcAddress)
console.log ("chave privada:" , node.toWIF());
console.log ("Seed:" , mnemonic)



