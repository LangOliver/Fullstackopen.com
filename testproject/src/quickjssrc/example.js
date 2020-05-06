import fs from 'fs'

var output = fs.readFileSync('data.tsv')
console.log('out', output)