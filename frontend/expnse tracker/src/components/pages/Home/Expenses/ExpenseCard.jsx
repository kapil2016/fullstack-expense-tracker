import React, { useEffect, useRef, useState } from 'react';
import { FaPencilAlt, FaTrashAlt ,FaSave } from 'react-icons/fa';
import styles from './ExpenseCard.module.css';

const categories = ["patrol", "food", "bills payments", "other expense"];

function ExpenseCard({ day, month, year, description: title, amount, id , date , onEdit , category,onDelete}) {

  const[editCard ,setEditCard] = useState(false);
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

      onEdit(id,editedData)
    }


  }
  const deleteExpenseHandler =()=>{
    onDelete(id)
  }
  return (
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
  );
}

export default ExpenseCard;