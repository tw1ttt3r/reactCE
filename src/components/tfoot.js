import { Component } from "react"

class Tfoot extends Component {

  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    return (
      <tfoot>{ this.props.children}</tfoot>
    )
  }

}

export default Tfoot