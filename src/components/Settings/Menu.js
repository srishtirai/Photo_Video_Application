import Group from '@enact/ui/Group';
import React from 'react';
import Icon from '@enact/goldstone/Icon';
import RadioButton from '@enact/goldstone/RadioButton';
import css from './Menu.module.less';

const Menu = ({heading, list, handleNavigate, handleSelect, handleClick, type, radioIndex}) => {

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
				{/* <div className={css.close}>
					<IconButton size="small" backgroundOpacity="transparent" onClick={closePopup}>
						arrowhookleft
					</IconButton>
				</div> */}
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
											{list[item].children.items[list[item].children.index].name}
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

export default Menu;
