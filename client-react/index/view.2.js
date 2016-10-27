/*
 * generator-xrm
 * https://github.com/BclEx/generator-xrm
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';
// jshint multistr: true

// External libs.
var _ = require('lodash');

function q(s, ctx) {
    var camelCase = _.camelCase(ctx.name);
    return s.replace(/\$\{Name\}/g, ctx.name)
        .replace(/\$\{name\}/g, camelCase)
        .replace(/\$\{names\}/g, camelCase + 's');
}

function build(s, theme, ctx) {
    // jshint validthis:true
    var t0 = s[0];
    t0.push(function (selector, $) {
        var layout = ctx.layouts['Main'];
        if (!layout) {
            ctx.missingLayout('Main', 'react-layout');
            return;
        }
        var h = [[]];
        //theme.buildLayout(h, layout.pack);
        var layoutHtml = 'Layout'; //h[0].join('');
        // console.log(layoutHtml);
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
                    <h1 style={title}>{this.props.entity.title}</h1>\n\
                    {this.props.entity.title}\n\
                </div>\n\
\n\
' + layoutHtml + '\
        </div>\n\
        <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">\n\
            <Tabs>\n\
                <div label="Activities">\n\
                    TAB 1\n\
                </div>\n\
                <div label="Gallery">\n\
                    TAB 2\n\
                </div>\n\
            </Tabs>\n\
        </div>\n\
        <div className="slds-col--padded slds-size--1-of-1">\n\
            <br/>\n\
            CARDS\n\
        </div>\n\
    </div>)';

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
                    <h1 style={title}>{this.props.entity.title}</h1>\n\
                    {this.props.entity.title}\n\
                </div>\n\
\n\
                <div className="slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-3 slds-m-top--medium">\n\
                    <dl className="page-header--rec-home__detail-item">\n\
                        <dt>\n\
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Sqft</p>\n\
                        </dt>\n\
                        <dd>\n\
                            <p className="slds-text-body--regular slds-truncate" title="">{this.props.entity.title}</p>\n\
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
                            <p className="slds-text-body--regular slds-truncate" title="">{this.props.entity.title}</p>\n\
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
                            <p className="slds-text-body--regular slds-truncate" title="">{this.props.entity.title}</p>\n\
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
            </div>\n\
        </div>\n\
        <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">\n\
            <Tabs>\n\
                <div label="Activities">\n\
                    TAB 1\n\
                </div>\n\
                <div label="Gallery">\n\
                    TAB 2\n\
                </div>\n\
            </Tabs>\n\
        </div>\n\
        <div className="slds-col--padded slds-size--1-of-1">\n\
            <br/>\n\
            CARDS\n\
        </div>\n\
    </div>)';
        $.body.append(q("\
import React from 'react';\n\
import Tabs from '../_components/Tabs';\n\
export default React.createClass({\n\
    render() {" + $.verbatim(q(render, ctx)) + "}\n\
});", ctx));
    }.bind(this));
}

module.exports = {
    build: build,
};
