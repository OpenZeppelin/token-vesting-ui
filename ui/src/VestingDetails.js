import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class VestingDetails extends Component {
  render() {
    let { start, end, cliff, total, vested, revocable } = this.props.details;

    return <div>
      <h4>Vesting details</h4>
      <Table striped bordered condensed>
        <tbody>
          <tr>
            <th>Start date</th>
            <td>{ start }</td>
          </tr>
          <tr>
            <th>End date</th>
            <td>{ end }</td>
          </tr>
          <tr>
            <th>Cliff</th>
            <td>{ cliff }</td>
          </tr>
          <tr>
            <th>Total amount</th>
            <td>{ total }</td>
          </tr>
          <tr>
            <th>Already vested</th>
            <td>{ vested }</td>
          </tr>
          <tr>
            <th>Revocable</th>
            <td>{ revocable ? "✅" : "❌" }</td>
          </tr>
        </tbody>
      </Table>
    </div>
  }
}

export default VestingDetails;