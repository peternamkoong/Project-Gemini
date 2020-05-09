import React, { Component } from "react";
import { render } from "@testing-library/react";

import axios from "axios";

export default class CreateJourney extends Component {
    constructor(props) {
        super(props);

        this.onChangeJourneyName = this.onChangeJourneyName.bind(this);
        this.onChangeJourneyDescription = this.onChangeJourneyDescription.bind(this);
        this.onChangeJourneyPriority = this.onChangeJourneyPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            description: "",
            priority: "",
            completed: false,
        };
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

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted: `);
        console.log(`Journey Name: ${this.state.name}`);
        console.log(`Journey Description: ${this.state.description}`);
        console.log(`Journey Priority: ${this.state.priority}`);
        console.log(`Journey Completed: ${this.state.completed}`);

        const newJourney = {
            name: this.state.name,
            description: this.state.description,
            priority: this.state.priority,
            completed: this.state.completed,
        };

        axios.post("/journey/add", newJourney).then((res) => console.log(res.data));

        this.setState({
            name: "",
            description: "",
            priority: "",
            completed: false,
        });
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Create New Journey</h3>
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
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit Journey" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
