import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag'
const GETTODO=gql`
  {
    todos{
      id,
      task,
      status
    }
  }
  `
const SETTODO=gql`
  mutation addTodo($task:String!){
    addTodo(task:$task){
      task
    }
  }
`
export default function Home() {
  const {loading,error,data}=useQuery(GETTODO)
  const [addTodo]=useMutation(SETTODO)
  let input;
  const addtask=()=>{
    addTodo({
      variables:{
        task:input.value
      },
      refetchQueries:[{query:GETTODO}]
    })
    input.value="";
  }
  if(loading){
    return(
      <Layout>
        <h1>loading...</h1>
      </Layout>
    )
  }
  if(error){
    console.log(error)
    return(
      <Layout>
        <h1>Error</h1>
      </Layout>
    )
  }
  return(
    <Layout>
      <h1>Add Todo</h1>
      <input type="text" ref={e=>{
        input=e
      }} />
      <button onClick={()=>addtask()}>Submit</button><br /><br />
      <h1>My Todo List</h1>
      <table border={2} width="700" >
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Status</th>
        </tr>
        {data.todos.map(d=>(
          <tr>
            <td>{d.id}</td>
            <td>{d.task}</td>
            <td>{d.status.toString()}</td>
          </tr>
        ))}
      </table>
    </Layout>
  )
}
