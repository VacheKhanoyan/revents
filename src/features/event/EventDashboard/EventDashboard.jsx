import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent, deleteEvent } from "./../eventActions";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";

const mapStateToProps = state => ({
  events: state.events
});
const actions = {
  createEvent,
  deleteEvent,
  updateEvent
};
class EventDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedEvent: null
    };
    // this.handleFormOpen = this.handleFormOpen.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
  }
  handleFormOpen = () => {
    this.setState({ isOpen: true, selectedEvent: null });
  };
  handleCancel = () => {
    this.setState({ isOpen: false });
  };
  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    });
  };
  handleDeleteEvent = eventId => {
    // console.log(eventId);
    this.props.deleteEvent(eventId);
  };
  handleOpenEvent = eventToOpen => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  };
  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.props.createEvent(newEvent);
    this.setState({
      isOpen: false
    });
  };
  render() {
    const { selectedEvent } = this.state;
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
          <Button
            positive
            content="Create Event"
            onClick={this.handleFormOpen}
            connect
          />
          {this.state.isOpen && (
            <EventForm
              updatedEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              handleCancel={this.handleCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(EventDashboard);
