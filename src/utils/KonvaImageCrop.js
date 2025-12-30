import Konva from 'konva';
import { EffectEvent } from './EffectEvent';

(function (Konva) {
    'use strict';

    /**
     * Performs QR decomposition on a 2D transformation matrix.
     * @param {Array} a - The transformation matrix.
     * @returns {Object} - The decomposed transformation properties.
     */
    function qrDecompose(a) {
        let angle = Math.atan2(a[1], a[0]),
            denom = Math.pow(a[0], 2) + Math.pow(a[1], 2),
            scaleX = Math.sqrt(denom),
            scaleY = (a[0] * a[3] - a[2] * a[1]) / scaleX;
        return { rotation: angle / (Math.PI / 180), scaleX, scaleY, x: a[4], y: a[5] };
    }

    /**
     * Calculates the coordinates of an object relative to a group.
     * @param {Konva.Node} object - The object to calculate coordinates for.
     * @param {Konva.Group} group - The group to which the coordinates are relative.
     * @returns {Object} - The decomposed transformation properties.
     */
    function getGroupCoords(object, group) {
        let mB = object.getAbsoluteTransform().getMatrix();
        let mX = group.getAbsoluteTransform().getMatrix();

        let M = mB[0], N = mB[1], O = mB[2], P = mB[3], R = mB[4], S = mB[5],
            A = mX[0], B = mX[1], C = mX[2], D = mX[3], E = mX[4], F = mX[5],
            AD = A * D, BC = B * C,
            G = (C * N - M * D) / (BC - AD),
            H = (A * N - M * B) / (AD - BC),
            I = (C * P - O * D) / (BC - AD),
            J = (A * P - O * B) / (AD - BC),
            K = (C * (S - F) + D * (E - R)) / (BC - AD),
            L = (A * (S - F) + B * (E - R)) / (AD - BC);

        let matrix = [G, H, I, J, K, L];
        return qrDecompose(matrix);
    }

    /**
     * Sets the crop transform for the image.
     * @param {Object} value - The crop transform properties.
     */
    Konva.Image.prototype.setCropTransform = function (value) {
        if (value === false) {
            delete this._cropElement;
            return;
        }
        if (!this._cropElement) {
            this._cropElement = new Konva.Shape();
        }
        this._cropElement.setAttrs(value);
        this._cropElement.setAttrs({ offsetX: 0, offsetY: 0 });
    };

    /**
     * Gets the crop transform for the image.
     * @returns {Object} - The crop transform properties.
     */
    Konva.Image.prototype.getCropTransform = function () {
        return this._cropElement && this._cropElement.getAttrs();
    };

    /**
     * Sets or gets the crop transform for the image.
     * @param {Object} value - The crop transform properties.
     * @returns {Object} - The crop transform properties.
     */
    Konva.Image.prototype.cropTransform = function (value) {
        if (value) {
            this.setCropTransform(value);
        } else {
            return this.getCropTransform();
        }
    };

    /**
     * in this function work as constructer when image load to get data from image
     * and then set crop data to image
     * @param {Object} data - The crop transform properties.
     * @returns {Object} - The crop transform properties.
     **/
    Konva.Image.prototype.cropDataManage = function () {
        this.cropStart();
        this.cropEnd();
    };

    Konva.Image.prototype.cropStart = function () {
        const layer = this.getLayer();
        if (!layer) return;

        // Clear any existing transformers
        layer.children.forEach(child => {
            if (child instanceof Konva.Transformer) {
                child.detach();
                child.destroy();
            }
        });

        if (this.cropImage) return;
        if (!this._cropElement) {
            this.cropTransform({
                x: 0,
                y: 0,
                width: this.width(),
                height: this.height(),
                rotation: 0,
            });
        }

        // Disable dragging on the main image during cropping
        this.draggable(false);

        const transform = this.getAbsoluteTransform(),
            transform2 = this._cropElement.getAbsoluteTransform(),
            transform0 = layer.getAbsoluteTransform(),
            options = qrDecompose(transform0.copy().invert().multiply(transform).multiply(transform2).getMatrix());

        // Create the crop image
        this.cropImage = new Konva.Image({
            stroke: this.stroke(),
            strokeWidth: this.strokeWidth(),
            image: this.image(),
            opacity: 1, // Fully visible crop image
            draggable: true,
        });
        this.cropImage.isCroppingElement = true;

        this.cropImage.setAttrs(options);
        this.cropImage.setAttrs({
            width: this._cropElement.width(),
            height: this._cropElement.height(),
        });

        // Add crop image to the layer
        layer.add(this.cropImage);

        // Create the overlay with a cutout
        const stage = this.getStage();
        const stageWidth = stage.width();
        const stageHeight = stage.height();

        this.cropBackground = new Konva.Rect({
            x: 0,
            y: 0,
            width: layer.width(),
            height: layer.height(),
            fill: '#dedede9c', // Semi-transparent gray
        });

        // Add background rectangle to the layer
        layer.add(this.cropBackground);

        // Add transformers
        this.cropImageTransformer = new Konva.Transformer({
            rotateEnabled: false,
            borderDash: [5, 5],
            anchorSize: 21,
            anchorCornerRadius: 11,
            anchorFill: "#ffffff",
            borderStroke: "#8B5CF6",
            borderStrokeWidth: 2,
            anchorStroke: "#8B5CF6",
            enabledAnchors: ['top-left', 'top-right', 'bottom-right', 'bottom-left']
        }).attachTo(this.cropImage);

        this.transformer = new Konva.Transformer({
            anchorFill: "#ffffff",
            borderStroke: "#8B5CF6",
            borderStrokeWidth: 2,
            anchorStroke: "#8B5CF6",
            rotateEnabled: false,
        }).attachTo(this);
        layer.add(this.cropImageTransformer, this.transformer);

        // Ensure transformers are above everything
        this.cropBackground.moveToTop(); // Ensure it stays below everything
        this.cropImage.moveToTop();
        this.cropImageTransformer.moveToTop();
        this.transformer.moveToTop();
        // Bind update functions
        this.cropUpdateBinded = this.cropUpdate.bind(this);
        this.resizAndCropUpdateBinded = function () {
            this.resize();
            this.cropUpdate();
        }.bind(this);

        this.resize();
        this.cropUpdate();

        // Update overlay when crop image is moved or transformed
        this.cropImage.on('dragmove transform', () => {
            this.cropBackground.draw(); // Redraw overlay to match new crop position/size
            layer.batchDraw();
        });

        this.cropImage.on('dragmove', this.cropUpdateBinded);
        this.cropImage.on('transform', this.cropUpdateBinded);
        this.on('dragmove', this.cropUpdateBinded);
        this.on('transform', this.resizAndCropUpdateBinded);

        layer.batchDraw();
    };

    /**
     * Ends the cropping process for the image.
     */
    Konva.Image.prototype.cropEnd = function () {
        if (this.cropImage) {
            if (this.transformer) {
                this.transformer.detach();
                this.transformer.destroy();
                delete this.transformer;
            }
            if (this.cropImageTransformer) {
                this.cropImageTransformer.detach();
                this.cropImageTransformer.destroy();
                delete this.cropImageTransformer;
            }
            this.cropImage.off('dragmove', this.cropUpdateBinded);
            this.cropImage.off('transform', this.cropUpdateBinded);
            this.off('dragmove', this.cropUpdateBinded);
            this.off('transform', this.resizAndCropUpdateBinded);
            if (this.cropImage.getParent()) {
                this.cropImage.remove();
            }
            delete this.cropImage;

            // Remove overlay and its event listener
            if (this.cropBackground) {
                this.cropBackground.off('click tap'); // Clean up event listener
                this.cropBackground.remove();
                delete this.cropBackground;
            }
            if (this.getStage()) {
                this.getStage().off('click tap'); // Clean up event listener
            }
            if (this._cropElement) {
                this.attrs.cropImage = this._cropElement;
            }
            const layer = this.getLayer();
            if (layer) {
                layer.batchDraw();
            }
        }
    };

    /**
     * Updates the crop transform based on the current crop image position and size.
     */
    Konva.Image.prototype.cropUpdate = function () {
        if (this.cropImage) {
            let options = getGroupCoords(this.cropImage, this);
            this.cropTransform(options);
            const layer = this.getLayer();
            if (layer) {
                // Re-apply effects after crop update
                EffectEvent(this.attrs, this); // Assuming attrs contains shape data
                layer.batchDraw();
            }
        }
    };

    /**
     * Resets the image to its original size.
     */
    Konva.Image.prototype.resize = function () {
        this.setAttrs({
            scaleX: 1,
            scaleY: 1,
            width: this.width() * this.scaleX(),
            height: this.height() * this.scaleY(),
        });
    };

    /**
     * Resets the crop transform for the image.
     */
    Konva.Image.prototype.cropReset = function () {
        if (this.cropImage) {
            this.cropEnd();
        }
        this.setCropTransform(false);
        const layer = this.getLayer();
        if (layer) {
            layer.batchDraw();
        }
    };

    /**
     * Custom scene function for rendering the image with cropping.
     * @param {CanvasRenderingContext2D} context - The canvas rendering context.
     */
    Konva.Image.prototype._sceneFunc = function (context) {
        let width = this.width(),
            height = this.height(),
            image = this.image(),
            cropWidth,
            cropHeight,
            params;

        context.save();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.clip();
        if (this.hasFill() || this.hasStroke()) {
            context.fillStrokeShape(this);
        }

        if (image) {
            if (this._cropElement) {
                context.save();
                width = this._cropElement.width();
                height = this._cropElement.height();
                let transform = this._cropElement.getAbsoluteTransform();
                let m = transform.getMatrix();
                context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            }

            cropWidth = this.cropWidth();
            cropHeight = this.cropHeight();
            if (cropWidth && cropHeight) {
                params = [image, this.cropX(), this.cropY(), cropWidth, cropHeight, 0, 0, width, height];
            } else {
                params = [image, 0, 0, width, height];
            }

            context.drawImage.apply(context, params);

            if (this._cropElement) {
                context.restore();
            }
        }
        context.strokeShape(this);
        context.restore();
    };
})(Konva);
