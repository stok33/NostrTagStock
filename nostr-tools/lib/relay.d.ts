import { type Event } from './event.ts';
import { type Filter } from './filter.ts';
type RelayEvent = {
    connect: () => void | Promise<void>;
    disconnect: () => void | Promise<void>;
    error: () => void | Promise<void>;
    notice: (msg: string) => void | Promise<void>;
    auth: (challenge: string) => void | Promise<void>;
};
export type CountPayload = {
    count: number;
};
type SubEvent<K extends number> = {
    event: (event: Event<K>) => void | Promise<void>;
    count: (payload: CountPayload) => void | Promise<void>;
    eose: () => void | Promise<void>;
};
export type Relay = {
    url: string;
    status: number;
    connect: () => Promise<void>;
    close: () => void;
    sub: <K extends number = number>(filters: Filter<K>[], opts?: SubscriptionOptions) => Sub<K>;
    list: <K extends number = number>(filters: Filter<K>[], opts?: SubscriptionOptions) => Promise<Event<K>[]>;
    get: <K extends number = number>(filter: Filter<K>, opts?: SubscriptionOptions) => Promise<Event<K> | null>;
    count: (filters: Filter[], opts?: SubscriptionOptions) => Promise<CountPayload | null>;
    publish: (event: Event<number>) => Pub;
    auth: (event: Event<number>) => Pub;
    off: <T extends keyof RelayEvent, U extends RelayEvent[T]>(event: T, listener: U) => void;
    on: <T extends keyof RelayEvent, U extends RelayEvent[T]>(event: T, listener: U) => void;
};
export type Pub = {
    on: (type: 'ok' | 'failed', cb: any) => void;
    off: (type: 'ok' | 'failed', cb: any) => void;
};
export type Sub<K extends number = number> = {
    sub: <K extends number = number>(filters: Filter<K>[], opts: SubscriptionOptions) => Sub<K>;
    unsub: () => void;
    on: <T extends keyof SubEvent<K>, U extends SubEvent<K>[T]>(event: T, listener: U) => void;
    off: <T extends keyof SubEvent<K>, U extends SubEvent<K>[T]>(event: T, listener: U) => void;
};
export type SubscriptionOptions = {
    id?: string;
    verb?: 'REQ' | 'COUNT';
    skipVerification?: boolean;
    alreadyHaveEvent?: null | ((id: string, relay: string) => boolean);
};
export declare function relayInit(url: string, options?: {
    getTimeout?: number;
    listTimeout?: number;
    countTimeout?: number;
}): Relay;
export {};
