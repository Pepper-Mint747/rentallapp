import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';
import bt from '../../components/commonStyle.css';

// Components
import Link from '../Link';
import Loader from '../Loader';
import Avatar from '../Avatar';

// Locale
import messages from '../../locale/messages';

class WriteReviews extends React.Component {

	static propTypes = {
		pendingData: PropTypes.shape({
			loading: PropTypes.bool,
			pendingReviews: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.number,
				listId: PropTypes.number,
				hostId: PropTypes.string,
				guestId: PropTypes.string,
				hostData: PropTypes.shape({
					firstName: PropTypes.string,
					lastName: PropTypes.string,
					picture: PropTypes.string,
					profileId: PropTypes.number,
				}),
				guestData: PropTypes.shape({
					firstName: PropTypes.string,
					lastName: PropTypes.string,
					picture: PropTypes.string,
					profileId: PropTypes.number,
				}),
			}))
		}),
		userId: PropTypes.string,
		formatMessage: PropTypes.any,
	};

	render() {
		const { data: { loading, pendingReviews }, userId } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<div>
				<Panel className={s.panelNolist}>
					<div>
						<h3 className={bt.listingTitleText}>{formatMessage(messages.reviewToWrite)} </h3>
					</div>
					{
						loading && <Loader type={"text"} />
					}
					{
						!loading && (!pendingReviews || (pendingReviews &&
							pendingReviews.length === 0)) && <p>
							<FormattedMessage {...messages.reviewContent} />
						</p>
					}
					{
						!loading && pendingReviews && <div>
							{
								pendingReviews.map((item, index) => {
									let isHost = false;
									if (userId === item.hostId) {
										isHost = true;
									}
									let userLink = "/users/show/";
									if (item.guestData && item.hostData && item.listData) {
										let hostDetails = isHost ? item.guestData.profileId : item.hostData.profileId;
										return (
											<ul className={cx(s.listStyle, s.spaceTop4, s.mediaDisplay, 'listLayoutArbic')}>
												<li>
													<div className={s.displayTable}>
														<div className={s.displayTableRow}>
															<div className={cx(s.displayTableCell, s.LeftBg)}>
																<div className={cx(s.mediaContainer, s.textCenter, s.pullLeft, 'reviewsId')} >
																	<Avatar
																		source={isHost ? item.guestData.picture : item.hostData.picture}
																		height={68}
																		width={68}
																		title={isHost ? item.guestData.firstName : item.hostData.firstName}
																		className={s.profileAvatar}
																		withLink
																		linkClassName={s.profileAvatarLink}
																		profileId={isHost ? item.guestData.profileId : item.hostData.profileId}
																	/>

																</div>
															</div>
															<div className={cx(s.displayTableCell, s.rightBg, 'dashRightBg')}>
																<div className={cx(s.mediaDisplayCell, s.textAlignCenter)}>
																	<p><FormattedMessage {...messages.submitReviewFor} /> <Link to={userLink + hostDetails}>
																		{isHost ? item.guestData.firstName : item.hostData.firstName}
																		{' '}{isHost ? item.guestData.lastName : item.hostData.lastName}
																	</Link> </p>
																	<Link to={"/review/write/" + item.id}><FormattedMessage {...messages.writeReview} /></Link><br />
																	<Link to={"/users/trips/itinerary/" + item.id}>
																		<FormattedMessage {...messages.viewLitneray} />
																	</Link>
																</div>
															</div>
														</div>
													</div>
												</li>
											</ul>
										);
									}
								})
							}
						</div>
					}
				</Panel>
			</div>
		);
	}
}

const mapState = (state) => ({
	userId: state.account && state.account.data && state.account.data.userId,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(WriteReviews)));