import React, { Component } from "react";
import { render } from "@testing-library/react";
import axios from "axios";

export default class EditJourney extends Component {
    constructor(props) {
        super(props);

        this.onChangeJourneyName = this.onChangeJourneyName.bind(this);
        this.onChangeJourneyDescription = this.onChangeJourneyDescription.bind(this);
        this.onChangeJourneyPriority = this.onChangeJourneyPriority.bind(this);
        this.onChangeJourneyCompleted = this.onChangeJourneyCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            description: "",
            priority: "",
            completed: false,
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:4000/journey/" + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    priority: response.data.priority,
                    completed: response.data.completed,
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    onChangeJourneyName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeJourneyDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeJourneyPriority(e) {
        this.setState({
            priority: e.target.value,
        });
    }

    onChangeJourneyCompleted(e) {
        this.setState({
            completed: !this.state.completed,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            description: this.state.description,
            priority: this.state.priority,
            completed: this.state.completed,
        };
        axios
            .post("http://localhost:4000/journey/update/" + this.props.match.params.id, obj)
            .then((res) => {
                console.log(res.data);
            });
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <h3>Update Journey</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeJourneyName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeJourneyDescription}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.priority === "Low"}
                                onChange={this.onChangeJourneyPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.priority === "Medium"}
                                onChange={this.onChangeJourneyPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.priority === "High"}
                                onChange={this.onChangeJourneyPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                        <div className="form-check ">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="completedCheckbox"
                                name="completedCheckbox"
                                onChange={this.onChangeJourneyCompleted}
                                checked={this.state.completed}
                                value={this.state.completed}
                            />
                            <label className="form-check-label" htmlFor="CompletedCheckbox">
                                Completed
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <input
                                type="submit"
                                value="Update Journey"
                                className="btn btn-primary"
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
