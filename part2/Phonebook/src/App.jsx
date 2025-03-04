import { getAll, create, deletePerson, update } from "./services/persons.js"
import { useEffect, useState } from 'react'

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

const Persons = ({persons, originalPersons, setPersons, setOriginalPersons}) => {

  const handleDelete = person => {
    if (confirm(`Sure you wanna delete ${person.name}?`)) {
      deletePerson(person.id).then(data => {
        setPersons(persons.filter(person => person.id !== data.id));
        setOriginalPersons(originalPersons.filter(person => person.id !== data.id));
      })
    }
  }
  return ( 
    <div>
      {persons.map((person) => {
        return (
          <div key={person.id}>
            <span>{person.name} {person.number}</span>
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        )
      })}
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [originalPersons, setOriginalPersons] = useState([]);

  useEffect(() => {
    getAll()
    .then(data => {
      setPersons(data);
      setOriginalPersons(data);
    })
    .catch(err => console.error(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    persons.forEach(element => {
      if (element.name === newName) {
        if( confirm(`${element.name} is already in the phonebook, replace the old number with the new one?`)) {
          const updatedPerson = {...element, number: number};
          update(element.id, updatedPerson).then((data) => {
            setPersons(persons.filter(person => person.id !== data.id).concat(data));
            setOriginalPersons(persons.filter(person => person.id !== data.id).concat(data));
            setNewName('');
            setNumber('');
          })
        }
        flag = false;
      }
    });
    if (flag) {
      const newPerson = { name: newName, number: number };
      create(newPerson)
        .then((newData) => {
          setPersons([...persons, newData]);
          setOriginalPersons([...originalPersons, newData]);
        })
        .catch((err) => console.error(err));
      setNewName('');
      setNumber('');
    }
  };

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
      <Persons persons={persons} originalPersons={originalPersons} setPersons={setPersons} setOriginalPersons={setOriginalPersons}/>
    </div>
  )
}

export default App