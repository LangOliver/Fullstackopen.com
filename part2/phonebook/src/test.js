
let persons = [
    {
    id: 1,
    name: "ich"},
    {id: 2,
    name: "du"}
]
const response =  {
    id: 2,
    name: "yolo"}

var tempPersons = [...persons]
          tempPersons = tempPersons.map(person => {
            if (person.id === response.id) {
              console.log("Matchin ids in array updating, replace with: ", response)
                return response
            } 
            else {
                console.log("ID not found: ", person)
              return person
            }
            
          })
console.log("array after replacement temp: ", tempPersons)
console.log("array after replacement orig: ", persons)