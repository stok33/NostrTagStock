/**
 * Bech32 regex.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
 */
export declare const BECH32_REGEX: RegExp;
export type ProfilePointer = {
    pubkey: string;
    relays?: string[];
};
export type EventPointer = {
    id: string;
    relays?: string[];
    author?: string;
};
export type AddressPointer = {
    identifier: string;
    pubkey: string;
    kind: number;
    relays?: string[];
};
export type DecodeResult = {
    type: 'nprofile';
    data: ProfilePointer;
} | {
    type: 'nrelay';
    data: string;
} | {
    type: 'nevent';
    data: EventPointer;
} | {
    type: 'naddr';
    data: AddressPointer;
} | {
    type: 'nsec';
    data: string;
} | {
    type: 'npub';
    data: string;
} | {
    type: 'note';
    data: string;
};
export declare function decode(nip19: string): DecodeResult;
export declare function nsecEncode(hex: string): string;
export declare function npubEncode(hex: string): string;
export declare function noteEncode(hex: string): string;
export declare function nprofileEncode(profile: ProfilePointer): string;
export declare function neventEncode(event: EventPointer): string;
export declare function naddrEncode(addr: AddressPointer): string;
export declare function nrelayEncode(url: string): string;
