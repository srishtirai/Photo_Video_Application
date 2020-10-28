import React, {useEffect} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {VirtualGridList} from '@enact/goldstone/VirtualList';
import ImageItem from '@enact/goldstone/ImageItem';
import ri from '@enact/ui/resolution';
import Scroller from '@enact/goldstone/Scroller/Scroller';
import PhotoPlayer from '@enact/goldstone/PhotoPlayer/PhotoPlayer';
import {listPhotos} from '../../actions/photoViewerAction';

const GridList = ({filteredList, getImagesList, images}) => {

	useEffect(() => {
		getImagesList();
	})

	const selectItem = (index) =>{
		if(filteredList[index].itemType === "image"){
			render(
				<PhotoPlayer slides={images} slideDirection="left"/>,
				document.getElementById('root')
			);
		}
	}

	const renderItem = ({index}) => {

		let thumbPath  = filteredList[index].itemType==="image" ? filteredList[index].itemPath : filteredList[index].thumbnailUri;
		let encodedPath = encodeURIComponent(thumbPath);

		if (thumbPath && thumbPath.substring(0, 1) === '/') {
			encodedPath = 'file:///' + encodedPath;
		}
		return (
			<ImageItem
				src={thumbPath} onClick={()=>selectItem(index)}
				>
				{filteredList[index].itemName}
			</ImageItem>
		);
	};

	return (
		<Scroller>
			<VirtualGridList
				direction='vertical'
				dataSize={filteredList.length}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(500),
					minHeight: ri.scale(400)
				}}
				spacing={50}
			/>
		</Scroller>
	);
};

const mapStateToProps = ({currentDeviceFileList, imagesList}) => ({
	filteredList: currentDeviceFileList.filteredList,
	images: imagesList.images
})

const FileGridList = connect(
	mapStateToProps,
    {
		getImagesList: listPhotos
	})(GridList)

export default FileGridList;

