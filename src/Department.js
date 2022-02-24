import React, { useState, useEffect } from 'react'
import AddDepartment from './AddDepartment';

export default function Department() {

    let [data, setData] = useState([]);
    let [addFormData, setAddFormData] = useState({
      DepartmentName : ''
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
      fetch(process.env.REACT_APP_WEBSITE_NAME+'department/AddDepartment',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              DepartmentName:addFormData.DepartmentName
          })
      })
      .then(res=>res.json())
      .then((result)=>{
          alert(result);
      },
      (error)=>{
          alert('Failed');
      }).then(refreshList)

      document.getElementById("department-form").reset();
    }

    function refreshList(){
        fetch(process.env.REACT_APP_WEBSITE_NAME + 'Department/GetAllDepartments')
        .then(response=>response.json())
        .then(data => setData(data));
    }

    useEffect(refreshList,[])

    function handlDeleteClick(departmentId) {
      console.log(departmentId)
      console.log(departmentId.value)
      console.log(departmentId.fieldValue)
      fetch(process.env.REACT_APP_WEBSITE_NAME+'department/DeleteDepartment/'+departmentId,{
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
      <div className="department-container">
        <table>
          <thead>
          <tr>
            <th>ID Департамента</th>
            <th>Название</th>
          </tr>
          </thead>
          <tbody>
          {data.map(item => (
            <tr>
              <td>{item.DepartmentId}</td>
              <td>{item.DepartmentName}</td>
              <td><button type="button" onClick={() => handlDeleteClick(item.DepartmentId)}>Удалить</button></td>
            </tr>
          ))}
          </tbody>
        </table>
        <h2>Добавить департамент</h2>
        <form id="department-form" onSubmit={handleAddFormSubmit}>
          <input type="text" name="DepartmentName" placeholder="Enter DepartmentName"required="required" onChange={handleAddFormChnage}></input>
          <button type="submit">Добавить</button>
        </form>
      </div>
    );
}