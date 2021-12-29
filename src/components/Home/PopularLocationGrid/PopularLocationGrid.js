import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocationGrid.css';
import {
    Grid,
    Row
} from 'react-bootstrap';
import cx from 'classnames';

// Locale
import Loader from '../../Loader/Loader';
import PopularLocationGridItem from '../PopularLocationGridItem';
import { injectIntl } from 'react-intl';

class PopularLocationGrid extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
    };
    constructor(props) {
        super(props);
        this.state = {
            load: true
        };
    }

    componentDidUpdate(prevProps) {
        const { locale } = this.props.intl;
        const { locale: prevLocale } = prevProps.intl;

        if (locale !== prevLocale) {
            this.setState({
                load: false
            });
            clearTimeout(this.loadSync);
            this.loadSync = null;
            this.loadSync = setTimeout(() => {
                this.setState({
                    load: true
                })
            }, 450);
        }
    }

    render() {
        const { load } = this.state;
        const { loading, data } = this.props;

        if (loading || !load) {
            return <Loader type={"text"} />
        } else {
            return (
                <Grid fluid>
                    <Row className={cx(s.GridCollapse, 'GridCollapseAr')}>
                        {
                            data && data.length > 0 && data.map((item, index) => {
                                if (item.isEnable == 'true') {
                                    let path = index == 2 ? '/images/popularLocation/' + item.image : '/images/popularLocation/small_' + item.image;
                                    return <PopularLocationGridItem id={item.id} location={item.location} image={item.image} locationAddress={item.locationAddress} key={index} path={path} />;
                                }
                            })
                        }
                    </Row>
                </Grid>
            );
        }
    }
}

export default injectIntl(withStyles(s)(PopularLocationGrid));
