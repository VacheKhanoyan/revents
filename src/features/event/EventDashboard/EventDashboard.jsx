import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import {  deleteEvent } from "./../eventActions";
import EventList from "../EventList/EventList";

const mapStateToProps = state => ({
  events: state.events
});
const actions = {
 
  deleteEvent,
 
};
class EventDashboard extends Component {
  
  
  handleDeleteEvent = eventId => {
    // console.log(eventId);
    this.props.deleteEvent(eventId);
  };
  
  render() {

    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            onOpenEvent={editEvent => {
              this.handleOpenEvent(editEvent);
            }}
            deleteEvent={eventId => {
              this.handleDeleteEvent(eventId);
            }}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
  
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(EventDashboard);
