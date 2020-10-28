import Group from '@enact/ui/Group';
import React from 'react';
import {connect} from 'react-redux';
import Icon from '@enact/goldstone/Icon';
import RadioButton from '@enact/goldstone/RadioButton';
import css from './Menu.module.less';

const MenuOption = ({heading, list, handleNavigate, handleSelect, handleClick, type, radioIndex, sortType, viewType}) => {

	const radioButtonGroup = ({selected, ...rest}) => (
		<RadioButton
			className={css.radio}
			selected={selected}
			{...rest}
		/>
	);

	return (
		<div className={css.menu}>
			<div className={css.header}>
				{
					heading &&
					<div className={css.mainHeader}>
						{heading}
					</div>
				}
			</div>
			<ul className={css.list}>
				{
					type === 'subMenu' &&
					Object.keys(list).map( (item, index) => (
						<React.Fragment key={`${index}-${item}`}>
							{
								list[item].type === 'subMenu' &&
								<li key={`${index}-${item}`} onClick={() => handleNavigate(item)}>
									<div className={css.leftContainer}>
										{list[item].name}
										<div className={css.subHeading}>
											{list[item].children.heading=== 'Sort'? sortType  : viewType}
										</div>
									</div>
									{
										list[item].type === 'subMenu' &&
										<div className={css.rightContainer}>
											<Icon size="small">
												arrowsmallright
											</Icon>
										</div>
									}
								</li>
							}
							{
										list[item].type === 'button' &&
										<li onClick={() => handleClick()}>
										<div className={css.leftContainer}>
											{list[item].name}
										</div>
										</li>
							}
						</React.Fragment>
					))
				}
				{
					type === 'radio' &&
					<Group
						childComponent={radioButtonGroup}
						itemProps={{inline: false}}
						select="radio"
						selectedProp="selected"
						selected={radioIndex}
						onSelect={handleSelect}
					>
					  {[...list.map( radioItem => radioItem.name)]}
					</Group>
				}
			</ul>
		</div>
	)
}

const mapStateToProps = ({options}) => ({
	sortType: options.sortType,
	viewType: options.viewType
})

const Menu = connect(
    mapStateToProps,
)(MenuOption);

export default Menu;
