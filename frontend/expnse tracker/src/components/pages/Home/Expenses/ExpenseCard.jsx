import React, { useEffect, useRef, useState } from 'react';
import { FaPencilAlt, FaTrashAlt ,FaSave } from 'react-icons/fa';
import styles from './ExpenseCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editExpense,deleteExpense } from '../../../../states/reducers/expense-reducer';
import axios from 'axios';

const categories = ["patrol", "food", "bills payments", "other expense"];
async function deleteExpenseById(id,idToken) {
  const response = await axios(`http://localhost:3000/expenses/${id}`, {
    method: "DELETE",
    headers:{
        Authorization:idToken
    }
  });
  const res = response.data;
  console.log(res);
  return res;
}

async function editExpenseById(id, details,idToken) {
  const response = await axios(`http://localhost:3000/expenses/${id}`, {
    method: "PUT",
    data: details,
    headers:{
        Authorization:idToken
    }
  });
  const expense = response.data;
  console.log(expense);
  return expense;
}



function ExpenseCard({ day, month, year, description: title, amount, id , date , category,}) {

  const[editCard ,setEditCard] = useState(false);
  const idToken = useSelector(state=>state.auth.idToken)
  const dispatch = useDispatch();
  const isDarkMode = false
  const editDate = useRef();
  const editDescription = useRef();
  const editAmount = useRef();
  const editCategory = useRef();

  useEffect(()=>{
    if(editCard){
        editDescription.current.value = title ;
        editDate.current.value = date ;
        editAmount.current.value = amount
        editCategory.current.value = category
    }
  },[editCard])


  const editExpenseHandler =()=>{
    setEditCard(pre=>!pre);
    if(editCard){
      const editedData = {amount:editAmount.current.value , title : editDescription.current.value , date:editDate.current.value , category:editCategory.current.value}  ;
      editExpenseById(id, editedData,idToken)
      .then((res) => {
        dispatch(editExpense({id:id , details:res}));
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }
  const deleteExpenseHandler =()=>{
    deleteExpenseById(id,idToken)
    .then(() => {
      dispatch(deleteExpense(id))
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <>
    <div className={[styles.card, isDarkMode ? styles.dark : ''].join(' ')} >
      <div className={styles.date}>
        {!editCard?
       <><div className={styles.day}>{day}</div>
        <div className={styles.month}>{month}</div>
        <div className={styles.year}>{year}</div></>:
        <input type='date' ref={editDate}/>
        }
      </div>
      <div className={styles.description}>
        {!editCard ?
        <>{title}</> :<input type='text' ref={editDescription}   placeholder='Add Description' />
        }
        
        </div>
         <div className={styles.description}>
         {!editCard ?
         <>{category}</> : <select id="category" ref={editCategory}>
         {categories.map((category) => (
           <option key={category} value={category}>
             {category}
           </option>
         ))}
       </select>
         }
         
         </div>
      <div className={styles.amount}>
        {!editCard?
       <> ${amount}</> :
        <input type='number'  placeholder='Add Amount' ref={editAmount}/>
        }
        
        </div>
      <div className={styles.buttons}>
        <button className={styles.editButton} onClick={editExpenseHandler}>
          {!editCard?<> {<FaPencilAlt />} </>:<> {<FaSave />} </>}
         
        </button>
        <button className={styles.deleteButton} onClick={deleteExpenseHandler}>
         <FaTrashAlt />
        </button>
      </div>
    </div>
    </>
  );
}

export default ExpenseCard;