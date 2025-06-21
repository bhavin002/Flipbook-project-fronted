class IndexedDBCartService {
    constructor() {
        this.dbName = 'FlipbookCartDB';
        this.dbVersion = 1;
        this.storeName = 'cartStore';
        this.db = null;
        this.listeners = new Map(); // Store event listeners
    }

    // Initialize IndexedDB
    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                reject(new Error('Failed to open IndexedDB'));
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const objectStore = db.createObjectStore(this.storeName, { 
                        keyPath: 'flipbookId' 
                    });
                    objectStore.createIndex('flipbookId', 'flipbookId', { unique: true });
                }
            };
        });
    }

    // Ensure DB is initialized
    async ensureDB() {
        if (!this.db) {
            await this.initDB();
        }
    }

    // Emit event to all listeners
    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => callback(data));
        }
    }

    // Subscribe to an event
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
        return () => {
            this.listeners.get(event).delete(callback);
            if (this.listeners.get(event).size === 0) {
                this.listeners.delete(event);
            }
        };
    }

    // Get cart data for a specific flipbookId
    async getCart(flipbookId) {
        await this.ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.get(flipbookId);

            request.onsuccess = () => {
                const result = request.result;
                resolve(result ? result.cart : []);
            };

            request.onerror = () => {
                reject(new Error('Failed to get cart data'));
            };
        });
    }

    // Add or update product in cart
    async addToCart(flipbookId, productData) {
        await this.ensureDB();
        try {
            const result = await this._addToCart(flipbookId, productData);
            this.emit('cartUpdated', { flipbookId, cart: result.cart });
            return result;
        } catch (error) {
            throw new Error(`Failed to add product to cart: ${error.message}`);
        }
    }

    // Internal method for addToCart logic
    async _addToCart(flipbookId, productData) {
        const existingCart = await this.getCart(flipbookId);
        const newProduct = {
            productTitle: productData.productTitle,
            productImage: this.getFirstImage(productData),
            productPrice: this.getDiscountedPrice(productData),
            productQty: productData.quantity || 1,
            productId: productData.productId,
            productVariantId: productData.productVariantId || null,
            personalizationText: productData.personalizationText || null,
            addedAt: new Date().toISOString(),
        };

        const existingProductIndex = this.findExistingProduct(existingCart, newProduct);
        let updatedCart;
        if (existingProductIndex !== -1) {
            updatedCart = [...existingCart];
            updatedCart[existingProductIndex].productQty += newProduct.productQty;
            updatedCart[existingProductIndex].addedAt = new Date().toISOString();
        } else {
            updatedCart = [...existingCart, newProduct];
        }

        await this.saveCart(flipbookId, updatedCart);
        return {
            success: true,
            cart: updatedCart,
            action: existingProductIndex !== -1 ? 'updated' : 'added',
            product: newProduct,
        };
    }

    // Save cart data
    async saveCart(flipbookId, cart) {
        await this.ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const cartData = {
                flipbookId: flipbookId,
                cart: cart,
                updatedAt: new Date().toISOString(),
            };
            const request = objectStore.put(cartData);

            request.onsuccess = () => {
                resolve(cartData);
            };

            request.onerror = () => {
                reject(new Error('Failed to save cart data'));
            };
        });
    }

    // Update product quantity
    async updateProductQuantity(flipbookId, productIdentifier, newQuantity) {
        await this.ensureDB();
        try {
            const result = await this._updateProductQuantity(flipbookId, productIdentifier, newQuantity);
            this.emit('cartUpdated', { flipbookId, cart: result.cart });
            return result;
        } catch (error) {
            throw new Error(`Failed to update product quantity: ${error.message}`);
        }
    }

    // Internal method for updateProductQuantity logic
    async _updateProductQuantity(flipbookId, productIdentifier, newQuantity) {
        const existingCart = await this.getCart(flipbookId);
        const productIndex = this.findExistingProductByIdentifier(existingCart, productIdentifier);

        if (productIndex === -1) {
            throw new Error('Product not found in cart');
        }

        const updatedCart = [...existingCart];
        if (newQuantity <= 0) {
            updatedCart.splice(productIndex, 1);
        } else {
            updatedCart[productIndex].productQty = newQuantity;
            updatedCart[productIndex].addedAt = new Date().toISOString();
        }

        await this.saveCart(flipbookId, updatedCart);
        return {
            success: true,
            cart: updatedCart,
            action: newQuantity <= 0 ? 'removed' : 'updated',
        };
    }

    // Remove product from cart
    async removeFromCart(flipbookId, productIdentifier) {
        const result = await this.updateProductQuantity(flipbookId, productIdentifier, 0);
        this.emit('cartUpdated', { flipbookId, cart: result.cart });
        return result;
    }

    // Clear entire cart
    async clearCart(flipbookId) {
        await this.ensureDB();
        try {
            await this.saveCart(flipbookId, []);
            this.emit('cartUpdated', { flipbookId, cart: [] });
            return {
                success: true,
                cart: [],
                action: 'cleared',
            };
        } catch (error) {
            throw new Error(`Failed to clear cart: ${error.message}`);
        }
    }

    // Get cart totals
    async getCartTotals(flipbookId) {
        const cart = await this.getCart(flipbookId);
        const totalItems = cart.reduce((sum, item) => sum + item.productQty, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.productPrice * item.productQty), 0);
        return {
            totalItems,
            totalPrice,
            itemCount: cart.length,
        };
    }

    // Helper method to find existing product in cart
    findExistingProduct(cart, newProduct) {
        return cart.findIndex(item => {
            if (newProduct.productVariantId) {
                return item.productVariantId === newProduct.productVariantId;
            }
            return item.productId === newProduct.productId && !item.productVariantId;
        });
    }

    // Helper method to find product by identifier
    findExistingProductByIdentifier(cart, identifier) {
        return cart.findIndex(item => {
            if (identifier.productVariantId) {
                return item.productVariantId === identifier.productVariantId;
            }
            return item.productId === identifier.productId && !item.productVariantId;
        });
    }

    // Helper method to get first image
    getFirstImage(productData) {
        if (productData.productImage) {
            return productData.productImage;
        }
        if (productData.images && productData.images.length > 0) {
            return productData.images[0].imageLink;
        }
        return null;
    }

    // Helper method to get discounted price
    getDiscountedPrice(productData) {
        if (productData.currentPrice) {
            return productData.currentPrice.discountPrice !== null 
                ? productData.currentPrice.discountPrice 
                : productData.currentPrice.price;
        }
        if (productData.discountPrice !== null && productData.discountPrice !== undefined) {
            return productData.discountPrice;
        }
        return productData.price || 0;
    }

    // Get all carts (for debugging or admin purposes)
    async getAllCarts() {
        await this.ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(new Error('Failed to get all carts'));
            };
        });
    }

    // Delete specific cart
    async deleteCart(flipbookId) {
        await this.ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.delete(flipbookId);

            request.onsuccess = () => {
                resolve({ success: true, flipbookId });
            };

            request.onerror = () => {
                reject(new Error('Failed to delete cart'));
            };
        });
    }
}

const cartService = new IndexedDBCartService();
export default cartService;