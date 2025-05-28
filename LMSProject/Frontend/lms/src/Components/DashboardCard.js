import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { BasketFill,Wallet,Person,ClipboardCheck } from 'react-bootstrap-icons'; 


const icons = {
    "Getitems":<BasketFill size={72} color="royalblue" style={{margin:'15px'}}/>,
    "Loans":<Wallet size={72} color="royalblue" style={{margin:'15px'}}/>,
    "Person":<Person size={72} color="royalblue" style={{margin:'15px'}}/>,
    "Apply":<ClipboardCheck size={72} color="royalblue" style={{margin:'15px'}}/>,
}

export default function DashboardCard({title,icon}) {
  return (
    <Card style={{ width: '18rem',height:'15rem' ,display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration:'none'}}>
      <div style={{
        textAlign:'center'
      }}>
        {icon?icons[icon]:null}
        <h4>{title}</h4>
      </div>
  </Card>
  )
}
