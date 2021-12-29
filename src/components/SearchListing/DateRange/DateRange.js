import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import cx from 'classnames';

import { DayPickerRangeController, isInclusivelyAfterDay } from 'react-dates';

import { START_DATE, END_DATE } from 'react-dates/constants';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

// Translation
import { injectIntl } from 'react-intl';

import { formValueSelector } from 'redux-form';
// Local
import { isRTL } from '../../../helpers/formatLocale';

class DateRange extends React.Component {
    static propTypes = {
        onChange: PropTypes.any.isRequired,
        numberOfMonths: PropTypes.number.isRequired,
        setPersonalizedValues: PropTypes.any.isRequired,
        formatMessage: PropTypes.any,
        personalized: PropTypes.shape({
            startDate: PropTypes.string,
            endDate: PropTypes.string
        })
    };

    static defaultProps = {
        autoFocusEndDate: false,
        showInputs: false,
        keepOpenOnDateSelect: false,
        initialVisibleMonth: null,
        hideKeyboardShortcutsPanel: true,
        noBorder: true,
        startDateOffset: undefined,
        endDateOffset: undefined,
        renderCalendarDay: undefined,
        renderDayContents: null,
        minimumNights: 0,
        smallDevice: false,
        verySmallDevice: false
    };

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null, //props.autoFocusEndDate ? END_DATE : START_DATE,
            startDate: null,
            endDate: null,
            load: true
        };
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.reloadDatePicker = this.reloadDatePicker.bind(this);
    }

    componentDidMount() {
        const { personalized } = this.props;
        if (personalized != undefined) {
            if (personalized.startDate && personalized.endDate) {
                this.setState({
                    startDate: moment(personalized.startDate),
                    endDate: moment(personalized.endDate)
                });
            } else if (personalized.startDate && !personalized.endDate) {
                this.setState({
                    startDate: moment(personalized.startDate),
                    endDate: null
                });
            }
        }
        this.reloadDatePicker();
    }

    componentWillReceiveProps(nextProps) {
        const { personalized, datesValue } = nextProps;
        if (personalized != undefined) {
            if (personalized.startDate && personalized.endDate) {
                this.setState({
                    startDate: moment(personalized.startDate),
                    endDate: moment(personalized.endDate)
                });
            } else if (datesValue === null && personalized.startDate != null
                && personalized.endDate === null) {
                this.setState({
                    startDate: moment(personalized.startDate),
                    endDate: null
                });
            } else if (datesValue === null && personalized.startDate === null
                && personalized.endDate === null) {
                this.setState({
                    startDate: null,
                    endDate: null
                });
            }
        }
    }

    reloadDatePicker() {
        const { autoFocusEndDate } = this.props;
        clearTimeout(this.loadSync);
        this.loadSync = null;
        this.loadSync = setTimeout(() => {
            this.setState({
                focusedInput: autoFocusEndDate ? END_DATE : START_DATE
            });
        }, 0);
    }

    onDatesChange({ startDate, endDate }) {
        const { onChange, setPersonalizedValues } = this.props;
        this.setState({ startDate, endDate });

        if (startDate != null) {
            setPersonalizedValues({ name: 'startDate', value: moment(startDate).format("YYYY-MM-DD") });
        } else {
            setPersonalizedValues({ name: 'startDate', value: null });
        }

        if (endDate != null) {
            setPersonalizedValues({ name: 'endDate', value: moment(endDate).format("YYYY-MM-DD") });
        } else {
            setPersonalizedValues({ name: 'endDate', value: null });
        }

        if (startDate != null && endDate != null) {
            onChange(`'${moment(startDate).format("YYYY-MM-DD")}' AND '${moment(endDate).format("YYYY-MM-DD")}'`);
        }
    }

    onFocusChange(focusedInput) {
        this.setState({
            // Force the focusedInput to always be truthy so that dates are always selectable
            focusedInput: !focusedInput ? START_DATE : focusedInput,
        });
    }

    render() {
        const { focusedInput, startDate, endDate, load } = this.state;
        const { numberOfMonths, smallDevice, verySmallDevice, locale } = this.props;
        const { formatMessage } = this.props.intl;
        let daySize = (verySmallDevice) ? 35 : 60;
        let verticalHeight = (verySmallDevice) ? '70vh' : '80vh';
        let today = moment(), condition = null;
        condition = day => !isInclusivelyAfterDay(day, today);

        return (
            <div>
                {
                    !smallDevice && load && <DayPickerRangeController
                        {...this.props}
                        focusedInput={focusedInput}
                        startDate={(startDate) ? moment(startDate) : null}
                        endDate={(endDate) ? moment(endDate) : null}
                        onDatesChange={this.onDatesChange}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={numberOfMonths}
                        isOutsideRange={condition}
                        minimumNights={1}
                        onOutsideClick={() => { console.log('') }}
                        transitionDuration={0}
                        anchorDirection={isRTL(locale) ? 'right' : 'left'}
                        isRTL={isRTL(locale)}
                        initialVisibleMonth={() => startDate || moment()}
                    />
                }
                {
                    smallDevice && load && <div className={cx('dateRangeSmall')}>
                        <DayPickerRangeController
                            {...this.props}
                            focusedInput={focusedInput}
                            startDate={(startDate) ? moment(startDate) : null}
                            endDate={(endDate) ? moment(endDate) : null}
                            onDatesChange={this.onDatesChange}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={condition}
                            onOutsideClick={() => { console.log('') }}
                            transitionDuration={0}
                            anchorDirection={isRTL(locale) ? 'right' : 'left'}
                            isRTL={isRTL(locale)}
                            initialVisibleMonth={() => startDate || moment()}
                        />
                    </div>
                }
            </div>
        );
    }
}


const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
    personalized: state.personalized,
    datesValue: selector(state, 'dates'),
    locale: state.intl.locale
});

const mapDispatch = {
    setPersonalizedValues
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DateRange)));

