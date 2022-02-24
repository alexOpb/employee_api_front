import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

export default function Employee() {
  let [data, setData] = useState([]);
  let [addFormData, setAddFormData] = useState({
    Name : '',
    DepartmentId : '',
    Title : '',
    ReportsTo : '',
    HireDate : ''
  });

  const handleAddFormChnage = (event) => {
    event.preventDefault();
    const DepartmentName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[DepartmentName] = fieldValue;

    setAddFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_WEBSITE_NAME+'employee/AddEmployee',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            Name : addFormData.Name,
            DepartmentId : addFormData.DepartmentId,
            Title : addFormData.Title,
            ReportsTo : addFormData.ReportsTo,
            HireDate : addFormData.HireDate
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
    },
    (error)=>{
        alert('Failed');
    }).then(refreshList)

    document.getElementById("employee-form").reset();
  }


  
  function refreshList(){
      fetch(process.env.REACT_APP_WEBSITE_NAME + 'employee/GetAllEmployees')
      .then(response=>response.json())
      .then(data => setData(data));
  }

  useEffect(refreshList,[])

  function handlDeleteClick(employeeId) {
    fetch(process.env.REACT_APP_WEBSITE_NAME+'employee/DeleteEmployee/'+employeeId,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
    },
    (error)=>{
        alert('Failed');
    }).then(refreshList)
  }

  return (
    <div className="employee-container">
    <table>
      <tr>
        <th>ID Сотрудника</th>
        <th>Имя</th>
        <th>Департамент</th>
        <th>Должность</th>
        <th>Начальник</th>
        <th>Начал работать с</th>
      </tr>
        {data.map(item => (
          <tr key={item.EmployeeId}>
            <td>{item.EmployeeId}</td>
            <td>{item.Name}</td>
            <td>{item.DepartmentId}</td>
            <td>{item.Title}</td>
            <td>{item.ReportsTo}</td>
            <td>{item.HireDate}</td>
            <td><button type="button" onClick={() => handlDeleteClick(item.EmployeeId)}>Удалить</button></td>
          </tr>
        ))}
    </table>
    <h2>Добавить сотрудника</h2>
    <form id="employee-form" onSubmit={handleAddFormSubmit}>
      <input type="text" name="Name" placeholder="Enter Name"required="required" onChange={handleAddFormChnage}></input>
      <input type="text" name="DepartmentId" placeholder="Enter DepartmentId"required="required" onChange={handleAddFormChnage}></input>
      <input type="text" name="Title" placeholder="Enter Title"required="required" onChange={handleAddFormChnage}></input>
      <input type="text" name="ReportsTo" placeholder="Enter ReportsTo"required="required" onChange={handleAddFormChnage}></input>
      <input type="text" name="HireDate" placeholder="Enter HireDate"required="required" onChange={handleAddFormChnage}></input>
      <button type="submit">Добавить</button>
    </form>
    </div>
  );
}
