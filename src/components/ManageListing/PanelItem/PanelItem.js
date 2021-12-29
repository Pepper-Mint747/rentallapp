import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { Panel } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PanelItem.css';
import cx from 'classnames';

// Component
import ListItem from '../ListItem';

class PanelItem extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        panelTitle: PropTypes.object.isRequired
    };

    render() {
        const { data, panelTitle } = this.props;

        return (
            <div className={cx('manageListingItem')}>
                <Panel className={s.panelHeader} header={panelTitle}>
                    <ul className={cx(s.listContainer, 'listLayoutArbic')}>
                        {
                            data.map((item, index) => {
                                return (
                                    <ListItem data={item} key={index} />
                                )
                            })
                        }
                    </ul>
                </Panel>
            </div>
        )
    }
}

export default withStyles(s)(PanelItem);
