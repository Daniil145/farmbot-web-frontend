import * as React from "react";
import { Link } from "react-router";
import { Plant } from "./interfaces";
import { Everything } from "../interfaces";
import { Select } from "../ui";
import { searchPlants } from "./actions";

const pathname = "/app/designer";

interface PlantsState {
  searchResults: any[];
}

export class Plants extends React.Component<Everything, PlantsState> {
  constructor() {
    super();
    this.state = { searchResults: [] };
  }

  render() {
    console.log(this.props.dispatch)
    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <div className="panel-tabs">
          <ul>
            <li className="hidden-sm hidden-md hidden-lg">
              <Link to={{ pathname, query: { p1: "NoTab" } }}>
                Designer
              </Link>
            </li>
            <li>
              <Link to={{ pathname, query: { p1: "Plants" } }}
                className={"active"}>
                Plants
              </Link>
            </li>
            <li>
              <Link to={{ pathname, query: { p1: "Groups" } }}>
                Groups
                </Link>
            </li>
            <li>
              <Link to={{ pathname, query: { p1: "Zones" } }}>
                Zones
              </Link>
            </li>
            <li className="hidden-sm hidden-md hidden-lg">
              <Link to={{ pathname, query: { p1: "Panel2" } }}>
                Calendar
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="panel-content">

        <Select
          value="one"
          options={this.state.searchResults}
          onInputChange={this.props.dispatch(searchPlants)}
        />

        <div className="object-list">
          <label>Current Plants</label>
          <List plants={this.props.designer.plants} />
        </div>
      </div>

      <Link to={{ pathname, query: { p1: "SpeciesCatalog" } }}>
        <div className="plus-button add-plant button-like"
          data-toggle="tooltip"
          title="Add plant">
          <i className="fa fa-2x fa-plus" />
        </div>
      </Link>

    </div>;
  }
};

interface ListProps {
  plants: Plant[];
}
export class List extends React.Component<ListProps, any> {
  render() {
    let mapper = function (plant: Plant, key: number) {
      return (
        <li key={key} >
          <Link to={{
            pathname: "/app/designer",
            query: { p1: "PlantInfo", id: (plant.openfarm_slug || "") }
          }}>
            {plant.name}
          </Link>
          <p>{plant.planted_at || "Unknown planting time"}</p>
        </li>);
    };
    return (<ul>
      {this.props.plants.map(mapper)}
    </ul>);
  }
};
