
import React from 'react'


import ExpenseList from '../components/expenseLIst/expenseList'

export default function page() {
  return (
    <div>
        <ExpenseList expenses={[{amount:22, category:'online', note:'aaaa', date:'10/2/2024'}]}/>
    </div>
  )
}
