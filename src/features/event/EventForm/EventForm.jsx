import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
const emptyEvent = {
  title: "",
  date: "",
  city: "",
  venue: "",
  hostedBy: ""
};
class EventForm extends Component {
  state = {
    event: emptyEvent
  };
  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({
        event: this.props.selectedEvent
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("current:", this.props.selectedEvent);
    console.log("next:", nextProps.selectedEvent);
    if (nextProps.selectedEvent !== this.props.selectedEvent) {
      this.setState({
        event: nextProps.selectedEvent || emptyEvent
      });
    }
  }
  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.event.id) {
      this.props.updatedEvent(this.state.event);
    } else {
      this.props.createEvent(this.state.event);
    }
  };
  onInputChange = e => {
    const newEvent = this.state.event;
    newEvent[e.target.name] = e.target.value;
    this.setState({ event: newEvent });
  };
  render() {
    const { handleCancel } = this.props;
    const { event } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              onChange={this.onInputChange}
              value={event.title}
              placeholder="Event Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              type="date"
              name="date"
              onChange={this.onInputChange}
              value={event.date}
              placeholder="Event Title"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              onChange={this.onInputChange}
              value={event.city}
              placeholder="Event Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              onChange={this.onInputChange}
              value={event.venue}
              placeholder="Event Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              onChange={this.onInputChange}
              value={event.hostedBy}
              placeholder="Event Title"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
