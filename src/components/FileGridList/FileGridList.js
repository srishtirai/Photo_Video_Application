import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {VirtualGridList} from '@enact/goldstone/VirtualList';
import ImageItem from '@enact/goldstone/ImageItem';
import ri from '@enact/ui/resolution';
import {listFolderContents, listDevicePhotoList, navigate, setFilterType} from '../../actions/deviceListActions';
import {pushPanel, popPanel} from '../../actions/panelActions';
import folderImg from '../../../Assets/Thumbnails/folder.png';
import imageImg from '../../../Assets/Thumbnails/image.png';
import musicImg from '../../../Assets/Thumbnails/music.png';
import videoImg from '../../../Assets/Thumbnails/video.png';

const GridList = ({currentDevice, device, deviceFileList, deviceUri, getlistFolderContents, filteredList, listPhotoList, onNavigate, selectMode,  setFilter, sortType, panels, panelPop}) => {
	const [deviceFolderList, setDeviceFolderList] = useState([])

	useEffect(() => {
		if(selectMode === 'SelectPlay'){
			setDeviceFolderList(filteredList);
		}
		if (panels.length > 0) {
			setDeviceFolderList(panels[panels.length - 1])
		} else {
			if (Object.keys(deviceFileList).includes(device.deviceId)) {
				setDeviceFolderList(deviceFileList[device.deviceId][deviceUri])
			}
		}
	}, [deviceFileList, panels])

	const defaultIcon = {
		folder: folderImg,
		image: imageImg,
		video: videoImg,
		audio: musicImg
	}

	// const getScrollTo = (scrollTo) => {
	// 	scrollTo({animate: false, focus: true, index: 1})
	// }

	const getContentFileWithPath = (itemPath, itemType) => {
		if (itemType === 'image') {
			listPhotoList()
			onNavigate('photoPlayer')
		}

		if (itemType === 'goBack') {
			panelPop()
		}

		if (itemType === 'folder') {
			getlistFolderContents(currentDevice, itemPath)
			setFilter("All",sortType);
		}
	}

	const renderItem = ({index, ...rest}) => {
		let thumbPath = deviceFolderList[index].thumbnailUri
		let encodedPath = encodeURIComponent(thumbPath);

		if (thumbPath && thumbPath.substring(0, 1) === '/') {
			encodedPath = 'file:///' + encodedPath;
		}
		if (encodedPath === '' || deviceFolderList[index].itemType === 'audio') {
			encodedPath = defaultIcon[deviceFolderList[index].itemType]
		}

		return (
			<ImageItem
				{...rest}
				src={encodedPath}
				placeholder={imageImg}
				onClick={() => getContentFileWithPath(deviceFolderList[index].itemPath, deviceFolderList[index].itemType)}
			>
				{deviceFolderList[index].itemName}
			</ImageItem>
		);
	};

	return (
		deviceFolderList.length === 0 ?
		<h3>No Photo, Video or folders exist in storage device</h3 > :
		<VirtualGridList
			// cbScrollTo={(scrollTo) => getScrollTo(scrollTo)}
			direction='vertical'
			dataSize={deviceFolderList.length}
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(500),
				minHeight: ri.scale(500)
			}}
		/>
);
};

const mapStateToProps = ({currentDeviceFileList, devices, options, panels, path}) => ({
	filteredList: currentDeviceFileList.filteredList,
	currentDevice: devices.currentDevice,
	path,
	panels,
	sortType: options.sortType,
	selectMode: options.selectMode
});

const FileGridList = connect(mapStateToProps,
{
	getlistFolderContents: listFolderContents,
	onNavigate: navigate,
	setFilter: setFilterType,
	listPhotoList: listDevicePhotoList,
	pushPanel,
	panelPop: popPanel
}
)(GridList);

export default FileGridList;
