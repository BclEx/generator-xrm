/*
 * generator-xrm
 * https://github.com/BclEx/generator-xrm
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var _ = require('lodash');

function q(s, ctx) {
    var camelCase = _.camelCase(ctx.name);
    return s.replace(/\$\{Name\}/g, ctx.name).replace(/\$\{name\}/g, camelCase).replace(/\$\{names\}/g, camelCase + 's');
}

function build_(s, theme, ctx) {
    var t0 = s[0];
    t0.push(function (selector, $) {
        var render = '\
let title = {\n\
    fontSize: "24px",\n\
    fontWeight: "300",\n\
    padding: "12px 0 6px 0"\n\
};\n\
return (\n\
    <div className="slds-form--stacked slds-grid slds-wrap slds-m-top">\n\
        <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">\n\
            <div className="slds-grid slds-wrap slds-m-top--large">\n\
\n\
                <div className="slds-col--padded slds-size--1-of-1">\n\
                    <img src={this.props.property.pic}/>\n\
                    <h1 style={title}>{this.props.property.teaser}</h1>\n\
                    {this.props.property.description}\n\
                </div>\n\
\n\
                <div className="slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-3 slds-m-top--medium">\n\
                    <dl className="page-header--rec-home__detail-item">\n\
                        <dt>\n\
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Sqft</p>\n\
                        </dt>\n\
                        <dd>\n\
                            <p className="slds-text-body--regular slds-truncate" title="">{this.props.property.size}</p>\n\
                        </dd>\n\
                    </dl>\n\
                </div>\n\
\n\
                <div className="slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-3 slds-m-top--medium">\n\
                    <dl className="page-header--rec-home__detail-item">\n\
                        <dt>\n\
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Bedrooms</p>\n\
                        </dt>\n\
                        <dd>\n\
                            <p className="slds-text-body--regular slds-truncate" title="">{this.props.property.bedrooms}</p>\n\
                        </dd>\n\
                    </dl>\n\
                </div>\n\
\n\
                <div className="slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-3 slds-m-top--medium">\n\
                    <dl className="page-header--rec-home__detail-item">\n\
                        <dt>\n\
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Bathrooms</p>\n\
                        </dt>\n\
                        <dd>\n\
                            <p className="slds-text-body--regular slds-truncate" title="">{this.props.property.bathrooms}</p>\n\
                        </dd>\n\
                    </dl>\n\
                </div>\n\
\n\
                <div className="slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-3 slds-m-top--medium">\n\
                    <dl className="page-header--rec-home__detail-item">\n\
                        <dt>\n\
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Garage</p>\n\
                        </dt>\n\
                        <dd>\n\
                            <p className="slds-text-body--regular slds-truncate" title="">2 cars</p>\n\
                        </dd>\n\
                    </dl>\n\
                </div>\n\
\n\
                <div className="slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-3 slds-m-top--medium">\n\
                    <dl className="page-header--rec-home__detail-item">\n\
                        <dt>\n\
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Finished Basement </p>\n\
                        </dt>\n\
                        <dd>\n\
                            <p className="slds-text-body--regular slds-truncate" title="">Yes</p>\n\
                        </dd>\n\
                    </dl>\n\
                </div>\n\
\n\
                <div className="slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-3 slds-m-top--medium">\n\
                    <dl className="page-header--rec-home__detail-item">\n\
                        <dt>\n\
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Heating</p>\n\
                        </dt>\n\
                        <dd>\n\
                            <p className="slds-text-body--regular slds-truncate" title="">Gas</p>\n\
                        </dd>\n\
                    </dl>\n\
                </div>\n\
\n\
                <div className="slds-col--padded slds-size--1-of-1">\n\
                    <br/>\n\
                    <GoogleMaps data={this.props.property} height="250px"/>\n\
                </div>\n\
\n\
            </div>\n\
        </div>\n\
        <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">\n\
            <Tabs>\n\
                <div label="Activities">\n\
                    <ActivityTimeline propertyId={this.props.property.property_id} activities={this.state.activities} showContact={true} showProperty={false}/>\n\
                </div>\n\
                <div label="Gallery">\n\
                    <FileDropArea/>\n\
                </div>\n\
            </Tabs>\n\
        </div>\n\
        <div className="slds-col--padded slds-size--1-of-1">\n\
            <br/>\n\
            <ActivityCard propertyId={this.props.property.property_id} activities={this.state.activities} showContact={true} showProperty={false}\n\
                onNew={this.newActivityHandler}\n\
                onDelete={this.deleteActivityHandler}/>\n\
            <BrokerCard propertyId={this.props.property.property_id}/>\n\
        </div>\n\
        {this.state.addingActivity ? <NewActivityWindow onSave={this.saveActivityHandler} onCancel={this.cancelActivityHandler} propertyId={this.props.property.property_id} price={this.props.property.price}/> : ""}\n\
    </div>)';
        $.body.append(q("\
import React from 'react';\n\
import * as activityService from '../_services/ActivityService';\n\
import Tabs from '../_components/Tabs';\n\
import GoogleMaps from '../_components/GoogleMaps';\n\
import FileDropArea from '../_components/FileDropArea';\n\
import ActivityTimeline from './../activities/ActivityTimeline';\n\
import BrokerCard from './../$(Name)/BrokerCard';\n\
import ActivityCard from './../activities/ActivityCard';\n\
import NewActivityWindow from './../activities/NewActivityWindow';\n\
export default React.createClass({\n\
    getInitialState() {\n\
        return {activities: []};\n\
    },\n\
    componentWillReceiveProps(props) {\n\
        this.loadActivities(props.property.property_id);\n\
    },\n\
    loadActivities(propertyId) {\n\
        activityService.findByProperty(propertyId).then(activities => this.setState({activities}));\n\
    },\n\
    newActivityHandler() {\n\
        this.setState({addingActivity: true});\n\
    },\n\
    deleteActivityHandler(activity) {\n\
        activityService.deleteItem(activity.activity_id).then(() => this.loadActivities(this.props.property.property_id));\n\
    },\n\
    cancelActivityHandler() {\n\
        this.setState({addingActivity: false});\n\
    },\n\
    saveActivityHandler(activity) {\n\
        activityService.createItem(activity).then(() => {\n\
            this.loadActivities(this.props.property.property_id);\n\
            this.setState({addingActivity: false});\n\
        });\n\
    },\n\
    render() {" + $.verbatim(q(render, entityName)) + "}\n\
});", entityName));
    }.bind(this));
}

function build(s, theme, ctx) {
    var t0 = s[0];
    t0.push(function (selector, $) {
        $.body.append(q("\
import React from 'react';\n\
", ctx));
    }.bind(this));
}

module.exports = {
  build: build,
};
