import  { useEffect, useState } from 'react'

function List() {
  const  [people, setPeople] = useState();

  useEffect(() => {
    fetch("https://proovitoo.twn.ee/api/list")
    .then(res => res.json())
    .then(json => setPeople(json.list))
  }, [])
  
console.log(people);

  return (
    <div>
      {/* {people.map(person =>
        <div key={person.id}> {person.id} </div> 
      )} */}
      {/* TO-DO: Fix API maping */}
    </div>
  )
}

export default List