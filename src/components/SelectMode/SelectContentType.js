import React from 'react';
import {connect} from 'react-redux';
import Button from '../../../node_modules/@enact/goldstone/Button';
import {navigate, setFilterType} from '../../actions/deviceListActions';
import css from './SelectContentType.module.less';

const contentTypes = [ 'Photo', 'Video', ' Music'];

const SelectType = ({onNavigate, setFilter, sortType}) => {

    const select= (type) =>{
        setFilter(type , sortType)
        onNavigate('selectMode');
    }

    return (
        <div className={css.menu}>
            <h4 className={css.text}>Select the content type to play</h4>
            <div className={css.button_group}>
                {contentTypes.map((type) => {
                    return (
                        <Button size="small" className={css.button} value={type} onClick={() => select(type)}>{type}</Button>
                    )
                }
                )}
            </div>
        </div>
    )
}

const mapStateToProps = ({currentDeviceFileList, options}) => ({
    filteredList: currentDeviceFileList.filteredList,
    sortType: options.sortType
});

const SelectContentType = connect(
    mapStateToProps,
    {
        setFilter: setFilterType,
        onNavigate: navigate
    }
)(SelectType);

export default SelectContentType;
export {SelectType, SelectContentType};