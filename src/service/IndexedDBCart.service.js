import { v4 as uuid } from "uuid";

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
                resolve(result ? result.cartItems : []);
            };

            request.onerror = () => {
                reject(new Error('Failed to get cart data'));
            };
        });
    }

    // Add or update product in cart (always adds new item)
    async addToCart(flipbookId, productData) {
        await this.ensureDB();
        try {
            const result = await this._addToCart(flipbookId, productData);
            this.emit('cartUpdated', { flipbookId, cart: result.cartItems });
            return result;
        } catch (error) {
            throw new Error(`Failed to add product to cart: ${error.message}`);
        }
    }

    // Internal method for addToCart logic (always adds new item)
    async _addToCart(flipbookId, productData) {
        const existingCartItems = await this.getCart(flipbookId);

        console.log("productData.paidPersonalization ????", productData.paidPersonalization);
        
        const newCartItem = {
            cartId: uuid(), // Generate unique cart ID
            productTitle: productData.productTitle,
            productImage: this.getFirstImage(productData),
            productPrice: this.getDiscountedPrice(productData),
            productQty: productData.quantity || 1,
            productId: productData.productId,
            productVariantId: productData.productVariantId || null,
            minQuantity: productData.minQuantity || null,
            maxQuantity: productData.maxQuantity || null,
            restrictToMoqMultiples: productData.restrictToMoqMultiples || null,
            instructionMessage: productData.instructionMessage || null,
            paidPersonalization: productData.paidPersonalization || false,
            personalizationPrice: productData.personalizationPrice || null,
            pricingMethod: productData.pricingMethod || null,
            personalizationText: productData.personalizationText || null,
            addedAt: new Date().toISOString(),
        };

        // Always add as new item
        const updatedCartItems = [...existingCartItems, newCartItem];
        const action = 'added';

        await this.saveCart(flipbookId, updatedCartItems);
        return {
            success: true,
            cartItems: updatedCartItems,
            action: action,
            product: newCartItem,
        };
    }

    // Save cart data
    async saveCart(flipbookId, cartItems) {
        await this.ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const cartData = {
                flipbookId: flipbookId,
                cartItems: cartItems, // Changed from 'cart' to 'cartItems'
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

    // Update product quantity by cartId
    async updateProductQuantityByCartId(flipbookId, cartId, newQuantity) {
        await this.ensureDB();
        try {
            const result = await this._updateProductQuantityByCartId(flipbookId, cartId, newQuantity);
            this.emit('cartUpdated', { flipbookId, cart: result.cartItems });
            return result;
        } catch (error) {
            throw new Error(`Failed to update product quantity: ${error.message}`);
        }
    }

    // Internal method for updateProductQuantityByCartId logic
    async _updateProductQuantityByCartId(flipbookId, cartId, newQuantity) {
        const existingCartItems = await this.getCart(flipbookId);
        const itemIndex = existingCartItems.findIndex(item => item.cartId === cartId);

        if (itemIndex === -1) {
            throw new Error('Cart item not found');
        }

        const updatedCartItems = [...existingCartItems];
        if (newQuantity <= 0) {
            updatedCartItems.splice(itemIndex, 1);
        } else {
            updatedCartItems[itemIndex].productQty = newQuantity;
            updatedCartItems[itemIndex].addedAt = new Date().toISOString();
        }

        await this.saveCart(flipbookId, updatedCartItems);
        return {
            success: true,
            cartItems: updatedCartItems,
            action: newQuantity <= 0 ? 'removed' : 'updated',
        };
    }

    // Remove cart item by cartId
    async removeFromCartByCartId(flipbookId, cartId) {
        const result = await this.updateProductQuantityByCartId(flipbookId, cartId, 0);
        this.emit('cartUpdated', { flipbookId, cart: result.cartItems });
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
                cartItems: [],
                action: 'cleared',
            };
        } catch (error) {
            throw new Error(`Failed to clear cart: ${error.message}`);
        }
    }

    // Helper method to calculate personalization cost
    getPersonalizationCost(item) {
        console.log("item ????", item);
        if (item.paidPersonalization && item.personalizationText && item.personalizationText.length > 0 && item.pricingMethod && item.personalizationPrice) {
            if (item.pricingMethod === 'PER_CHAR') {
                return item.personalizationPrice * item.personalizationText.length;
            } else if (item.pricingMethod === 'FLAT_FEE') {
                return item.personalizationPrice;
            }
        }
        return 0;
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