import React from 'react';
import ExpenseCard from './ExpenseCard';


const ExpenseList = (props) => {
    const expenses =props.data ;
    const ExpensesList =[];
    for(let item of expenses){
        const date = new Date(item.date);
        const day = date.getDate()
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        ExpensesList.push( <ExpenseCard
            id = {item.id}
            date={item.date}
            key={item.id}
            description={item.title}
            amount={item.amount}
            day={day}
            month={month}
            year={year}
            onEdit={props.onEdit}
            category={item.category}
            onDelete={props.onDelete}
          />)
    }
  return (
    <div style={{width:'60vw'}}>
        {ExpensesList}
    </div>
  );
};

export default ExpenseList;