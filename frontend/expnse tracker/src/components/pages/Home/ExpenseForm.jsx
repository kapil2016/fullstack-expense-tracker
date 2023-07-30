import React, { useRef, useState } from "react";
import styles from "./ExpenseForm.module.css";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const categories = ["patrol", "food", "bills payments", "other expense"];

const ExpenseForm = (props) => {
  const amountRef = useRef();
  const titleRef = useRef();
  const dateRef = useRef();
  const categoryRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const isDarkMode = false;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send data to server or store locally
    const details = {
      title: titleRef.current.value,
      amount: amountRef.current.value,
      date: dateRef.current.value,
      category: categoryRef.current.value,
    };

    props.onSubmit(details);
    titleRef.current.value = "";
    amountRef.current.value = "";
    dateRef.current.value = "";
    categoryRef.current.value = "";
  };

  return (
    <div className={[styles.card, isDarkMode ? styles.dark : ""].join(" ")}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
          margin: "10px",
          justifyItems: "center",
          fontSize: "60px",
          color: "green",
        }}
      >
        <h6>Add Expense</h6>
        {expanded ? <FaAngleDown /> : <FaAngleRight />}
      </div>

      {expanded && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="money">Money spent:</label>
            <input type="number" id="money" ref={amountRef} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" ref={titleRef} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category:</label>
            <select id="category" ref={categoryRef}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date of expense:</label>
            <input type="date" id="date" ref={dateRef} required />
          </div>
          <button type="submit">Add expense</button>
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;
