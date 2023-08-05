import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import PremiumComponent from "../BuyPremium";
import { useSelector } from "react-redux";
import {useState , useEffect} from 'react'
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

async function fetchExpenses(idToken) {
  const response = await axios.get(
    `http://localhost:3000/compare/`,{
        headers:{
            Authorization:idToken,
        }
    }
  );
  const expenses = response.data;
  return expenses;
}
// const pieData = [
//   { name: "food", value: 540 },
//   { name: "fule", value: 470 },
//   { name: "bills", value: 161 },
//   { name: "other", value: 301 },
// ];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#ffff",
          padding: "5px",
          border: "1px solid #cccc",
        }}
      >
        <label> {`${payload[0].name} : ${payload[0].value}₹`}</label>
      </div>
    );
  }
  return null;
};

const PieRechartComponent = () => {
  const [pieData, setPieData] = useState([]) ;

  const isPremium = useSelector((state) => state.auth.isPremium);
  const idToken = useSelector(state=>state.auth.idToken)

  useEffect(()=>{
    if(isPremium){
      fetchExpenses(idToken).then(data=>{
        console.log(data)
        setPieData(data)
      }).catch(err=>console.log(err))
    }
  },[isPremium])

  return (
    <div style={{display:'flex' , justifyContent:'center' , alignItems:'center'}}>
      {!isPremium ? (
        <PremiumComponent />
      ) : (
        <PieChart width={350} height={350}>
          <Pie
            data={pieData}
            color="#000000"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default PieRechartComponent;
