import React from "react";
import { Table, Button } from "react-bootstrap";

//component to display the tracks in a table
const TrackList = ({ tracks, onSelectTrack }) => {
  return (
    <Table striped bordered hover>
      <thead className="thead-dark">
        <tr>
          <th>Artist</th>
          <th>Title</th>
          <th>Length</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* Iterate over the tracks array and create a row for each track */}
        {tracks.map((track, index) => (
          <tr key={index}>
            <td>{track.artist}</td>
            <td>{track.title}</td>
            <td>{track.length}</td>
            <td>
              <Button variant="primary" onClick={() => onSelectTrack(track.id)}>
                Play
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TrackList;
