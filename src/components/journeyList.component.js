import React, { Component } from "react";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import axios from "axios";

const Journey = (props) => (
    <tr>
        <td className={props.journey.completed ? "completed" : ""}>{props.journey.name}</td>
        <td className={props.journey.completed ? "completed" : ""}>{props.journey.description}</td>
        <td className={props.journey.completed ? "completed" : ""}>{props.journey.priority}</td>
        <td>
            <Link to={"/edit/" + props.journey._id}>Edit</Link>
        </td>
    </tr>
);

export default class JourneyList extends Component {
    constructor(props) {
        super(props);

        this.journeyList = this.journeyList.bind(this);

        this.state = {
            journeys: [],
        };
    }

    componentDidMount() {
        axios
            .get("/journey/")
            .then((response) => {
                this.setState({ journeys: response.data });
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    componentDidUpdate() {
        axios
            .get("/journey/")
            .then((response) => {
                this.setState({ journeys: response.data });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    journeyList() {
        return this.state.journeys.map(function (currentJourney, i) {
            return <Journey journey={currentJourney} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>List of Journeys</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.journeyList()}</tbody>
                </table>
            </div>
        );
    }
}
