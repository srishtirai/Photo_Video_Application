import React from 'react';
import Dropdown from '@enact/sandstone/Dropdown';
import css from './Filter.module.less';

const Filter = ({filterType, setFilter}) => {
    const dropList=['All', 'Photo & Video', 'Photo', 'Video', 'Music'];

    return (
        <Dropdown
				className={css.drop}
				defaultSelected={filterType !== 'All' ? filterType === 'Photo & Video' ? 1 : filterType === 'Photo' ? 2 : filterType === 'Video' ? 3 : 4 : 0}
				onSelect={(ev) => setFilter(ev.data)}
				orientation='vertical'
		>
			{dropList}
		</Dropdown>
	);
};

export default Filter;