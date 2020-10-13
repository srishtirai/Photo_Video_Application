import React from 'react';
import {connect} from 'react-redux';
import {VirtualGridList} from '@enact/goldstone/VirtualList';
import ImageItem from '@enact/goldstone/ImageItem';
import ri from '@enact/ui/resolution';
import Scroller from '@enact/goldstone/Scroller/Scroller';

const GridList = ({deviceFileList, filteredList, filterType}) => {

	const renderItem = ({index}) => {

		let thumbPath  = filteredList[index].itemType==="image" ? filteredList[index].itemPath : filteredList[index].thumbnailUri;
		let encodedPath = encodeURIComponent(thumbPath);

		if (thumbPath && thumbPath.substring(0, 1) === '/') {
			encodedPath = 'file:///' + encodedPath;
		}
		return (
			<ImageItem
				src={thumbPath}
			>
				{deviceFileList[index].itemName}
			</ImageItem>
		);
	};

	return (
		<Scroller>
			<VirtualGridList
				direction='vertical'
				dataSize={filterType=="All"?deviceFileList.length:filteredList.length}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(500),
					minHeight: ri.scale(500)
				}}
			/>
		</Scroller>
	);
};

const mapStateToProps = ({currentDeviceFileList}) => ({
	deviceFileList: currentDeviceFileList.contentList,
	filteredList: currentDeviceFileList.filteredList,
	filterType: currentDeviceFileList.filterType
})

const FileGridList = connect(mapStateToProps, {})(GridList)
export default FileGridList;

