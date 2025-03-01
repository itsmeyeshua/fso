import { useState } from 'react'

const Filter = ({search, handleSearch}) => {
  return ( 
    <div>filter shown with <input value={search} onChange={handleSearch}/></div>
  );
}

const PersonForm = (props) => {
  return ( 
    <form onSubmit={props.handleSubmit}>
      <div>name: <input value={props.newName} onChange={(e) => props.setNewName(e.target.value)}/></div>
      <div>number: <input value={props.number} onChange={e => props.setNumber(e.target.value)} /></div>
      <div><button type="submit">add</button></div>
  </form>
  );
}

const Persons = ({persons}) => {
  return ( 
    <div>
      {persons.map((person) => {
        return <p key={person.id}>{person.name} {person.number}</p>
      })}
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [originalPersons, setOriginalPersons] = useState(persons);

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    persons.forEach(element => {
      if (element.name === newName) {
        alert(`${element.name} is already in the phonebook`);
        flag = false;
      }
    });
    if (flag) {
        const newList = originalPersons.concat({ name: newName, number: number, id: originalPersons.length + 1 });
        console.log(newList);
        setPersons(newList);
        setOriginalPersons(newList);
        setNewName('');
        setNumber('');
    }
  }

  const handleSearch = (e) => {
    const searchName = e.target.value;
    setSearch(searchName);
    if (searchName === "") 
      setPersons(originalPersons);
    else {
      let newPersons = originalPersons.filter((el) => el.name.toLowerCase().includes(searchName.toLowerCase()));
      setPersons(newPersons);
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm newName={newName} number={number}  handleSubmit={handleSubmit} setNewName={setNewName} setNumber={setNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App