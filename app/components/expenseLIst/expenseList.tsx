'use client'
import React, { useState, useEffect } from 'react';

interface Expense {
    // id: number,
    amount: number;
    category: string;
    note: string;
    date: string;
}

interface ExpenseListProps {
    expenses: Expense[]; // Props should be passed as an array of expenses
}

export default function ExpenseList({ expenses: initialExpenses }: ExpenseListProps) {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        if (initialExpenses && initialExpenses.length > 0) {
            setExpenses(initialExpenses);
        }
    }, [initialExpenses]);

    const handleAddExpense = () => {
        const newExpense: Expense = {
            // id: 0,
            amount: 0,
            category: '',
            note: '',
            date: new Date().toISOString().slice(0, 10),
        };
        setExpenses([...expenses, newExpense]);
        console.log(expenses)

    };

    const categories = ['online', 'on-site', 'walkin', 'misclinnious'];

    const handleChange = (index: number, field: keyof Expense, value: string | number) => {
        const newExpenses = [...expenses];
        newExpenses[index][field] = value; // Correcting the field assignment
        setExpenses(newExpenses);
    };

    const onDeleteHandler = (expense:Expense) =>{
        setExpenses(expenses.filter((e)=>expenses.amount! == expense.amount))

    }


    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8">Expense List</h1>
            <button
                onClick={handleAddExpense}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
            >
                Add Expense
            </button>
            <div className="grid grid-cols-5 gap-4">
                <div className="font-bold">ID</div>
                <div className="font-bold">Amount</div>
                <div className="font-bold">Category</div>
                <div className="font-bold">Note</div>
                <div className="font-bold">Date</div>
                {expenses.map((expense, index) => (
                    <React.Fragment key={index}>
                        <input
                            type="text"
                            value={expense.id}
                            readOnly // Making the ID field read-only
                            className="border rounded p-2 text-black"
                        />
                        <input
                            type="number"
                            value={expense.amount}
                            onChange={(e) => handleChange(index, 'amount', e.target.valueAsNumber)}
                            className="border rounded p-2 text-black"
                        />
                        <select
                            id="category"
                            name="category"
                            value={expense.category}
                            onChange={(e) => handleChange(index, 'category', e.target.value)} // Correcting field name
                            className="text-black bg-white rounded w-full py-2 px-3"
                            required
                        >
                            <option value="">Select a Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={expense.note}
                            onChange={(e) => handleChange(index, 'note', e.target.value)}
                            className="border rounded p-2 text-black"
                        />
                        <input
                            type="date"
                            value={expense.date}
                            onChange={(e) => handleChange(index, 'date', e.target.value)}
                            className="border rounded p-2 text-black"
                        />
                        <button onClick={()=>onDeleteHandler(expense)} className="bg-red-950">Delete</button>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
