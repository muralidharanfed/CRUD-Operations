
import { useEffect, useState } from 'react';
import './App.css';
import { Button, EditableText, InputGroup, Position, Toast } from '@blueprintjs/core';


//  export const AppToaster = Toast.create({
//    position: Position.TOP
//  });
function App() {



  const [user, setUser] = useState([]);


  const [inputName, setInputname] = useState("")
  const [inputEmail, setInputemail] = useState("")
  const [inputWebsite, setInputwebsite] = useState("")



  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((respond) => respond.json())
      .then((json) => setUser(json))
  }, [])

  function AddUser() {
    const name = inputName.trim();
    const email = inputEmail.trim();
    const website = inputWebsite.trim();

    if (name && email && website) {
      fetch('https://jsonplaceholder.typicode.com/users',
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            website

          }),
          headers: {
            "content-Type": "application/json;  charset=UTF-8"
          }
        }
      )
        .then((respons) => respons.json())
        .then((data) => {

          setUser([...user, data]);

          //  AppToaster.show({
          //  message: "user added successfully",
          //  intent: 'success',
          //  timeout: 3000
          // })

          setInputname("");
          setInputemail("");
          setInputwebsite("");
        }
        );

    }
  }

  function onchangeHandler(id, key, value) {
    setUser((user) => {
      return user.map(use => {
        return use.id === id ? { ...use, [key]: value } : use;
      })
    })
  }

  function updateUser(id) {
    const use = user.find((use) => use.id === id);

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(use),
        headers: {
          "content-Type": "application/json;  charset=UTF-8"
        }
      }
    )
      .then((respons) => respons.json())
      .then((data) => {
      }
    );





  }

  function deleteuser(id) {
     fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: 'DELETE',
        }
    )
      .then((respons) => respons.json())
      .then((data) => {
        setUser((user)=>{return user.filter(use=>use.id !== id)})
      }
    );
  }
 


  return (

    <div className="App">

      <table className='bp4-html-table modifier'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            user.map((user) =>
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td><EditableText onChange={value => onchangeHandler(user.id, 'email', value)} value={user.email} /></td>
                <td><EditableText onChange={value => onchangeHandler(user.id, 'website', value)} value={user.website} /></td>
                <td>
                  <Button intent='primary' onClick={() => { updateUser(user.id) }} >update</Button> 
                  &nbsp;
                  <Button intent='danger' onClick={() => deleteuser(user.id)}>delete</Button>
                </td>
              </tr>

            )
          }
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><InputGroup
              value={inputName}
              onChange={(e) => setInputname(e.target.value)}
              placeholder='enter a name...'
            />
            </td>
            <td><InputGroup
              value={inputEmail}
              onChange={(e) => setInputemail(e.target.value)}
              placeholder='enter a email...'
            />
            </td>
            <td><InputGroup
              value={inputWebsite}
              onChange={(e) => setInputwebsite(e.target.value)}
              placeholder='enter a website...'
            />
            </td>
            <td>
              <Button intent='success' onClick={AddUser}>Add User</Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
