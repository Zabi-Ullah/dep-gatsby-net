import React from "react"
import Layout from "../components/layout"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag'
const GETTODO=gql`
  {
    todos{
      id
      task
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
        <div className="container">
        <h1>loading...</h1>
        </div>
      </Layout>
    )
  }
  if(error){
    console.log(error)
    return(
      <Layout>
        <div className="container">
        <h1 >Error</h1>
        </div>
      </Layout>
    )
  }
  return(
    <Layout>
      <div className="container">
      <h1>Add Todo</h1>
      <input type="text" ref={e=>{
        input=e
      }} />
      <button onClick={()=>addtask()}>Submit</button><br /><br />
      <h1>My Todo List</h1>
      <table border={2} width="500" >
        <tr>
          <th>Task</th>
          <th>Status</th>
        </tr>
        {data.todos.map(d=>(
          <tr>
            <td>{d.task}</td>
            <td>{d.status.toString()}</td>
          </tr>
        ))}
      </table>
      </div>
    </Layout>
  )
}
