import React from 'react';
import SvgGridList from '@enact/goldstone/SVGGridList/components/GridList/GridList';
import ItemImageBase from '@enact/goldstone/SVGGridList/components/ItemImage/ItemImage';
import ri from '@enact/ui/resolution';

import folder from '../../../Assets/Thumbnails/folder.png';
import css from './GridList.module.less';

const Filter = ({currentList, filterType}) => {
    const items = [];

    const updateDataSize = (dataLength) => {
		let count = 0;
		for (let i = 0; i < dataLength ; i++) {
			let source = "";
			if(currentList[i].itemType === "folder"){
				if(currentList[i].thumbnailUri !== ""){
					source = currentList[i].thumbnailUri;
				}else{
					source = folder;
				}
				items.push({ source });
				count++;
			}
		}
		for (let i = 0; i < dataLength ; i++) {
			let source = "";
			if(filterType === "Photo" || filterType === "Photo & Video" ||filterType === "All"){
				if(currentList[i].itemType === "image"){
					source = currentList[i].itemPath;
					items.push({ source });
					count++;
				}
			}
			if(filterType === "Video" || filterType === "Photo & Video" || filterType === "All"){
				if(currentList[i].itemType === "video"){
					source = currentList[i].thumbnailUri;
					items.push({ source });
					count++;
				}
			}
			if(filterType === "Music" || filterType === "All"){
				if(currentList[i].itemType === "audio"){
					source = currentList[i].thumbnailUri;
					items.push({ source });
					count++;
				}
			}
		}
		return count;
	};

	const renderItem = ({ index, ...rest }) => {
		const { source } = items[index];

		return (
			<ItemImageBase {...rest}  src={source} />
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

export default Filter;