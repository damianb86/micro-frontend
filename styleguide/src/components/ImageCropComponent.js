import React from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import PropTypes from 'prop-types';
import 'react-image-crop/dist/ReactCrop.css';

export default class ImageCropComponent extends React.Component {
  state = {
    crop: {}
  };

  convertToPixel = (sizeInPerc, originalSizeInPixel) => parseInt(originalSizeInPixel * sizeInPerc / 100, 10);
  convertToPerc = (sizeInPixel, originalSizeInPixel, ratio) => sizeInPixel * 100 / originalSizeInPixel;
  onChange = crop => this.setState({ crop });

  onImageLoaded = image => {
    let cropDimension;

    if (this.props.cropData) {
      const cropData = this.props.cropData;
      cropDimension = {
        x: this.convertToPerc(cropData.x, image.naturalWidth),
        y: this.convertToPerc(cropData.y, image.naturalHeight),
        width: this.convertToPerc(cropData.width, image.naturalWidth),
        aspect: 1
      };
    } else {
      cropDimension = {
        x: 0,
        y: 0,
        width: Math.min(image.width, image.height),
        aspect: 1
      };
    }

    const crop = makeAspectCrop(cropDimension, image.width / image.height);
    const pixelCrop = {
      x: Math.round(image.naturalWidth * (crop.x / 100)),
      y: Math.round(image.naturalHeight * (crop.y / 100)),
      width: Math.round(image.naturalWidth * (crop.width / 100)),
      height: Math.round(image.naturalHeight * (crop.height / 100))
    };

    this.setState({ crop });
    this.props.onComplete(crop, pixelCrop);
  };

  render() {
    if (!this.props.url) return null;

    return (
      <ReactCrop
        src={this.props.url}
        crop={this.state.crop}
        onImageLoaded={this.onImageLoaded}
        onChange={this.onChange}
        onComplete={this.props.onComplete}
      />
    );
  }
}

ImageCropComponent.propTypes = {
  onComplete: PropTypes.func
};
