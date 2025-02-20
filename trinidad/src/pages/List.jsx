import { useEffect, useState } from "react";
import peopleData from "./people.json";

function List() {
  const originalPeople = peopleData.list;
  const [people, setPeople] = useState([]);
  const [openPage, setOpenPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(0); 
  const [pages, setPages] = useState([])
  

  useEffect(() => {
    fetch("https://proovitoo.twn.ee/api/list")
      .then(res => res.json())
      .then(json => {
        console.log(json); 
        setPeople(json.list);

        const totalPages = Math.ceil(json.list.length / 10);
        const allPages = [];
  
        for (let i = 1; i <= totalPages; i++) {
          allPages.push(i);
        }
        setPages(allPages)
      })

     
  }, []);

  const personalCodeToBirthDate = (id) => {
    id = id.toString();
    let birthDate;
    if (id.startsWith("3") || id.startsWith("4")) {
      birthDate = id[5] + id[6] + "." + id[3] + id[4] + "." + "19" + id[1] + id[2];
    } else {
      birthDate = id[5] + id[6] + "." + id[3] + id[4] + "." + "20" + id[1] + id[2];
    }
    return birthDate;
  };

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = people.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 


  const sortPeopleByName = () => {
    if (sortOrder === 0) {
      const sortedPeople = people.sort((a, b) => a.firstname.localeCompare(b.firstname));
      setPeople(sortedPeople);
      setSortOrder(1);
    } else if (sortOrder === 1) {
      const sortedPeople = people.sort((a, b) => b.firstname.localeCompare(a.firstname));
      setPeople(sortedPeople);
      setSortOrder(-1);
    } else {
      setPeople(originalPeople);
        setSortOrder(0);
    }
  };

  const sortPeopleBySurname = () => {
    if (sortOrder === 0) {
        const sortedPeople = [...people].sort((a, b) => (a.surname === undefined ? "" : a.surname).localeCompare(b.surname === undefined ? "" : b.surname));
        setPeople(sortedPeople);
        setSortOrder(1);
    } else if (sortOrder === 1) {
        const sortedPeople = [...people].sort((a, b) => (b.surname === undefined ? "" : b.surname).localeCompare(a.surname === undefined ? "" : a.surname));
        setPeople(sortedPeople);
        setSortOrder(-1);
    } else {
        setPeople(originalPeople);
        setSortOrder(0);
      }
    };
    


  return (
    <div className="page">
      <div className="listpage">
        <table>
          <thead>
            <tr>
              <th onClick={sortPeopleByName}>Eesnimi</th>
              <th onClick={sortPeopleBySurname}>Perekonnanimi</th>
              <th>Sugu</th>
              <th>Sünnikuupäev</th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((person, index) => (
              <> 
                <tr
                  onClick={() => setOpenPage(openPage === index ? null : index)}
                  className="tropen" key={person.id + index}>
                  <td>{person.firstname}</td>
                  <td>{person.surname}</td>
                  <td>{person.sex === "m" ? "Mees" : "Naine"}</td>
                  <td>{personalCodeToBirthDate(person.personal_code)}</td>
                  <td>{person.phone}</td>
                </tr>

                {openPage === index && (
                  <tr key={person.id + 1}>
                    <td colSpan="5">
                      <div className="openedsheet">
                        <div className="openedsheetleft">
                        <img src={person.image.small} alt="" />
                        </div>
                        <p>{person.body}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {pages.map((pageNumber) => (
            <button 
              key={pageNumber + 1} onClick={() => paginate(pageNumber)} className={currentPage === pageNumber ? "active" : ""}>
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
