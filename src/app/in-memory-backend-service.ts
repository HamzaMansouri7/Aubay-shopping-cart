import { InMemoryDbService } from 'angular-in-memory-web-api';
import { aubayUid } from '../Utils/helpers';

export interface ApiProduct {
    id: string;
    name: string;
    price: number;
    type?: string;
    imgUrl?: string;
}

interface ApiCartItem {
    id: string;
    product: ApiProduct;
    amount: number;
    subtotal: number;
}

export class InMemoryBackendService implements InMemoryDbService {
    createDb() {
        const products: ApiProduct[] = [
            { id: '1', name: 'iPhone', price: 500, type: 'promo' , imgUrl: 'https://shorturl.at/mtwMP' },
            { id: '2', name: 'PlayStation', price: 250, type: 'outlet', imgUrl: 'https://m.media-amazon.com/images/I/41sN+-1hRsL._AC_UF894,1000_QL80_.jpg' },
            { id: '3', name: '8K OLED TV', price: 300 ,  imgUrl: 'https://shorturl.at/sBMS8'},
            { id: '4', name: '4K Ultrabook', price: 600 , imgUrl: 'https://shorturl.at/pstFH' },
            { id: '5', name: 'iPad PRO', price: 600 , imgUrl: 'https://shorturl.at/DFK49' },
        ];
        const cart: ApiCartItem[] = [
            { id: '6', product: products[0], amount: 1, subtotal: products[0].price },
            { id: '7', product: products[1], amount: 2, subtotal: products[1].price * 2 },
        ];
        return {
            products,
            cart,
        };
    }
}
