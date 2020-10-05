import React from 'react';
import SvgGridList from '@enact/goldstone/SVGGridList/components/GridList/GridList';
import ItemImageBase from '@enact/goldstone/SVGGridList/components/ItemImage/ItemImage';
import ri from '@enact/ui/resolution';

import folder from '../../../Assets/Thumbnails/folder.png';
import css from './GridList.module.less';

const GridList = ({currentList, filterType}) => {
    const items = [];

    const updateDataSize = (dataLength) => {
		let count = 0;
		for (let i = 0; i < dataLength ; i++) {
			let source = "";
			if(currentList[i].itemType === "folder"){
				source = currentList[i].thumbnailUri !== "" ? currentList[i].thumbnailUri : folder;
				items.push({ source });
				count++;
			}
		}
		for (let i = 0; i < dataLength ; i++) {
			let source = "",
				itemType = currentList[i].itemType,
				path = currentList[i].itemPath,
				thumbnail = currentList[i].thumbnailUri;

			if(filterType === "All" || filterType === "Photo" || filterType === "Photo & Video"){
				if(itemType === "image"){
					source = path;
				}
			}
			if(filterType === "All" || filterType === "Video" || filterType === "Photo & Video"){
				if(itemType === "video"){
					source = thumbnail;
				}
			}
			if(filterType === "All" || filterType === "Music"){
				if(itemType === "audio"){
					source = thumbnail;
				}
			}
			if(source !== ""){
				items.push({ source });
				count++;
			}
		}
		return count;
	};

	const renderItem = ({ index, ...rest }) => {
		const { source } = items[index];
		return (
			<ItemImageBase {...rest}  src={source} key={index}/>
		);
    };

    return(
        <SvgGridList
			className={css.grid}
			dataSize={updateDataSize(currentList.length)}
			direction='vertical'
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(280),
				minHeight: ri.scale(300)
			}}
			spacing={ri.scale(120)}
		/>
	);
};

export default GridList;