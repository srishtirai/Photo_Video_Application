import React from 'react';
import {connect} from 'react-redux';
import Dropdown from '@enact/sandstone/Dropdown';
import {setFilterType} from '../../actions/deviceListActions';
import css from './FilterSelection.module.less';

const Filter = ({filterType, setFilter}) => {

    const dropList = ['All', 'Photo & Video', 'Photo', 'Video', 'Music'];
    const onSelect = (ev) => setFilter(ev.data);

    return (
        <Dropdown
			className={css.dropDown}
			defaultSelected={filterType !== 'All' ? filterType === 'Photo & Video' ? 1 : filterType === 'Photo' ? 2 : filterType === 'Video' ? 3 : 4 : 0}
			onSelect={onSelect}
			orientation='vertical'
		>
			{dropList}
		</Dropdown>
    );
};

const mapStateToProps = ({currentDeviceFileList}) => ({
    filterType: currentDeviceFileList.filterType
})

const FilterSelection = connect(
    mapStateToProps,
    {
		setFilter: setFilterType,
    }
)(Filter);

export default FilterSelection;