import { Fragment } from "react"

const TCol = (props) => {
  return (
    <>
      {
        props.type === "body"
          ? <td>{props.children}</td>
          : <th>{props.children}</th>
      }
    </>
  )
}

export default TCol